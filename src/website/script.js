document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/customers");
    if (response.ok) {
      const data = await response.json();
      console.log(data)
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
      <tr>
        <td>${customer.firstName}</td>
        <td>${customer.lastName}</td>
        <td>${customer.email}</td>
        <td>${customer.customerId}</td>
      </tr>
    `;
    customersList.appendChild(customerTr);
  }