import cors from '@fastify/cors'

fastify.register(cors, {
  origin: '*'
});


document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/customers");
    if (response.ok) {
      const data = await response.json();
      data.forEach((customer) => {
        createCustomerCard(customer);
      });
    }
  });


  function createCustomerCard(customer) {
    const customersList = document.getElementById("customer-list");
    const customerTr = document.createElement("tr");
    customerTr.classList.add("customer-card");
  
    customerTr.innerHTML = `
        <li>${customer.firstName}</li>
        <li>${customer.lastName}</li>
        <li>${customer.email}</li>
        <li>${customer.customerId}</li>
    `;
    customersList.appendChild(customerTr);
  }
