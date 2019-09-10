

const getVegetable = () => {
    const brocoli = getBrocoliFromFridge()
    var p1 = new Promise((resolve, reject) => {
        if (brocoli) {
            resolve(brocoli);
        } else {
            reject(new Error('No more brocoli!'));
        }
    });
    return p1;
}

const cookVegetable = (brocoli) => {
    const boiled = boilVegetable(brocoli)
    var p2 = new new Promise((resolve, reject) => {
        if (boiled) {
            console.log('Cooked');
            resolve();
        } else {
            reject(new Error('Brocoli not cooked'));
        }
    });
    return p2;
}

let getBrocoliFromFridge = () => {
    return 'BROCOLI';
}

let boilVegetable = (veg) => {
    setTimeout(function () {
        console.log(`Boiling ${veg}`);
        return true;
    }, 1000 * 60 * 20)
}

getVegetable().then(cookVegetable);