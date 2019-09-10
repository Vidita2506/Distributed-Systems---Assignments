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

async function createSandwich () {
    await getVegetables();
    await cookVegetables();
    await putVeggiesInBread();
    console.log('Sandwich is ready');
}

let makeSoup = () => {
    console.log('Soup is ready');
};

let makeMeal = () => {
    createSandwich();
    makeSoup();
}

console.log('Creating meal using Async-Await');
makeMeal();