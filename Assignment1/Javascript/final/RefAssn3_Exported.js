'use strict';
const BASE_PRICE_PRODUCT_GAME_A = 20;
const BASE_PRICE_PRODUCT_GAME_B = 50;
const HOURLY_PRICE = 2;

class ProductManagement {

    /* static method defined to calculate product price
       Default parameters are used for highDemandMultiplier and productTime  
    */
    static calculateProductPrice (productType, tax, productimeInHours = 24, highDemandMultiplier = 1) {
        let basePrice = ProductManagement.getBaseProductPrice(productType);
        let price = basePrice;
        
        productimeInHours = productimeInHours - 24;
        if (productimeInHours >= 0) {
            price = basePrice + (productimeInHours * HOURLY_PRICE);
        } 
        price = price * highDemandMultiplier;
        price = price + ( price * ( tax / 100 ) );
        return price;
    }

    static getBaseProductPrice(productType) {
        // Regular expression is used to find the product base price
        let found = productType.search(/game_a/i);
        if (found > -1) {
            return BASE_PRICE_PRODUCT_GAME_A;
        }

        found = productType.search(/game_b/i);
        if (found > -1) {
            return BASE_PRICE_PRODUCT_GAME_B;
        }
        return -1;
    }
}
// The module function is exported to be used by other modules.
module.exports = ProductManagement.calculateProductPrice;
