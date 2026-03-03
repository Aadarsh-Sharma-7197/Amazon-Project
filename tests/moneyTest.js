import { priceCalculator } from "../scripts/utils/money.js";

describe('test suite priceCalculator', ()=>{
    it('converts cents into dollars',()=>{
        expect(priceCalculator(2095)).toEqual('20.95');
    });
    
    it('works with zero',()=>{
        expect(priceCalculator(0)).toEqual('0.00');
    });

    it('rounds up to the nearest cent',()=>{
        expect(priceCalculator(2000.5)).toEqual('20.01');
    });
});