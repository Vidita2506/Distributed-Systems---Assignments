'use strict';
class Reservation {
    constructor(users, slots) {
        this.users = users;
        this.slots = slots;
        
        // Arror functions - demonsrates the usage of this and it's context bound to explicit calling object.
        Reservation.prototype.reserveSlot = (slotNumber, userName) => {
            if (validateSlotNumber(slotNumber)) {
                let slot = this.slots.find(item => item.number === slotNumber);
                slot.occupied = 1;
                let user = addNewUser(userName, slotNumber);
                // Includes is used to see if the new user is added to active users list.
                if (this.users.includes(user)) {
                    alert(`Slot ${slotNumber} reserved for user ${userName}.`);
                } else {
                    alert(`New user wasn't added\n`);
                }
                localStorage.setItem('users', JSON.stringify(this.users));
                localStorage.setItem('slots', JSON.stringify(this.slots));
            }
        };

        Reservation.prototype.vacateSlot = (slotNumber) => {
            let slot = this.slots.find(item => item.number === slotNumber);
            if (slot == null || slot == undefined) {
                alert('This slot is not reserved');
                return;
            } else {
                let user = this.users.find(item => (item.slotNumber === slotNumber));
                if (user) {
                    this.users = this.users.filter(e => e !== user);
                    slot.occupied = 0;
                    alert(`Slot ${slotNumber} is now free`);
                    localStorage.setItem('users', JSON.stringify(this.users));
                    localStorage.setItem('slots', JSON.stringify(this.slots));
                } else {
                    alert('This slot is not reserved');
                }
            }
        };

        let addNewUser = (userName ,slotNumber) => {
            let id = Math.floor(1000 + Math.random() * 9000);
            // Parse is used to form javascript object from json string.
            let user = JSON.parse(`{ "name": "${userName}", "id": "${id}" , "slotNumber": ${slotNumber}}\n`);
            this.users.push(user);
            return user;
        }

        let validateSlotNumber = (slotNumber) => {
            // Check if slotNumber is a valid number
            if (typeof slotNumber != 'number' || slotNumber <= 0 || slotNumber >5 ) {
                alert(`Invalid slot number: ${slotNumber}\n`);
                return false;
            }
            // Check if slot is available.
            let slot = this.slots.find(item => item.number === slotNumber);
            if (slot.occupied != 0) {
                alert(`Slot ${slotNumber} is reserved. Try other slot\n`);
                return false;
            }
            return true;
        };
    }
}

let handleSaveOnBookSlot = () => {
    var form = document.forms['User'];
    var input = {
        name: form.name.value,
        slotNumber: parseInt(form.slotNumber.value, 10)
    };
  
    var userStr = localStorage.getItem('users');
    var users = [];
    if (userStr != 'undefined' && userStr != null) {
        users = JSON.parse(userStr);
    }
  
    var slots = [{
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
    
    var slotStr = localStorage.getItem('slots');
    if (slotStr != 'undefined' && slotStr != null) {
        slots = JSON.parse(slotStr);
    }

    let reservation = new Reservation(users, slots);
    reservation.reserveSlot(input.slotNumber, input.name);
    window.location.replace("showCurrentAllotment.html");
}

let handleSaveOnVacateSlot = () => {
    var formEl = document.forms['Slot'];
    var inputSlotNumber = parseInt(formEl.slotNumber.value, 10);

    var userStr = localStorage.getItem('users');
    var users = [];
    if (userStr != 'undefined' && userStr != null) {
        users = JSON.parse(userStr);
    }

    var slotStr = localStorage.getItem('slots');
    if (slotStr != 'undefined' && slotStr != null) {
        var slots = JSON.parse(slotStr);
    }
    let reservation = new Reservation(users, slots);
    reservation.vacateSlot(inputSlotNumber);
    window.location.replace("showCurrentAllotment.html");
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
        row.insertCell(-1).textContent = user.slotNumber;
    }
    tableBodyElement.insertRow();
}