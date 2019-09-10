"use strict";
function notifyTopRankedStudents() {
    let students = [
        {
            name: "James Roy",
            email: "james@xyz.com",
            score: 65
        },
        {
            name: "Wang Fang",
            email: "wfang@xyz.com",
            score: 80
        },
        {
            name: "Robert Chris",
            email: "rchris@xyz.com",
            score: 55
        },
        {
            name: "Andy",
            email: "andy@xyz.com",
            score: 99
        }
    ];

    students.sort((a, b) => (a.score < b.score) ? 1 : -1)
    let [first, second] = students;
    first = { ...first, rank: 1 };
    second = { ...second, rank: 2 };
   
    let notifyStudents = (...awardedStudents) => {
        console.log(`Top 2 student details:`);
        console.log(awardedStudents);

        const email1 = { first };
        const email2 = { second };

        sendMessage(email1 ,email2);
    }

    let sendMessage = (...emails) => {
        console.log(`Sending email to: `);
        console.log(emails);
    }

    notifyStudents(first, second);
}

notifyTopRankedStudents();
