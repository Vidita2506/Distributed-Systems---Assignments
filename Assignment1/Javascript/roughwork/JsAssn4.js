'use strict';
class User {
    constructor(id, name, contact, address) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.address = address;
    }

    getUserDetails() {
        console.log(this.name + this.contact + this.address);
    }
}

class Customer extends User {
    constructor(accountNumber, accountType, name, contact, address) {
        super(accountNumber, name, contact , address);
        this.accountType = accountType;
    }

    getUserDetails() {
        console.log('Customer: ' + this.name + this.contact + this.address);
    }

    getCustomerAccountType() {
        console.log(`Account Type: ${this.accountType}`);
    }

}

class Employee extends User {
    constructor(empId, name, contact, address, role) {
        super(empId, name, contact, address);
        this.role = role;
    }

    getUserDetails() {
        console.log('Employee: ' + this.name + this.contact + this.address);
    }

    getEmployeeRole() {
        console.log(`Employee role: ${this.role}`);
    }
}

var c = new Customer('1234567892', 'Savings', 'James', '+14084084848', 'San Jose');
c.getUserDetails();
c.getCustomerAccountType();

var manager = new Employee('11-11', 'Joy', '+15185186767', 'Los Angeles', 'Manager');
manager.getUserDetails();
manager.getEmployeeRole();

var employee2 = Object.assign(manager);
employee2.id = '23-23';
employee2.role = 'Senior Branch Manager';
employee2.getUserDetails();
employee2.getEmployeeRole(); 

var assistant = new Employee('12-12', 'Chris', '+15187869090', 'Santa Clara', 'Assistant');
assistant.getUserDetails();
assistant.getEmployeeRole();