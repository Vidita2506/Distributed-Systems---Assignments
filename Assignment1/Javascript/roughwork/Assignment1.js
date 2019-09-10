'use strict';
class Reservation {
    constructor(users, products) {
        this.users = users;
        this.products = products;

        // Arror functions - demonsrates the usage of this and it's context bound to explicit calling object.
        ProductManagement.prototype.requestAccessToProduct = (tableNumber, userID, userName) => {
            //TypeOf is used to validate that is a number.
            let isValidUserID = validateUserId(userID);
            if (!isValidUserID) {
                return;
            }
          
            let found = this.users.find(item => (item.id === userID && item.productId === productId));
            if (found) {
                console.log(`${userName} already exists. Increasing usage time by a day for this user.\n`);
                let date = new Date(found.expiry);
                date.setDate(date.getDate() + 1);
                found.expiry = date.toString();
            }
            else {
                // Check if product count is available.
                let product = this.products.find(item => item.id === productId);
                if (product.availableCount <= 0) {
                    console.error(`Product is not available for use. Try after some time: ${productId}\n`);
                    return;
                }
                else {
                    product.availableCount = product.availableCount - 1;
                    let randomId = Math.floor(1000 + Math.random() * 9000);

                    // Split is used to get firstname and lastname from the userName
                    let firstname = userName.split(" ")[0];
                    let lastname = userName.split(" ")[1];

                    // Slice is used to form a product access code based on multiple parameters.
                    let code = firstname.slice(0, 3) + lastname.slice(0, 3) + randomId;
                    
                    let date = new Date();
                    date.setDate(date.getDate() + 1);

                    let dateString = date.toString();

                    // We want to add this new user to users list. Parse is used to form javascript object from json string.
                    let newUser = JSON.parse(`{ "name": "${userName}", "id": "${randomId}" , "productId": "${productId}", "expiry": "${dateString}"}\n`);
                    this.users.push(newUser);
                   
                    // Added new user should be sent back as HTML response to the admin. Stringify is used to get JSON string from JS object.
                    let newUserString = JSON.stringify(newUser);

                    // Includes is used to see if the new user is added to active users list.
                    if (this.users.includes(newUser)) {
                        console.log(`New user added succesfully: ${newUserString}`);
                        console.log(`Use this code: ${code}`);
                    }
                    else {
                        console.log(`New user wasn't added\n`);
                    }
                }
            }
            console.log('Current active users: ');
            console.log(JSON.stringify(this.users, null, 1) + '\n\n');
            console.log('Product details: ');
            console.log(JSON.stringify(this.products, null, 1) + '\n\n');
        };

        ProductManagement.prototype.returnAccessToProduct = (productId, userID) => {
            const found = this.users.find(item => (item.id === userID && item.productId === productId));
            if (found) {
                this.users = removeFrmArr(this.users, found);
            }

            function removeFrmArr(array, element) {
                return array.filter(e => e !== element);
            };

            let product = this.products.find(item => item.id === productId);
            product.availableCount = product.availableCount + 1;

            console.log('Current active users: ');
            console.log(JSON.stringify(this.users, null , 1) + '\n\n');
            console.log('Product details: ');
            console.log(JSON.stringify(this.products, null, 1) + '\n\n');
        };

        Reservation.prototype.validateUserId = (userID) => {
            if (userID != undefined && typeof userID != 'number') {
                console.error(`Invalid user ID: ${userID}\n`);
                return false;
            }
            return true;
        }
    }
}


let users = [
    {
        id: 654,
        name: 'Chris Opo',
        tableNumber: 1
    }
];
let tables = [
    {
        number: 1,
        occupied: 0
    },
    {
        number: 2,
        occupied: 0
    },
    {
        number: 3,
        occupied: 0
    }
]
let reservation = new Reservation(users, products);;
reservation.requestAccessToProduct('1234', undefined, 'Vidiita Daga');
reservation.requestAccessToProduct('1234', undefined, 'James Roy');
reservation.requestAccessToProduct('1234', undefined, 'Chris James');
reservation.requestAccessToProduct('1234', 654, 'Chris Opo');
reservation.returnAccessToProduct('1234', 654);