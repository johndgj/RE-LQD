
const web3EthAbi = require('web3-eth-abi');

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


class EventListener {
    constructor(contractAddress, signature, params, topics, handler, lastProcessedBlock) {
        this.contractAddress = contractAddress;
        this.signature = signature;
        this.params = params;
        this.topics = topics;
        this.handler = handler;
        this.lastProcessedBlock = lastProcessedBlock;
    }
}


class Watcher {
    eventListeners = [];
    blockListeners = [];
    keepRunning = true;
    latestProcessedBlock = 0;

    init(web3) {
        this.web3 = web3;
        console.log('Watcher initialized with web3: ', this.web3);
    }

    registerBlockListener(handler) {
        this.blockListeners.push(handler);
    }

    registerEventListener(contractAddress, signature, params, topics, handler, lastProcessedBlock = 0) {
        contractAddress = this.web3.utils.toChecksumAddress(contractAddress);
        // SHA3 of signature goes first in topics array when filtering events
        topics = [ this.web3.utils.keccak256(signature) ].concat(topics);
        this.eventListeners.push(new EventListener(contractAddress, signature, params, topics, handler, lastProcessedBlock));
    }

    // removes the first event matching the given address and signature
    unregisterEventListener(contractAddress, signature) {
        contractAddress = this.web3.utils.toChecksumAddress(contractAddress);
        for(let i=0; i<this.eventListeners.length; i++) {
            let ev = this.eventListeners[i];
            if(ev.contractAddress === contractAddress && ev.signature === signature) {
                this.eventListeners.splice(i, 1);
                break;
            }
        }
    }

    stop() {
        this.keepRunning = false;
    }

    async start(startAfterBlock) {
        console.log('Watcher starting at block ', startAfterBlock);

        this.latestProcessedBlock = startAfterBlock;

        while(this.keepRunning) {
            //TODO: handle only processing some depth of blocks
            const currentBlockNumber = await this.web3.eth.getBlockNumber();
            // console.log('currentBlockNumber = %d (%s)', currentBlockNumber, new Date());

            if(currentBlockNumber > this.latestProcessedBlock) {
                for(let handler of this.blockListeners) {
                    await handler(currentBlockNumber);
                }

                for(let ev of this.eventListeners) {
                    await this._process(ev, currentBlockNumber);
                }

                this.latestProcessedBlock = currentBlockNumber;
            }
            else {
                await sleep(2000);
            }
        }
    }

    async _process(ev, currentBlockNumber) {
        if(currentBlockNumber <= ev.lastProcessedBlock) {
            // no new blocks to process
            // console.log('no new blocks to process at %s', new Date());
            return;
        }

        let filter = await this.web3.eth.getPastLogs({
            fromBlock: ev.lastProcessedBlock + 1,
            toBlock: currentBlockNumber,
            address: ev.contractAddress,
            topics: ev.topics
        });

        ev.lastProcessedBlock = currentBlockNumber;

        for(let i=0; i<filter.length; i++) {
            let log = filter[i];
            const blockNumber = log.blockNumber;
            const txHash = log.transactionHash;
            const block = await this.web3.eth.getBlock(blockNumber);
            const timestamp = block.timestamp;

            // console.log('WATCHER FOUND %s, block: %s, txHash: %s', ev.signature, blockNumber, txHash);

            let obj = {
                signature: ev.signature,
                // `event_key` prevents processing the same event multiple times
                eventKey: this.web3.utils.keccak256(txHash + log.logIndex),
                contractAddress: ev.contractAddress,
                txHash: txHash,
                blockNumber: blockNumber,
                blockTimestamp: new Date(timestamp*1000).toISOString()
            };

            if(ev.params) {
                // Unpack event parameters and add to `obj` object
                let result = web3EthAbi.decodeLog(ev.params, log.data, log.topics.slice(1));
                // console.log('  RESULT => ', result);

                // only grab keys that we're interested in
                for(let p of ev.params) {
                    obj[p.name] = result[p.name];
                }
            }

            // call handler
            try {
                if(ev.handler) {
                    await ev.handler(obj);
                }
            }
            catch(err) {
                console.error('Watcher caught unhandled error: ', err);
            }
        }
    }
}

export default new Watcher();
