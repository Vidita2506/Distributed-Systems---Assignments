'use strict';
class BankManager {
    static calculateSimpleInterest(principal, period, roi) {
        var interest = (principal * period * roi) / 100;
        return interest.toFixed(2);
    }

    static calculateCompoundInterest(principal, period, roi, timesCompounded = 1) {
        var power = period * timesCompounded;
        var base = 1 + (roi / (100 * timesCompounded));
        var totalAmount = principal * (Math.pow(base, power));
        var interest = totalAmount - principal;
        return interest.toFixed(2);
    }
}
export const getSimpleInterest = BankManager.calculateSimpleInterest;
export const getCompoundInterest = BankManager.calculateCompoundInterest;
