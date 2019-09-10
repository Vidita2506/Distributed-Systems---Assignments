'use strict';
class Product {
    constructor(id, name, basePrice) {
        this.id = id;
        this.name = name;
        this.basePrice = basePrice;
        this.users = [];
    }

    // Method overriden by subclasses to add specific product details.
    getProductDetails() {
        return `Product id: ${this.id}, Product Name: ${this.name}, Product Base Price: ${this.basePrice} `;
    }

    provideAccessToUser = (userId, userName) => {
        let date = new Date();
        date.setDate(date.getDate() + 1);
        var dateString = date.toString();

        // This method is implemented by subclasses.
        this.allocateResources(userId);
        
        var newUser = JSON.parse(`{ "name": "${userName}", "id": "${userId}" , "productId": "${this.id}", "expiry": "${dateString}"}`);
        this.users.push(newUser);
        var usersString = JSON.stringify(this.users);
        console.log(`Users for the product: ${usersString}\n`);
        console.log(`******************************************************************************************************************\n`)
    }

}

// Subclass for Game products
class Game extends Product {
    constructor(id, name, basePrice, type, rules) {
        super(id, name, basePrice);
        this.type = type;
        this.rules = rules;
    }

    // Overriden method
    getProductDetails() {
        console.log(super.getProductDetails() + `Game type: ${this.type}`);
    }

    // Method called in base class but implemented in this class.
    allocateResources (userId) {
        this.unlockGame(userId);
        this.unlockGameResources(userId);
        this.displayGameRules();
        console.log('\n');
    }

    unlockGame(userId) {
        console.log(`Game ${this.name} is unlocked for user: ${userId}`);
    }

    unlockGameResources(userId) {
        console.log(`Game ${this.name} resources are now available to the user: ${userId}`);
    } 

    displayGameRules() {
        console.log(`Game rules: ${this.rules}`);
    }

}

// Subclass for ELearning products
class ELearning extends Product {
    constructor(id, name, basePrice, category) {
        super(id, name, basePrice);
        this.category = category;
    }

    // Overriden method
    getProductDetails() {
        console.log(super.getProductDetails() + `Category: ${this.category}`);
    }

    // Method called in base class but implemented in this class.
    allocateResources(userId) {
       this. unlockMaterial(userId);
       this.unlockDiscussionForum(userId);
        this.startExam(userId);
        console.log('\n');
    }

    unlockMaterial(userId) {
        console.log(`ELearning product material ${this.name} is unlocked for user: ${userId}`);
    }

    unlockDiscussionForum(userId) {
        console.log(`User ${userId} can participate in discussions for ELearning product: ${this.name}`);
    } 

    startExam(userId) {
        console.log(`Starting exam for user: ${userId} for ELearning product: ${this.name}`);
    }
}

var game1 = new Game('1234', 'Counter Strike', 10, 'MultiPlayer', 'Kill the opponent players with the weapons and win points');
game1.getProductDetails();
game1.provideAccessToUser('5678', 'Vidita Daga');
game1.provideAccessToUser('9999', 'Huang Wang');

/*
Game2 is exactly like Game1 but only difference is it is played with computer and not with other online players.
Assign is used to copy the game1 object and change specific attributes only.
*/
var game2 = Object.assign(game1);
game2.id = '9876';
game2.type = 'With computer';
game2.users = [];
game2.getProductDetails();
game2.provideAccessToUser('5678', 'Vidita Daga');

var eLearning = new ELearning('7878', 'English Grammar', 30, 'Language');
eLearning.getProductDetails();
eLearning.provideAccessToUser('9786', 'James Roy');