
import { web3Provider } from './web3-helpers';

// import watcher from './watcher';
//
// import Mediator from './mediator';

// import WalletStore from '../models/WalletStore';
// import txStore from '../models/TxStore';


//TODO: these need to come from config
const TOKEN_FACTORY_ADDRESS = "0x409c1491643228B07D23560c919af6F94D46E0F3";

const INFURA_API_KEY = '7f40e2033a6b403c8ba9482cca61aec9'

// "dev" - connect to local Ethereum client on http://localhost:7545
// "ropsten" - connect to ropsten testnet via infura: https://ropsten.infura.io/
const BACKEND_ENV = "dev";


//TODO: Need to spin up backend without relying on connectivity to blockchain, or off-chain storage


export default new class Backend {
    constructor() {
        console.log('Backend created');

        this.web3 = web3Provider({infuraApiKey: INFURA_API_KEY, env: BACKEND_ENV});

        console.log(this.web3);

        // watcher.init(this.web3);
        //
        // console.log('initialized watcher');
        //
        // const mediator = new Mediator(this.web3, TOKEN_FACTORY_ADDRESS);
        //
        // // for debugging purposes
        // window.watcher = watcher;
        // window.mediator = mediator;
        // // window.wallet = WalletStore;
        // // window.txs = txStore;

        (async () => {
            try {
                const currentBlockNumber = await this.web3.eth.getBlockNumber();

                console.log('Backend initializing at block %d', currentBlockNumber);

                // // Tell mediator to initialize from blockchain
                // await mediator.initFromChain(currentBlockNumber);
                //
                // console.log('mediator initialized from chain');
                //
                // mediator.startEventListening();
                //
                // // Tell watcher to start at a given block
                // watcher.start(currentBlockNumber);
                //
                // console.log('watcher started');
            }
            catch (err) {
                console.error('Backend FAILED to initialize: ', err);
            }
        })();
    }
}
