'use strict';
import { getSimpleInterest, getCompoundInterest} from './JsAssn3.mjs';

var simpleInterest = getSimpleInterest(5000, 1, 10);
console.log(simpleInterest);

var compundInterest = getCompoundInterest(5000, 10, 10, 2);
console.log(compundInterest);

var compundInterest = getCompoundInterest(5000, 10, 10);
console.log(compundInterest);