//const 
const roi = 10;

// Var can be used out of block in which it is defined
let calculateSimpleInterest = (principal, period) => {
    var interest = [];
    for (var i = 0; i < principal.length; i++) {
        var intr = (principal[i] * period * roi) / 100;
        interest.push(intr);
    }
    console.log(`Interest for last principal is: ${intr}\n`);
};
let principal = [200, 300, 400];
calculateSimpleInterest(principal, 2);

// let is scoped to block hence this code throws error
/*
let calculateSimpleInterest2 = (principal, period) => {
    let interest = [];
    for (let i = 0; i < principal.length; i++) {
        let intr = (principal[i] * period * roi) / 100;
        interest.push(intr);
    }
    console.log(intr);
    console.log(interest);
}
calculateSimpleInterest2(principal, 2);*/

//thorws error
roi = 20;





