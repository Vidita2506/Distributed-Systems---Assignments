'use strict';
function assignBook(bookCode1, bookCode2, bookCode3) {
    if (undefined != bookCode1) {
        this.books.push(bookCode1);
        console.log(`Added book: ${bookCode1} to user ${this.name} list\n`);
    }
    if (undefined != bookCode2) {
        this.books.push(bookCode2);
        console.log(`Added book: ${bookCode2} to user ${this.name} list\n`);
    }
    if (undefined != bookCode3) {
        this.books.push(bookCode3);
        console.log(`Added book: ${bookCode3} to user ${this.name} list\n`);
    }
    console.log(`Updated user: `);
    console.log(this);
    console.log('-------------------------------------------------------------');
}

function returnBook(bookCode1, bookCode2, bookCode3) {
    if (bookCode1 != undefined) {
        let book1 = this.books.find(item => (item === bookCode1));
        this.books = this.books.filter(e => e !== book1);
        console.log(`Removed book : ${bookCode1} from user ${this.name} book list\n`);
    }
    if (bookCode2 != undefined) {
        let book2 = this.books.find(item => (item === bookCode2));
        this.books = this.books.filter(e => e !== book2);
        console.log(`Removed book : ${bookCode2} from user ${this.name} book list\n`);
    }
    if (bookCode3 != undefined) {
        let book3 = this.books.find(item => (item === bookCode3));
        this.books = this.books.filter(e => e !== book3);
        console.log(`Removed book : ${bookCode3} from user ${this.name} book list\n`);
    }
    console.log(`Updated user: `);
    console.log(this);
    console.log('------------------------------------------------------------------------');
}

let users = [
    {
        id: 654,
        name: 'James Brown',
        books: [1189]
    },
    {
        id: 655,
        name: 'Harry Potter',
        books: [1091, 1092]
    }
];
let books = [
    {
        code: 1189,
        name: 'The Digital Fortress'
    },
    {
        code: 1090,
        name: 'Little Women'
    },
    {
        code: 1091,
        name: '7 Habits of highly effective people',
    },
    {
        code: 1092,
        name: 'The Book Thief'
    },
    {
        code: 1093,
        name: 'Harry Potter'
    }];
    
console.log('Current book allocation: ');
console.log(users);
console.log('-----------------------------------------------------------------');
assignBook.call(users[0], 1093);
returnBook.call(users[0], 1189);
returnBook.apply(users[1], [1091, 1092]);
assignBook.apply(users[1], [1189, 1090]);
var bound = returnBook.bind(users[1]);
console.log(bound(1189, 1090));