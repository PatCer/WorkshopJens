import Fastify from 'fastify'
import cors from '@fastify/cors'
import { Report, reports, getReportByCustomerId , createNewReport ,deleteReport ,changeReport, getReport, getReportByAssignedTo } from '../services/report.js'
import { responseArraySchema, customerSchema, getCustomer, deleteCustomer, createCustomer, customers} from '../services/customer.js'


const fastify = Fastify({
  logger: true
})

fastify.register(cors, {
  origin: '*'
});


export async function routes (fastify, options) {
    fastify.get('/', async (request, reply) => {
    });
  }




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
        return 'CustomerId is in wrong or already exsists'
    }
})
fastify.delete('/customers/:id', async function deleteCustomers (request, reply){
    const { id } = request.params;
    return deleteCustomer(id,customers);
})
  


fastify.get('/report', async function getReport (request, reply) {
    return reports;
  })
fastify.get('/report/customer/:customerId', async function getReportbyCustomerId (request, reply) {
    return getReportByCustomerId(request.params.customerId);
})
fastify.get('/report/:id', async (request, reply) =>{
    return getReport(request.params.id);
})
fastify.get('/report/assignedTo/:assignedTo', async (request, reply) =>{
    return getReport(request.params.assignedTo);
})
fastify.post('/report', async (request,reply) =>{  
    createNewReport();
})
fastify.delete('/report/:id',async (request,reply)=>{
    const { id } = request.params;
    return deleteReport(id);
})
fastify.put('/report', async (request, reply) =>{
    const data = request.body;
    changeReport(data.id, data.lables, data.assignedTo, data.state, data.priority, data.comments, data.closeReason, data.references)
})



fastify.register(routes);
try {
    await fastify.listen({ port: 3000 })
} catch (err) {
    fastify.log.error(err)
    process.exit(1)
}