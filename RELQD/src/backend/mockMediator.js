

import offeringStore from '../models/OfferingStore';
import {Offering} from '../models/OfferingStore';

import holdingStore from '../models/HoldingStore';
import {Holding} from '../models/HoldingStore';

import mockOfferings from '../models/mockData/offers.json'
import mockHoldings from '../models/mockData/holdings.json'

export default new class MockMediator {

    constructor() {
        // import JSON
        this.injectOfferings();
        this.injectHoldings();
    }

    injectOfferings() {
        console.log('Injecting offerings')

        let id = 0;
        mockOfferings.forEach((row) => {
            let offering = new Offering(id);
            Object.keys(row).forEach((key) => {
                offering[key] = row[key];
            })
            offeringStore.addOffering(offering);
        })
    }

    injectHoldings() {
        console.log('Injecting holdings')

        let id = 0;
        mockHoldings.forEach((row) => {
            let holding = new Holding(id);
            Object.keys(row).forEach((key) => {
                holding[key] = row[key];
            })
            holdingStore.addHolding(holding);
        })
    }
}