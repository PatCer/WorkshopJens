class Customer{
    constructor(firstName,lastName,email,customerId){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.customerId = customerId;
    }
};

const customers = [];

function getCustomers(customers){
    customers.forEach(customer => {
        console.log(customer);
    });
};

function createCustomer(firstname,lastname,email,customerId){
    if (validateCustomerId(customerId,customers)){  
        const customer = new Customer(firstname,lastname,email,customerId);
        customers.push(customer);
        return customer;
    }
    else{
        console.log("Invalid ID")
    }
};

function readCustomers(customerId, customers){
    const customer = customers.filter((Customer) => Customer.customerId === customerId);
    return customer;
};

function deleteCustomer(customerId,customers){
    const element = readCustomers(customerId, customers);
    customers.splice(element, 1);
    return element;
};

function validateCustomerId(customerId, customers){
    const pattern = /ETUR-CN-\w+/;
    const isValid = pattern.test(customerId);
    if (isValid){
        const duplicate = customers.some((Customer) => Customer.customerId === customerId);
        return !duplicate;
    }
    else{
        return false;
    }
};

export {getCustomers, readCustomers, createCustomer, deleteCustomer, customers};