document.addEventListener("DOMContentLoaded", async () => {
    const submitButton = document.getElementById('btn');
    submitButton.addEventListener('click', () => {
        const form = document.getElementById("formid");
        createCustomer(form);
    })
});
       
async function createCustomer(form){
    const formData = new FormData(form);
    const data = {
        "firstname": formData.get("firstname-field"),
        "lastname": formData.get("lastname-field"),
        "email": formData.get("email-field"),
        "customerId": formData.get("customerid-field"),
    };
    console.log(formData);
    console.log(formData.get("customerid-field"));
    console.log(data);
    fetch("http://localhost:3000/customers",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
}