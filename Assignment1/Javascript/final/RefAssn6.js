'use strict';
function assignUserStory(story1, story2, story3) {
    if (undefined != story1) {
        this.stories.push(story1);
        console.log(`Assigned story: ${story1} to employee: ${this.name}\n`);
    }
    if (undefined != story2) {
        this.stories.push(story2);
        console.log(`Assigned story: ${story2} to employee: ${this.name}\n`);
    }
    if (undefined != story3) {
        this.stories.push(story3);
        console.log(`Assigned story: ${story3} to employee: ${this.name}\n`);
    }
    console.log(`Updated employee: `);
    console.log(this);
    console.log('-------------------------------------------------------------');
}

let employees = [
    {
        id: 654,
        name: 'Maria Gracia',
        stories: []
    },
    {
        id: 655,
        name: 'David Smith',
        stories: []
    },
    {
        id: 656,
        name: 'Michael Johnson',
        stories: []
    }
];
let userstories = [
    {
        code: 100,
        name: 'Implement shopping cart for website'
    },
    {
        code: 101,
        name: 'Design CRUD operations for ECommerce products'
    },
    {
        code: 102,
        name: 'Implement billing module',
    },
    {
        code: 103,
        name: 'Desing user interfaces for the website'
    },
    {
        code: 104,
        name: 'Defect-110: Product description is not shown correctly'
    }];
    
console.log('User stories in Sprint\n');
console.log(userstories);
console.log('----------------------------------------------------------------\n');
assignUserStory.call(employees[0], 100);
assignUserStory.apply(employees[1], [101, 102]);
let bound = assignUserStory.bind(employees[2]);
console.log(bound(100, 103, 104));