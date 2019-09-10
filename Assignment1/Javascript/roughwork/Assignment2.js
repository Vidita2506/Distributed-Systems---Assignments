"use strict";
class UserManagement {
    constructor(users) {
        this.users = users;
        UserManagement.prototype.notifyTopUsers = () => {
            var sortedUsers = this.users.sort((a, b) => (a.usageHours < b.usageHours) ? 1 : -1)

            // Destructure array to get top 2 users from sorted array.
            let [first, second] = sortedUsers;

            // Spread operator to add rank
            first = { ...first, rank: 1 };
            second = { ...second, rank: 2 };

            let notifyUsers = (...topUsers) => {
                console.log(`Top 2 users:`);
                console.log(topUsers);

                /*
                 Closure - The function can access outer function variables.
                 Destructure objects to get only emails.
                */
                var { email } = first;
                const email1 = email;

                var { email } = second;
                const email2 = email;

                sendMessage(email1, email2);
            }

            // Rest operator
            let sendMessage = (...emails) => {
                console.log(`Sending email to: `);
                console.log(emails);
            }

            notifyUsers(first, second);
        }
    }    
}

var users = [
    {
        id: 654,
        name: 'Chris Opo',
        usageHours: 189,
        email: 'chris@xyz.com'
    },
    {
        id: 989,
        name: 'James Roy',
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
        name: 'Ram Sharma',
        usageHours: 250,
        email: 'rsharma@xyz.com'
    }
];

var user = new UserManagement(users);;
user.notifyTopUsers();
