import { autorun, observe, observable, computed, action, decorate } from "mobx";

import { padAddressForTopic } from './web3-helpers';

import TokenFactory from "./contracts/TokenFactory.json";
import NAToken from "./contracts/NAToken.json";
import NAController from "./contracts/NAController.json";
import NALedger from "./contracts/NALedger.json";
import SaleManager from "./contracts/SaleManager.json";
import Distribution from "./contracts/Distribution.json";
import Converter from "./contracts/Converter.json";
import RelqdToken from "./contracts/RelqdToken.json";
import RelqdController from "./contracts/RelqdController.json";

import AssetStore, { Asset } from "../models/AssetStore";

import WalletStore from "../models/WalletStore";

import Watcher from './watcher';


const BigNumber = require('bignumber.js');

const defaultAbiMapping = {
    token: NAToken.abi,
    controller: NAController.abi,
    ledger: NALedger.abi
}

const relqdAbiMapping = {
    token: RelqdToken.abi,
    controller: RelqdController.abi,
    ledger: NALedger.abi
}

//TODO: handle WalletStore.defaultAddress changing
//TODO: watch every account in Wallet and get eth balance


export default class Mediator {
    constructor(web3, tokenFactoryAddress) {
        this.web3 = web3;
        this.tokenFactoryAddress = tokenFactoryAddress;
        this.watcher = Watcher;
        this.initialBlockNumber = 0;
    }

    // read from chain at given block number, and create as much state as possible
    async initFromChain(initialBlockNumber) {
        this.initialBlockNumber = initialBlockNumber;

        await this.updateUserEthBalance(this.initialBlockNumber);

        const tokenFactoryContract = new this.web3.eth.Contract(TokenFactory.abi, this.tokenFactoryAddress);

        const relqdTokenAddress = await tokenFactoryContract.methods.relqdToken().call(undefined, this.initialBlockNumber, undefined);

        const numTokens = new BigNumber(await tokenFactoryContract.methods.getNumTokens().call(undefined, this.initialBlockNumber, undefined)).toNumber();
        // console.log('found %d tokens in TokenFactory', numTokens);

        // build an array of promises to process in parallel
        let promises = [];

        promises.push(this.createAsset(relqdTokenAddress, this.initialBlockNumber, relqdAbiMapping));

        for(let i=0; i<numTokens; i++) {
            const tokenAddress = await tokenFactoryContract.methods.tokens(i).call(undefined, this.initialBlockNumber, undefined)
            promises.push(this.createAsset(tokenAddress, this.initialBlockNumber, defaultAbiMapping));
        }
        await Promise.all(promises);
    }

    startEventListening() {
        console.log('MEDIATOR using tokenFactoryAddress: %s', this.tokenFactoryAddress);

        this.watcher.registerEventListener(this.tokenFactoryAddress, "TokenCreated(address)",
            [ { type: "address", name: "tokenAddress", indexed: false } ],
            [],
            async (evnt) => { await this.handleTokenCreatedEvent(evnt); },
            this.initialBlockNumber);

        this.watcher.registerEventListener(this.tokenFactoryAddress, "TokenRemoved(address)",
            [ { type: "address", name: "tokenAddress", indexed: false } ],
            [],
            async (evnt) => { await this.handleTokenRemovedEvent(evnt); },
            this.initialBlockNumber);

        this.watcher.registerBlockListener(async (blockNumber) => {
            await this.updateUserEthBalance(blockNumber);
        });

        // Watch for the user choosing a different wallet address
        observe(WalletStore, 'defaultAddress', (change) => {
            this.updateUserEthBalance('latest');
        });

        // Refresh USD-ETH price on some interval
        this.refreshEthPrice();
        //TODO: interval should be configurable
        setInterval(this.refreshEthPrice, 60000);
    }

    async refreshEthPrice() {
        try {
            // console.log('refresh usdForOneEth...');
            let response = await fetch('https://min-api.cryptocompare.com/data/pricemulti?fsyms=USD,ETH&tsyms=ETH,USD');
            if(response.ok) {
                let j = await response.json();
                let usdForOneEth = new BigNumber(j['ETH']['USD']);
                let ethForOneUSD = new BigNumber(j['USD']['ETH']);
                WalletStore.setExchangeRates(usdForOneEth, ethForOneUSD);
            }
        }
        catch(err) {
            console.log('failed getting eth-usd price: ', err);
            return;
        }
    }

