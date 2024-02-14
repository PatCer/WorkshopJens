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
        "category": formData.get("category-field"),
        "customerId": formData.get("customerId-field"),
        "description": formData.get("description-field"),
        "labels": formData.get("label-field").split(","),
        "owner": formData.get("owner-field"),
    };
    fetch("http://localhost:3000/report",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    });
}
//form id = formid
//button id = btn
