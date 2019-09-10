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
                    /*
                     Added new user should be sent back as text response to the admin.
                     Stringify is used to get JSON string from JS object.
                    */
                    alert(`Provide this code to the user: ${user.code}`);
                } else {
                    alert(`New user wasn't added\n`);
                }
            }
        };

        Reservation.prototype.vacateTable = (tableNumber) => {
            let user = this.users.find(item => (item.tableNumber === tableNumber));
            if (user) {
                this.users = this.users.filter(e => e !== user)
            }
            let table = this.tables.find(item => item.number === tableNumber);
            if (table == null || table == undefined) {
                alert('This table is not reserved');
                return;
            }
            table.occupied = 0;
            alert(`Table ${tableNumber} is now free`);
        };

        let addNewUser = (userName ,tableNumber) => {
            // Split is used to get firstname & lastname
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
            if (typeof tableNumber != 'number') {
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

Reservation.bookTable = () => {
    var saveButton = document.forms['User'].commit;
    saveButton.addEventListener("click", handleSaveOnBookTable);
}

Reservation.vacateTable = () => {
    var saveButton = document.forms['Table'].commit;
    saveButton.addEventListener("click", handleSaveOnVacateTable);
}

let handleSaveOnBookTable = () => {
    var formEl = document.forms['User'];
    var input = {
        name: formEl.name.value,
        tableNumber: parseInt(formEl.tableNumber.value, 10)
    };
  
    var userStr = sessionStorage.getItem('users');
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
    }]
    
    var tableStr = sessionStorage.getItem('tables');
    if (tableStr != 'undefined' && tableStr != null) {
        tables = JSON.parse(tableStr);
    }

    let reservation = new Reservation(users, tables);
    reservation.reserveTable(input.tableNumber, input.name);
    sessionStorage.setItem('users', JSON.stringify(reservation.users));
    sessionStorage.setItem('tables', JSON.stringify(reservation.tables));
    alert(`Table ${input.tableNumber} reserved for user: ${input.name}`);
    formEl.reset();
}

let handleSaveOnVacateTable = () => {
    var formEl = document.forms['Table'];
    var inputTableNumber = parseInt(formEl.tableNumber.value, 10);

    var userStr = sessionStorage.getItem('users');
    var users = [];
    if (userStr != 'undefined' && userStr != null) {
        users = JSON.parse(userStr);
    }

    var tableStr = sessionStorage.getItem('tables');
    if (tableStr != 'undefined' && tableStr != null) {
        var tables = JSON.parse(tableStr);
    }
    let reservation = new Reservation(users, tables);
    reservation.vacateTable(inputTableNumber);
    sessionStorage.setItem('users', JSON.stringify(reservation.users));
    sessionStorage.setItem('tables', JSON.stringify(reservation.tables));
    formEl.reset();
}

Reservation.showUsers = () => {
    var tableBodyElement = document.getElementById('users');
    var users = JSON.parse(sessionStorage.getItem('users'));
    var row = {}, i = 0;
    for (i = 0; i < users.length; i++) {
        var user = users[i];
        row = tableBodyElement.insertRow();
        row.insertCell(-1).textContent = user.name;
        row.insertCell(1).textContent = user.tableNumber;
    }
}