    // Converts a hex string, "0x6566670000", to ASCII string, "ABC".
    // Can optionally start with "0x".
    // Stops parsing when the first instance of "00" is encountered
    _hexStringToString(h) {
        h = h.replace("0x", "");
        let result = "";
        for(let i=0; i<h.length; i+=2) {
            let s = h.substring(i, i+2);
            if(s === "00") {
                break;
            }
            result = result.concat(String.fromCharCode(parseInt(s, 16)));
        }
        return result;
    }

    _isValidNonzeroAddress(address) {
        const isValid = this.web3.utils.isAddress(address) && address !== "0x0000000000000000000000000000000000000000";
        return isValid;
    }

    async handleTokenCreatedEvent(evnt) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        await this.createAsset(evnt.tokenAddress, evnt.blockNumber);
    }

    async createAsset(tokenAddress, blockNumber, abiMapping) {
        // ensure asset isn't already created in AssetStore
        if(AssetStore.hasAsset(tokenAddress)) {
            console.warn('AssetStore already contains asset with id %s', tokenAddress);
            return;
        }

        const asset = new Asset(tokenAddress);
        await this.updateTokenData(asset, blockNumber, abiMapping);

        this.watcher.registerBlockListener(async (blockNumber) => {
            this.updateConverterBalances(asset, blockNumber);
        });

        this.watcher.registerEventListener(tokenAddress, "Transfer(address,address,uint256)",
            [
                { type: "address", name: "from", indexed: true },
                { type: "address", name: "to", indexed: true },
                { type: "uint256", name: "value", indexed: false }
            ],
            [],
            async (evnt) => { await this.handleTransferEvent(evnt, asset); },
            this.initialBlockNumber);

        this.watcher.registerEventListener(tokenAddress, "DocumentAdded(bytes32,string,bytes32)",
            [
                { type: "bytes32", name: "name", indexed: false },
                { type: "string", name: "url", indexed: false },
                { type: "bytes32", name: "documentHash", indexed: false }
            ],
            [],
            async (evnt) => { await this.handleDocumentAddedEvent(evnt, asset); },
            this.initialBlockNumber);

        this.watcher.registerEventListener(tokenAddress, "DocumentUpdated(bytes32,string,bytes32)",
            [
                { type: "bytes32", name: "name", indexed: false },
                { type: "string", name: "url", indexed: false },
                { type: "bytes32", name: "documentHash", indexed: false }
            ],
            [],
            async (evnt) => { await this.handleDocumentUpdatedEvent(evnt, asset); },
            this.initialBlockNumber);

        this.watcher.registerEventListener(tokenAddress, "DocumentRemoved(bytes32,string,bytes32)",
            [ { type: "bytes32", name: "name", indexed: false }, ],
            [],
            async (evnt) => { await this.handleDocumentRemovedEvent(evnt, asset); },
            this.initialBlockNumber);

        if(asset.saleManagerAddress !== "") {
            this.watcher.registerEventListener(asset.saleManagerAddress, "SaleCreated(uint256,uint256,uint256,uint256,uint256)",
                [
                    { type: "uint256", name: "saleId", indexed: false },
                    { type: "uint256", name: "startTime", indexed: false },
                    { type: "uint256", name: "endTime", indexed: false },
                    { type: "uint256", name: "tokensToMint", indexed: false },
                    { type: "uint256", name: "rate", indexed: false },
                ],
                [],
                async (evnt) => { await this.handleSaleCreatedEvent(evnt, asset); },
                this.initialBlockNumber);

            this.watcher.registerEventListener(asset.saleManagerAddress, "SaleFrozen(uint256)",
                [ { type: "uint256", name: "saleId", indexed: true } ],
                [],
                async (evnt) => { await this.handleSaleFrozenEvent(evnt, asset); },
                this.initialBlockNumber);

            this.watcher.registerEventListener(asset.saleManagerAddress, "SaleUnfrozen(uint256)",
                [ { type: "uint256", name: "saleId", indexed: true } ],
                [],
                async (evnt) => { await this.handleSaleUnfrozenEvent(evnt, asset); },
                this.initialBlockNumber);

            this.watcher.registerEventListener(asset.saleManagerAddress, "PaymentReceived(uint256,address,uint256,uint256)",
                [
                    { type: "uint256", name: "saleId", indexed: true },
                    { type: "address", name: "from", indexed: true },
                    { type: "uint256", name: "amountWei", indexed: false },
                    { type: "uint256", name: "amountTokens", indexed: false },
                ],
                [],
                async (evnt) => { await this.handlePaymentReceivedEvent(evnt, asset); },
                this.initialBlockNumber);
        }

        if(asset.converterAddress !== "") {
            this.watcher.registerEventListener(asset.converterAddress, "TokensPurchased(address,uint256,uint256)",
                [
                    { type: "address", name: "addr", indexed: true },
                    { type: "uint256", name: "amountWei", indexed: false },
                    { type: "uint256", name: "amountTokens", indexed: false },
                ],
                [],
                async (evnt) => { await this.handleTokensPurchasedEvent(evnt, asset); },
                this.initialBlockNumber);

            this.watcher.registerEventListener(asset.converterAddress, "TokensSold(address,uint256,uint256)",
                [
                    { type: "address", name: "addr", indexed: true },
                    { type: "uint256", name: "amountWei", indexed: false },
                    { type: "uint256", name: "amountTokens", indexed: false },
                ],
                [],
                async (evnt) => { await this.handleTokensSoldEvent(evnt, asset); },
                this.initialBlockNumber);

            this.watcher.registerEventListener(asset.converterAddress, "DepositReceived(address,uint256)",
                [
                    { type: "address", name: "from", indexed: true },
                    { type: "uint256", name: "amount", indexed: false },
                ],
                [],
                async (evnt) => { await this.handleConverterDepositReceivedEvent(evnt, asset); },
                this.initialBlockNumber);
        }

        if(asset.distributionAddress !== "") {
            this.watcher.registerEventListener(asset.distributionAddress, "DistributionSent(uint256,address,uint256,uint256)",
                [
                    { type: "uint256", name: "id", indexed: true },
                    { type: "address", name: "to", indexed: true },
                    { type: "uint256", name: "tokenBalance", indexed: false },
                    { type: "uint256", name: "amountSent", indexed: false },
                ],
                [null, padAddressForTopic(WalletStore.defaultAddress)],
                async (evnt) => { await this.handleDistributionSentEvent(evnt, asset); },
                this.initialBlockNumber);

            //Listen for when Wallet default address changes. Clear out distributions
            //cached in Asset and re-read distributions for new address.
            //We also have to remove this listener and register a new listener with the new address
            //for the topic.
            observe(WalletStore, 'defaultAddress', async (change) => {
                // console.log('mediator saw defaultAddress change to: %s', change.newValue);
                asset.removeAllDistributions();
                let block = this.watcher.latestProcessedBlock;
                await this.updateDistributionData(asset, block);
                this.watcher.unregisterEventListener(asset.distributionAddress, "DistributionSent(uint256,address,uint256,uint256)");
                this.watcher.registerEventListener(asset.distributionAddress, "DistributionSent(uint256,address,uint256,uint256)",
                    [
                        { type: "uint256", name: "id", indexed: true },
                        { type: "address", name: "to", indexed: true },
                        { type: "uint256", name: "tokenBalance", indexed: false },
                        { type: "uint256", name: "amountSent", indexed: false },
                    ],
                    [null, padAddressForTopic(WalletStore.defaultAddress)],
                    async (evnt) => { await this.handleDistributionSentEvent(evnt, asset); },
                    block);
            });
        }

        AssetStore.addAsset(asset);
    }

    async handleTokenRemovedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        AssetStore.removeAsset(evnt.tokenAddress);
    }

    async handleTransferEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        asset.handleTransfer(evnt.from, evnt.to, new BigNumber(evnt.value));
    }

    async handleDocumentAddedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        asset.addDocument(this._hexStringToString(evnt.name), evnt.url, evnt.documentHash);
    }

    async handleDocumentUpdatedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        asset.updateDocument(this._hexStringToString(evnt.name), evnt.url, evnt.documentHash);
    }

    async handleDocumentRemovedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        asset.removeDocument(this._hexStringToString(evnt.name));
    }

    async handleSaleCreatedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);

        let saleId = new BigNumber(evnt.saleId).toNumber();
        let startTime = new BigNumber(evnt.startTime).toNumber();
        let endTime = new BigNumber(evnt.endTime).toNumber();
        let tokensToMint = new BigNumber(evnt.tokensToMint);
        let rate = new BigNumber(evnt.rate);

        //NOTE: below the second `tokensToMint` is being passed in for `tokensRemaining` and
        //`frozen` is set to false
        asset.addSale(saleId, startTime, endTime, tokensToMint, tokensToMint, rate, false);
    }

    async handleSaleFrozenEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        asset.setSaleFrozen(new BigNumber(evnt.saleId).toNumber(), true);
    }

    async handleSaleUnfrozenEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        asset.setSaleFrozen(new BigNumber(evnt.saleId).toNumber(), false);
    }

    async handlePaymentReceivedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        let saleId = new BigNumber(evnt.saleId).toNumber();
        let from = evnt.from;
        let amountWei = new BigNumber(evnt.amountWei);
        let amountTokens = new BigNumber(evnt.amountTokens);
        asset.handlePaymentReceived(saleId, from, amountWei, amountTokens);
    }

    async handleConverterDepositReceivedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        this.updateConverterBalances(asset, evnt.blockNumber);
    }

    async handleTokensPurchasedEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        this.updateConverterData(asset, evnt.blockNumber);
    }

    async handleTokensSoldEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        this.updateConverterData(asset, evnt.blockNumber);
    }

    async handleDistributionSentEvent(evnt, asset) {
        // console.log('MEDIATOR HANDLER: %s - ', evnt.signature, evnt);
        asset.addDistribution(evnt.to, new BigNumber(evnt.tokenBalance), new BigNumber(evnt.amountSent), new Date(evnt.blockTimestamp));
    }



    async updateTokenData(asset, blockNumber, abiMapping) {
        let contract = new this.web3.eth.Contract(abiMapping.token, asset.address);

        let results = await Promise.all([
            contract.methods.name().call(undefined, blockNumber, undefined),
            contract.methods.symbol().call(undefined, blockNumber, undefined),
            contract.methods.decimals().call(undefined, blockNumber, undefined),
            contract.methods.totalSupply().call(undefined, blockNumber, undefined),
            contract.methods.controller().call(undefined, blockNumber, undefined)
        ]);

        asset.token_name = results[0];
        asset.ticker_symbol = results[1];
        asset.decimals = new BigNumber(results[2]);
        asset.totalSupply = new BigNumber(results[3]);
        asset.controllerAddress = results[4];

        await Promise.all([
            this.updateTokenDocuments(asset, contract, blockNumber),
            this.updateTokenHolders(asset, contract, blockNumber),
            this.updateControllerData(asset, blockNumber, abiMapping)
        ]);
    }

    async updateTokenDocuments(asset, contract, blockNumber) {
        const numDocs = new BigNumber(await contract.methods.getNumDocs().call(undefined, blockNumber, undefined)).toNumber();
        // console.log('Token %s has %d documents', asset.address, numDocs);
        for(let i=0; i<numDocs; i++) {
            //this will be an array of 3 elements: [ bytes32 name, string url, bytes32 docHash ]
            const doc = await contract.methods.docs(i).call(undefined, blockNumber, undefined);
            asset.addDocument(this._hexStringToString(doc[0]), doc[1], doc[2]);
        }
    }

    async updateTokenHolders(asset, contract, blockNumber) {
        const numHolders = new BigNumber(await contract.methods.holderCount().call(undefined, blockNumber, undefined)).toNumber();
        // console.log('Token %s has %d holders', asset.address, numHolders);
        for(let i=0; i<numHolders; i++) {
            const addr = await contract.methods.holder(i).call(undefined, blockNumber, undefined);
            const balance = new BigNumber(await contract.methods.balanceOf(addr).call(undefined, blockNumber, undefined));
            asset.setBalanceOf(addr, balance);
        }
    }

    async updateControllerData(asset, blockNumber, abiMapping) {
        if(!this._isValidNonzeroAddress(asset.controllerAddress)) {
            return;
        }
        const contract = new this.web3.eth.Contract(abiMapping.controller, asset.controllerAddress);
        let results = await Promise.all([
            contract.methods.ledger().call(undefined, blockNumber, undefined),
            contract.methods.sale().call(undefined, blockNumber, undefined),
            contract.methods.converter().call(undefined, blockNumber, undefined),
            contract.methods.distribution().call(undefined, blockNumber, undefined)
        ]);
        asset.ledgerAddress = results[0];
        asset.saleManagerAddress = results[1];
        asset.converterAddress = results[2];
        asset.distributionAddress = results[3];

        await Promise.all([
            this.updateSaleManagerData(asset, blockNumber),
            this.updateConverterData(asset, blockNumber),
            this.updateConverterBalances(asset, blockNumber),
            this.updateDistributionData(asset, blockNumber)
        ]);
    }

    async updateSaleManagerData(asset, blockNumber) {
        if(!this._isValidNonzeroAddress(asset.saleManagerAddress)) {
            return;
        }
        let contract = new this.web3.eth.Contract(SaleManager.abi, asset.saleManagerAddress);

        const numSales = new BigNumber(await contract.methods.getNumSales().call(undefined, blockNumber, undefined)).toNumber();
        for(let i=0; i<numSales; i++) {
            // sale is an array of:
            //   uint startTime;    // inclusive
            //   uint endTime;      // exclusive
            //   uint tokensToMint;
            //   uint rate;         // eth per token
            //   uint tokensRemaining;
            //   bool frozen;
            const arr = await contract.methods.sales(i).call(undefined, blockNumber, undefined);
            let j=0;
            const startTime = new BigNumber(arr[j++]).toNumber();
            const endTime = new BigNumber(arr[j++]).toNumber();
            const tokensToMint = new BigNumber(arr[j++]);
            const rate = new BigNumber(arr[j++]);
            const tokensRemaining = new BigNumber(arr[j++]);
            const frozen = arr[j++];
            // console.log('sale [%d] startTime=%d, endTime=%d, tokensToMint=%s, rate=%s, tokensRemaining=%s, frozen=%s',
            //     i, startTime, endTime, tokensToMint.toString(10), rate.toString(10), tokensRemaining.toString(10), frozen);

            asset.addSale(i, startTime, endTime, tokensToMint, tokensRemaining, rate, frozen);
        }
    }

    async updateConverterData(asset, blockNumber) {
        if(!this._isValidNonzeroAddress(asset.converterAddress)) {
            return;
        }
        let contract = new this.web3.eth.Contract(Converter.abi, asset.converterAddress);

        try {
            asset.setConverterTokensForOneEth(new BigNumber(await contract.methods.calcBuyAmount(new BigNumber(1e18).toString()).call(undefined, blockNumber, undefined)));
        }
        catch(err) {
            console.warn('converter failed calling calcBuyAmount: ', err);
            asset.setConverterTokensForOneEth(new BigNumber(0));
        }

        try {
            asset.setConverterEthForOneToken(new BigNumber(await contract.methods.calcSellAmount(new BigNumber(1e18).toString()).call(undefined, blockNumber, undefined)));
        }
        catch(err) {
            console.warn('converter failed calling calcSellAmount: ', err);
            asset.setConverterEthForOneToken(new BigNumber(0));
        }
    }

    async updateConverterBalances(asset, blockNumber) {

        //TODO: this should be handled by buy/sell events AND by DepositReceived event
        let ethBalance = new BigNumber(await this.web3.eth.getBalance(asset.converterAddress, blockNumber));
        asset.setConverterEthBalance(ethBalance);

        let tokenContract = new this.web3.eth.Contract(NAToken.abi, asset.address);

        //TODO: this could be updated via a Transfer event
        let tokenBalance = new BigNumber(await tokenContract.methods.balanceOf(asset.converterAddress).call(undefined, blockNumber, undefined));
        asset.setConverterTokenBalance(tokenBalance);
    }

    async updateDistributionData(asset, blockNumber) {
        let contract = new this.web3.eth.Contract(Distribution.abi, asset.distributionAddress);

        let events = await contract.getPastEvents('DistributionSent', {
            filter: {
                to: WalletStore.defaultAddress
            },
            fromBlock: 0,
            toBlock: blockNumber
        });

        events.forEach(async (evnt) => {
            const block = await this.web3.eth.getBlock(evnt.blockNumber);
            const timestamp = block.timestamp;
            asset.addDistribution(evnt.returnValues.to, new BigNumber(evnt.returnValues.tokenBalance), new BigNumber(evnt.returnValues.amountSent), timestamp);
        });
    }

    async updateUserEthBalance(blockNumber) {
        WalletStore.defaultAccountEthBalanceNum = new BigNumber(await this.web3.eth.getBalance(WalletStore.defaultAddress, blockNumber));
    }

}
