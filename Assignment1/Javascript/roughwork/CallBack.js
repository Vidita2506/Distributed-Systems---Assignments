let getVegetables = (callback) => {
    console.log(`Getting onions`);
    console.log(`Getting potatoes`);
    console.log(`Getting tomatoes`);
    console.log('Got vegetables');
    callback();
};

let cookVegetables = () => {
    console.log(`Cooking vegetables`);
    setTimeout(() => {
        console.log('Cooked vegetables');
    }, 5000);
};

let makeSoup = () => {
    console.log('Soup is ready');
}

// Vegetables should be cooked only when they are all available.`
getVegetables(cookVegetables);
// Making soup can be started while the vegetables are being cooked.
makeSoup();