'use strict';
class Product {
    constructor(id, name, basePrice) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.users = [];

        // Method overriden by subclasses to add specific product details.
        Product.prototype.getProductDetails = () => {
            return `Product id: ${this.id}, Product Name: ${this.name}, Product Base Price: ${this.basePrice} `;
        }

        Product.prototype.provideAccessToUser = (userId, userName) => {
            let date = new Date();
            date.setDate(date.getDate() + 1);
            let dateString = date.toString();

            // This method is implemented by subclasses.
            this.allocateResources(userId);

            let newUser = JSON.parse(`{ "name": "${userName}", "id": "${userId}" , "productId": "${this.id}", "expiry": "${dateString}"}`);
            this.users.push(newUser);
            let usersString = JSON.stringify(this.users, null, 2);
            console.log(`Current active users of this product: ${usersString}\n`);
            console.log(`******************************************************************************************************************\n`)
        }
    }
}

// Subclass for Game products
class Game extends Product {
    constructor(id, name, basePrice, type) {
        super(id, name, basePrice);
        this.type = type;

        // Overriden
        Game.prototype.getProductDetails = () => {
            console.log(super.getProductDetails() + `Game type: ${this.type}`);
        }
        // Method called in base class but implemented in this class.
        Game.prototype.allocateResources = (userId) => {
            unlockGame(userId);
            unlockGameResources(userId);
            console.log('\n');
        }

        let unlockGame = (userId) => {
            console.log(`Game ${this.name} is unlocked for user: ${userId}`);
        }

        let unlockGameResources = (userId) => {
            console.log(`Game ${this.name} resources are now available to the user: ${userId}`);
        }
    }
}

// Subclass for ELearning products
class ELearning extends Product {
    constructor(id, name, basePrice, category) {
        super(id, name, basePrice);
        this.category = category;

        //Overriden
        ELearning.prototype.getProductDetails = () => {
            console.log(super.getProductDetails() + `Category: ${this.category}`);
        }
        // Method called in base class but implemented in this class.
        ELearning.prototype.allocateResources = (userId) => {
            unlockMaterial(userId);
            unlockDiscussionForum(userId);
            console.log('\n');
        }

        let unlockMaterial = (userId) => {
            console.log(`ELearning product material ${this.name} is unlocked for user: ${userId}`);
        }

        let unlockDiscussionForum = (userId) => {
            console.log(`User ${userId} can participate in discussions for ELearning product: ${this.name}`);
        }
    } 
}

let game1 = new Game('1234', 'Counter Strike', 10, 'MultiPlayer');
game1.getProductDetails();
game1.provideAccessToUser('5678', 'Vidita Daga');
game1.getProductDetails();
game1.provideAccessToUser('9999', 'Huang Wang');

//Assign is used to copy the game1 object and change specific attributes only.
let game2 = Object.assign(game1);
game2.id = '9876';
game2.type = 'With computer';
game2.users = [];
game2.getProductDetails();
game2.provideAccessToUser('5678', 'Vidita Daga');

let eLearning = new ELearning('7878', 'English Grammar', 30, 'Language');
eLearning.getProductDetails();
eLearning.provideAccessToUser('9786', 'James Roy');