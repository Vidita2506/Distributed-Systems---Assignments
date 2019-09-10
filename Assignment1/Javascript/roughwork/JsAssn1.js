'use strict';
function UpdateTableAvailability(tableNumber, allocate, customerName, customerId) {
    if (customerId != undefined && typeof customerId != 'number') {
        console.error(`Invalid customerId: ${customerId}\n`);
        return;
    }
    this.tableOccupied = [0,0,0,0,0];
    this.customers = [
        {
            name: "Vidita Daga",
            id: 1234
        },
        {
            name: "James Roy",
            id: 2929
        },
        {
            name: "Divya Gupta",
            id: 7876
        }
    ];
   
    let occupyTable = () => {
        var firstname = customerName.split(" ")[0];
        var lastname = customerName.split(" ")[1];
        const found = this.customers.some(item => item.id === customerId);
        this.tableOccupied[tableNumber] = 1;
        console.log(`Table ${tableNumber} is allocated to ${customerName}`);
        if (found) {
            console.log(`${customerName} is already a member. Provide discount of 10%\n`);
        } else {
            var randomId = Math.floor(1000 + Math.random() * 9000);
            var code = firstname.slice(0, 3) + lastname.slice(0, 3) + randomId;
            var newcustomer = JSON.parse(`{ "name": "${customerName}", "id": "${randomId}" }`);
            this.customers.push(newcustomer);
            var newCustomerString = JSON.stringify(newcustomer);
            if (this.customers.includes(newcustomer)) {
                console.log(`New customer added succesfully: ${newCustomerString}. Provide id: ${randomId} & code: ${code} to the customer:\n`);
            } else {
                console.log(`New customer wasn't added\n`);
            }
        }
    }

    let releaseTable = (tableNumber) => {
        this.tableOccupied[tableNumber] = 0;
        console.log(`Table ${tableNumber} is now free!`);
    }

    if (allocate) {
        occupyTable(tableNumber);
    } else {
        releaseTable(tableNumber);
    }
}
var updateTableAvailability = new UpdateTableAvailability(0, true, "Vidita Daga", 1234);
updateTableAvailability = new UpdateTableAvailability(1, true, "John Daves");
updateTableAvailability = new UpdateTableAvailability(2, true, "Wang Fang");
updateTableAvailability = new UpdateTableAvailability(3, true, "Robert Cris", "xyz");
updateTableAvailability = new UpdateTableAvailability(1, false);