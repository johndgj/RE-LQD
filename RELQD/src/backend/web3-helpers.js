import Web3 from 'web3';


// web3Provider should return the appropriate blockchain client provider
export const web3Provider = function (opts) {
    let web3;
    opts = opts || {};

    if(opts.env === "dev") {
        console.log('using ethereum testnet: http://localhost:7545');
        web3 = new Web3('http://localhost:7545');
    }
    else if(opts.env === "ropsten") {
        console.log('using ethereum ropsten network via infura');
        web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/" + opts.infuraApiKey));
    }

    return web3
}


//TODO: replace with web3.utils.padLeft(string, characterAmount [, sign]) function
// Pads a Hex address to be used in a topic for event filtering
// e.g. '0x5654Fb7027636dE7B985C778Cc063A9de1406Ef8' becomes
// '0x0000000000000000000000005654fb7027636de7b985c778cc063a9de1406ef8'
export const padAddressForTopic = function (addr) {
    let a = addr.replace('0x', '');
    a = '0x' + a.padStart(64, '0');
    return a.toLowerCase();
}
