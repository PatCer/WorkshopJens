import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})


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
        return customers;
    }
    else{
        throw new TypeError
    }
};

function getCustomer(customerId, customers){
    return customers.filter((Customer) => Customer.customerId === customerId);
};

function deleteCustomer(customerId,customers){
    const element = getCustomer(customerId, customers);
    customers.splice(element, 1);
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


createCustomer("harry","harrald","beispiel@mail.de","ETUR-CN-34622");
createCustomer("harry2","harrald","beispiel@mail.de","ETUR-CN-34623");

const customerSchema = {
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



const responseArraySchema = {
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


export {getCustomers, getCustomer, createCustomer, deleteCustomer, customers};

export async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
    });
  }



// Declare a route
fastify.get('/customers',responseArraySchema , async function getCustomers (request, reply) {
    return customers;
  })
fastify.get('/customers/:Id', async (request, reply ) => {  
    return getCustomer(request.params.Id, customers);
})
fastify.post('/customers', customerSchema, async function createCustomers (request, reply){
    try{
        createCustomer(request.body.firstname,request.body.lastname,request.body.email,request.body.customerId)    
    }
    catch{
        reply.statusCode = 400
        return 'CustomerId is in wrong schema'
    }
})
fastify.delete('/customers/:id', async function deleteCustomers (request, reply){
    const { id } = request.params;
    return deleteCustomer(id,customers);
})
  
  // Other code...
fastify.register(routes);
try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}