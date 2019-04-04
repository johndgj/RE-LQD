
import txStore from '../models/TxStore';

import walletStore from '../models/WalletStore';

import Backend from './backend';
import Watcher from './watcher';

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


// For each new block, we will increment the TxState.confirmations field, up to
// and including this limit.
const NUM_CONFIRMATIONS_TO_TRACK = 16;


export default new class TxProcessor {
    statesToProcess = [];
    statesWaitingForConfirmations = [];

    constructor() {
        this.start();

        // Register a block listener with the Watcher so we know when to
        // increment the number of confirmations for a transaction
        Watcher.registerBlockListener((block) => {
            // console.log('TxProcessor saw new block: ', block);
            let i = this.statesWaitingForConfirmations.length;
            while(i--) {
                let state = this.statesWaitingForConfirmations[i];
                if(state.status === 'mined') {
                    let num = state.incrementConfirmations();
                    if(num >= NUM_CONFIRMATIONS_TO_TRACK) {
                        this.statesWaitingForConfirmations.splice(i, 1);
                    }
                }
            }
        });
    }

    async start() {

        console.log('TxProcessor starting');
        while(true) {
            const txState = this.statesToProcess.shift();

            if(typeof(txState) !== "undefined") {
                // console.log('TxProcessor processing: ', txState);

                let web3 = Backend.web3;

                const txCount = await web3.eth.getTransactionCount(txState.fromAddress);
                let tx = txState.rawTransaction;

                tx.from = txState.fromAddress;

                //TODO: pull this from SettingStore
                const defaultGasPrice = '20000000000';

                // NOTE: all parameters to the transaction object have to be encoded as hex
                tx.nonce = web3.utils.toHex(txCount);
                tx.gasPrice = web3.utils.toHex(tx.gasPrice || defaultGasPrice);
                tx.value = web3.utils.toHex(tx.value || 0);

                // console.log('calling estimateGas with tx: ', tx);

                // Use web3 call to estimate gas necessary.
                // If this reverts (from an error on chain), then set state to
                // error and move on.
                try {
                    let estimatedGas = await web3.eth.estimateGas(tx);
                    let gasLimit = Math.round(1.1 * estimatedGas); // increase by 10%
                    tx.gasLimit = web3.utils.toHex(gasLimit);
                }
                catch(err) {
                    console.warn('calling estimateGas for %o failed: err=', tx, err);
                    txState.setStatus('error');
                    txState.setError(err);
                    continue;
                }

                // console.log('TxProcessor, submitting tx: %o, with metadata: %o', tx, txState.metadata);

                //TODO: when enqueueing transaction, should store which account it should be signed with
                //(for the case when a tx is enqueued, then user changes default account)

                //sign transaction using Wallet
                const signedTx = walletStore.sign(tx);

                txState.setSignedTransaction(signedTx);

                await this._process(txState);
            }
            else {
                await sleep(2000);
            }
        }
    }

    async _process(txState) {
        try {
            this.statesWaitingForConfirmations.push(txState);

            // Use this promise to block returning until transaction is complete
            await new Promise((resolve, reject) => {
                Backend.web3.eth.sendSignedTransaction(txState.signedTransaction)
                    .once('transactionHash', function(hash) {
                        // console.log('transactionHash: ', hash);
                        txState.setTransactionHash(hash);
                        txState.setStatus('submitted');
                    })
                    .once('receipt', function(receipt) {
                        // console.log('receipt: ', receipt);
                        txState.setReceipt(receipt);
                        txState.setStatus('submitted');

                    })
                    .on('error', function(error) {
                        // console.log('error: ', error);
                        txState.setStatus('error');
                        txState.setError(error);

                        //TODO: might be able to detect out of gas if error.gasUsed
                        //equals state.rawTransaction.gasLimit

                        reject();
                    })
                    .then(function(receipt) {
                        // console.log('then: ', receipt);
                        txState.setReceipt(receipt);
                        txState.setStatus('mined');
                        resolve();
                    });

            });

        }
        catch(err) {
            console.error('TxProcessor error: ', err);
        }
    }

    //accept transaction object from datastore classes
    async submit(tx, metadata = {}) {
        try {
            const txState = txStore.create(tx, metadata);

            this.statesToProcess.push(txState);
        }
        catch(err) {
            console.warn('TxProcessor.submit() err: ', err);
        }
    }
}
