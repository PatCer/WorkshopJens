import { customers, deleteCustomer, getCustomers, createCustomer, getCustomer, routes } from "../services/customer.js";
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})
createCustomer("harry","harrald","beispiel@mail.de","ETUR-CN-34623");
createCustomer("harry2","harrald","beispiel@mail.de","ETUR-CN-34623");


getCustomers(customers)

// Declare a route
fastify.get('/', async function customers (request, reply) {
  return getCustomers(customers);
})
fastify.get('/', async function customersid (request, reply ){
    customerId = request.query();
    return getCustomer(customerId,customers);
})
fastify.post('/', async function customers (request, reply){
    customer = request.body();
})

// Other code...
fastify.register(routes);
try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }