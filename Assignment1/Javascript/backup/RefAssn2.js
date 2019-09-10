"use strict";
class CustomerManagement {
    constructor(customers) {
        this.customers = customers;
        CustomerManagement.prototype.findTopUsers = () => {
            let noOfTimesOfferProvided = 0;
            let notifyCustomers = () => {
                let sortedCustomers = this.customers.sort((a, b) => (a.usageHours < b.usageHours) ? 1 : -1);
                // Destructure array to get top 2 users from sorted array.
                let [first, second] = sortedCustomers;
                // Spread operator to add rank
                first = { ...first, rank: 1 };
                second = { ...second, rank: 2 };

                console.log(`Top 2 users:`);
                console.log(first);
                console.log(second);
                /*
                 Destructure objects to get only emails.
                */
                var { email } = first;
                const email1 = email;
                var { email } = second;
                const email2 = email;
                sendMessage(email1, email2);
                noOfTimesOfferProvided++;
                console.log(`Offer provided ${noOfTimesOfferProvided} times`);
                console.log('-----------------------------------------------------------------------------\n')
            }

            // Rest operator
            let sendMessage = (...emails) => {
                // This method will actually send email using some EMAIL server.
                console.log(`Sent email to: `);
                console.log(emails);
            }
            return notifyCustomers;
        }
    }    
}

let customers = [{
    id: 654,
    name: 'Davis Miller',
    usageHours: 189,
    email: 'dmiller@xyz.com'
},
{
    id: 989,
    name: 'James Wisley',
    usageHours: 90,
    email: 'james@xyz.com'
},
{
    id: 100,
    name: 'Robert Chris',
    usageHours: 100,
    email: 'rchris@xyz.com'
},
{
    id: 101,
    name: 'Wang Fang',
    usageHours: 50,
    email: 'wang@xyz.com'
},
{
    id: 12,
    name: 'Monica Sharma',
    usageHours: 250,
    email: 'msharma@xyz.com'
}];

let custManagement = new CustomerManagement(customers);
//closure is used to keep track of how many times offer is provided
let notifyCustomers = custManagement.findTopUsers();
notifyCustomers();
customers[1].usageHours = 400;
customers[2].usageHours = 500;
notifyCustomers();
customers[4].usageHours = 800;
notifyCustomers();
