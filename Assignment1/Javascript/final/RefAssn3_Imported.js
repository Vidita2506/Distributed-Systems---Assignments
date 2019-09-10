'use strict';

// Method imported from other module.
let calculateProductPrice = require("./RefAssn3_Exported.js");

let productPrice = calculateProductPrice('mafia game_a', 10, 48);
console.log(`Price of product : ${productPrice}`);

productPrice = calculateProductPrice('counterstrike game_b', 10, 48 ,1.5);
console.log(`Price of product : ${productPrice}`);

productPrice = calculateProductPrice('age of empires game_a', 10);
console.log(`Price of product : ${productPrice}`);