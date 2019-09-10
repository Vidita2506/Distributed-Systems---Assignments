'use strict';
class Reservation {
    constructor(users, tables) {
        this.users = users;
        this.tables = tables;
        
        // Arror functions - demonsrates the usage of this and it's context bound to explicit calling object.
        Reservation.prototype.reserveTable = (tableNumber, userName) => {
            if (validateTableNumber(tableNumber)) {
                let table = this.tables.find(item => item.number === tableNumber);
                table.occupied = 1;
                let user = addNewUser(userName, tableNumber);
                // Includes is used to see if the new user is added to active users list.
                if (this.users.includes(user)) {
                    alert(`Table ${tableNumber} reserved for user ${userName}. Provide this code to the user: ${user.code}`);
                } else {
                    alert(`New user wasn't added\n`);
                }
                localStorage.setItem('users', JSON.stringify(this.users));
                localStorage.setItem('tables', JSON.stringify(this.tables));
            }
        };

        Reservation.prototype.vacateTable = (tableNumber) => {
            let table = this.tables.find(item => item.number === tableNumber);
            if (table == null || table == undefined) {
                alert('This table is not reserved');
                return;
            } else {
                let user = this.users.find(item => (item.tableNumber === tableNumber));
                if (user) {
                    this.users = this.users.filter(e => e !== user)
                }
                table.occupied = 0;
                alert(`Table ${tableNumber} is now free`);
                localStorage.setItem('users', JSON.stringify(this.users));
                localStorage.setItem('tables', JSON.stringify(this.tables));
            }
        };

        let addNewUser = (userName ,tableNumber) => {
            // Split is used to get firstname
            let firstname = userName.split(" ")[0];
            let id = Math.floor(1000 + Math.random() * 9000);
            // Slice is used to form a product access code based on multiple parameters.
            let code = firstname.slice(0, 3) + id;
            // Parse is used to form javascript object from json string.
            let user = JSON.parse(`{ "name": "${userName}", "id": "${id}" , "tableNumber": ${tableNumber}, "code" : "${code}"}\n`);
            this.users.push(user);
            return user;
        }

        let validateTableNumber = (tableNumber) => {
            // Check if tableNumer is a valid number
            if (typeof tableNumber != 'number' || tableNumber <=0 || tableNumber >5 ) {
                alert(`Invalid table number: ${tableNumber}\n`);
                return false;
            }
            // Check if table is available.
            let table = this.tables.find(item => item.number === tableNumber);
            if (table.occupied != 0) {
                alert(`Table ${tableNumber} is reserved. Try other table\n`);
                return false;
            }
            return true;
        };
    }
}

let handleSaveOnBookTable = () => {
    var form = document.forms['User'];
    var input = {
        name: form.name.value,
        tableNumber: parseInt(form.tableNumber.value, 10)
    };
  
    var userStr = localStorage.getItem('users');
    var users = [];
    if (userStr != 'undefined' && userStr != null) {
        users = JSON.parse(userStr);
    }
  
    var tables = [{
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
    },
    {
        number: 4,
        occupied: 0
    },
    {
        number: 5,
        occupied: 0
    },
    ]
    
    var tableStr = localStorage.getItem('tables');
    if (tableStr != 'undefined' && tableStr != null) {
        tables = JSON.parse(tableStr);
    }

    let reservation = new Reservation(users, tables);
    reservation.reserveTable(input.tableNumber, input.name);
    window.location.replace("showActiveUsers.html");
}

let handleSaveOnVacateTable = () => {
    var formEl = document.forms['Table'];
    var inputTableNumber = parseInt(formEl.tableNumber.value, 10);

    var userStr = localStorage.getItem('users');
    var users = [];
    if (userStr != 'undefined' && userStr != null) {
        users = JSON.parse(userStr);
    }

    var tableStr = localStorage.getItem('tables');
    if (tableStr != 'undefined' && tableStr != null) {
        var tables = JSON.parse(tableStr);
    }
    let reservation = new Reservation(users, tables);
    reservation.vacateTable(inputTableNumber);
    window.location.replace("showActiveUsers.html");
}

let showUsers = () => {
    var tableBodyElement = document.getElementById('users');
    var users = JSON.parse(localStorage.getItem('users'));
    var row = {}, i = 0;
    for (i = 0; i < users.length; i++) {
        var user = users[i];
        row = tableBodyElement.insertRow();
        row.insertCell(-1).textContent = user.name;
        row.insertCell(-1);
        row.insertCell(-1);
        row.insertCell(-1).textContent = user.tableNumber;
    }
    tableBodyElement.insertRow();
}