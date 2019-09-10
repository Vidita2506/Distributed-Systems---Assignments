let getVegetables = () => {
    let promise = new Promise((resolve, reject) => {
        console.log(`Getting onions`);
        console.log(`Getting potatoes`);
        console.log(`Getting tomatoes`);
        setTimeout(() => {
            console.log('Got all the vegetables');
            resolve();
        }, 5000);  
    });
    return promise;
};

let cookVegetables = () => {
    let promise = new Promise((resolve, reject) => {
        console.log('Cooking vegetables');
        setTimeout(() => {
            console.log('Cooked vegetables');
            resolve();
        }, 5000);
    });
    return promise;
};

let putVeggiesInBread = () => {
    return new Promise((resolve, reject) => {
        console.log('Putting cooked veggies in bread');
        resolve();
    });
};

let makeSoup = () => {
    console.log('Soup is ready');
};

let makeSandwich = () => {
    getVegetables()
    .then(cookVegetables)
    .then(putVeggiesInBread)
    .then(() => {
        console.log('Sandwich is ready');
    });
};

let makeLunch = () => {
    // Vegetables should be cooked only when they are all available.
    makeSandwich();
    // Making soup can be started while the vegetables are being cooked.
    makeSoup();
}
    
console.log('Making meal using Promise');
makeLunch();
