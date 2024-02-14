class Customer{
    constructor(firstName,lastName,email,customerId){
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.customerId = customerId;
    }
};

export const customers = [];

export function getCustomers(customers){
    customers.forEach(customer => {
        console.log(customer);
    });
};

export function createCustomer(firstname,lastname,email,customerId){
    if (validateCustomerId(customerId,customers)){  
        const customer = new Customer(firstname,lastname,email,customerId);
        customers.push(customer);
        return customers;
    }
    else{
        throw new Error;
    }
};

export function getCustomer(customerId, customers){
    return customers.filter((Customer) => Customer.customerId === customerId);
};

export function deleteCustomer(customerId,customers){
    const element = getCustomer(customerId, customers);
    customers.splice(element, 1);
};

export function validateCustomerId(customerId, customers){
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


createCustomer("harry","harrald","beispiel@mail.de","ETUR-CN-34622");
createCustomer("harry2","harrald","beispiel@mail.de","ETUR-CN-34623");

export const customerSchema = {
    schema: {
      body: {
        type: 'object',
        properties: {
          firstname: { type: 'string', minLength: 2 },
          lastname: { type: 'string', minLength: 2 },
          email: {type: 'string', minLength: 6},
          customerId: { type: 'string', minLength: 8},
        },
        required: ['firstname', 'lastname', 'email', 'customerId']
      }
    }
}



export const responseArraySchema = {
    schema: {
      response: {
        200: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
            firstName: { type: 'string', minLength: 2 },
            lastName: { type: 'string', minLength: 2 },
            email: {type: 'string', minLength: 6},
            customerId: { type: 'string', minLength: 8},
            }
          }
        }
      }
    }
  }