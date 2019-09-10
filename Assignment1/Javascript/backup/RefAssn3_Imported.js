'use strict';

// Method imported from other module.
var calculateProductPrice = require("./RefAssn3_Exported.js");

var productPrice = calculateProductPrice('mafia game_a', 10, 48);
console.log(`Price of product : ${productPrice}`);

var productPrice = calculateProductPrice('counterstrike game_b', 10, 48 ,1.5);
console.log(`Price of product : ${productPrice}`);

var productPrice = calculateProductPrice('age of empires game_a', 10);
console.log(`Price of product : ${productPrice}`);