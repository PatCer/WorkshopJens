document.addEventListener("DOMContentLoaded", () => {
    const submitButton = document.getElementById('btn');
    submitButton.addEventListener('click', () => {
        const form = document.querySelector("form");
        createReport(form);
    })
});

async function createReport(form){
    const formData = new FormData(form);
    const data = {
        "category": getSelectedRadioButtonValue(form.elements['category-field']),
        "customerId": formData.get("customerId-field"),
        "description": formData.get("description-field"),
        "labels": formData.get("label-field").split(","),
        "owner": formData.get("owner-field"),
        "state": "open"
    };
    fetch("http://localhost:3000/report",{
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),       
    });
    location.reload();
}

function getSelectedRadioButtonValue(radioButton) {
    for (const rb of radioButton) {
        if (rb.checked) {
            return rb.value;
        }
    }
    return null;
}

//form id = formid
//button id = btn
