'use strict';
class Reservation {
  constructor(users, tables) {
        this.users = users;
        this.tables = tables;
        /* Arror functions - demonsrates the usage of this and it's context 
           bound to explicit calling object.*/
        Reservation.prototype.reserveTable = (tableNumber, userName) => {
            console.log(`Trying to reserve table ${tableNumber} for user: ${userName}`);
            if (validateTableNumber(tableNumber)) {
                let user = addNewUser(userName, tableNumber);
                // Includes is used to see if the new user is added to active users list.
                if (this.users.includes(user)) {
                    // occupy table
                    let table = this.tables.find(item => item.number === tableNumber);
                    table.occupied = 1;
					/*
					 Added new user should be sent back as text response to the admin.
					 Stringify is used to get JSON string from JS object.
					*/
                    let userString = JSON.stringify(user);
                    console.log(`New user added succesfully: ${userString}`);
                    console.log(`Provide this code to the user: ${user.code}`);
                } else {
                    console.log(`New user wasn't added\n`);
                }
                printUserDetails();
            }
        };
        let printUserDetails = () => {
            console.log('Current active users: ');
            console.log(JSON.stringify(this.users, null, 1) + '\n\n');
            console.log('-------------------------------------------------------------------------------------------------');
        }
        Reservation.prototype.vacateTable = (tableNumber) => {
            console.log(`Trying to vacate table ${tableNumber}`);
            let table = this.tables.find(item => item.number === tableNumber);
            if (table == null || table == undefined) {
                console.log('This table is not reserved');
                printUserDetails();
                return;
            } else {
                let user = this.users.find(item => (item.tableNumber === tableNumber));
                if (user) {
                    this.users = this.users.filter(e => e !== user)
                }
                table.occupied = 0;
                console.log(`Table ${tableNumber} is now free`);
                printUserDetails();
            }
        };
        let addNewUser = (userName, tableNumber) => {
            // Split is used to get firstname & lastname
            let firstname = userName.split(" ")[0];
            let lastname = userName.split(" ")[1];
            let id = Math.floor(1000 + Math.random() * 9000);
            // Slice is used to form a discount code to be given to the user
            let code = firstname.slice(0, 3) + lastname.slice(0, 3) + id;
            // Parse is used to form javascript object from json string.
            let user = JSON.parse(`{ "name": "${userName}", "id": "${id}" , "tableNumber": ${tableNumber}, "code" : "${code}"}\n`);
            this.users.push(user);
            return user;
        }
        let validateTableNumber = (tableNumber) => {
            // Check if tableNumer is a valid number
            if (typeof tableNumber != 'number' || tableNumber <= 0 || tableNumber > 5) {
                console.error(`Invalid table number: ${tableNumber}\n`);
                console.log('-------------------------------------------------------------------------------------------------');
                return false;
            }
            // Check if table is available.
            let table = this.tables.find(item => item.number === tableNumber);
            if (table.occupied != 0) {
                console.error(`Table ${tableNumber} is already reserved. Try other table\n`);
                console.log('-------------------------------------------------------------------------------------------------');
                return false;
            }
            return true;
        };
    }
}
let users = [];
let tables = [{
    number: 1,
    occupied: 0
},
{
    number: 2,
    occupied: 0
}
]
let reservation = new Reservation(users, tables);;
reservation.reserveTable(1, 'Vidita Daga');
reservation.reserveTable(2, 'John Wisley');
reservation.reserveTable(1, 'Wang Fang');
reservation.vacateTable(1);