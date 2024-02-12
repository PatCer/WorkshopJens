import { customers, deleteCustomer, getCustomers, createCustomer, readCustomers } from "../services/customer.js";
import Fastify from 'fastify'
const fastify = Fastify({
  logger: true
})
createCustomer("harry","harrald","beispiel@mail.de","ETUR-CN-34623");
createCustomer("harry2","harrald","beispiel@mail.de","ETUR-CN-34623");


getCustomers(customers)

import { routes } from '../services/customer.js'
// Other code...
fastify.register(routes);
try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }