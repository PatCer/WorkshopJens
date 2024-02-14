const editable = false;
const detailed = false;





document.addEventListener("DOMContentLoaded", async () => {
const response = await fetch("http://localhost:3000/report");
if (response.ok) {
    const data = await response.json();
    console.log(data)
    createTableHeader();
    data.forEach((report) => {
    createReportCard(report);
    });


    var table = document.getElementById('report-table');

    var rows = table.getElementsByTagName('tr');
    for (var i = 0; i < rows.length; i++) {
    rows[i].addEventListener('click', function() {
        var cells = this.getElementsByTagName('td');
        var rowData = [];
        for (var j = 0; j < cells.length; j++) {
        rowData.push(cells[j].textContent);
        const report = data.filter((reports) => reports.id === rowData);


        const editButton = document.getElementById('edit-button');
        editButton.addEventListener('click', () => {
        if (editable){
            editable = false;
            location.reload();
        }
        else{
            editable = true;
            location.reload();
        }
        })
        if(editable){
            editReportCard(report);
            report.comments.forEach((comment)=>{
            getComments(comment);
        })
        }
        else{
            showReportCard(report);
            report.comments.forEach((comment)=>{
            getComments(comment);
        })
        }
        }      
    });
    }
}
});
  



function createTableHeader() {
    const reportList = document.getElementById("report-table");
    const reportTr = document.createElement("tr");
    reportTr.classList.add("report-card");
    
    reportTr.innerHTML = `
        <tr>
        <td>Report ID</td>
        <td>Customer ID</td>
        <td>Category</td>
        <td>Label</td>
        <td>Status</td>
        </tr>
    `;
    reportList.appendChild(reportTr);
    }

function createReportCard(report) {
const reportList = document.getElementById("report-table");
const reportTr = document.createElement("tr");
reportTr.classList.add("report-card");

reportTr.innerHTML = `
    <tr>
    <td>${report.id}</td>
    <td>${report.customerId}</td>
    <td>${report.category}</td>
    <td>${report.labels}</td>
    <td>${report.state}</td>
    </tr>
`;
reportList.appendChild(reportTr);
}

function showReportCard(report) {
const reportList = document.getElementById("detailedreport-list");
const reportDiv = document.createElement("div");
reportDiv.classList.add("detailedReport-card");

reportDiv.innerHTML = `
    <input value= ${report.id} disabled></input>
    <input value= ${report.customerId} disabled></input>
    <input value= ${report.category} disabled></input>
    <input value= ${report.status} disabled></input>
    <input value= ${report.closeReason} disabled></input>
`;
reportList.appendChild(reportDiv);
}

function editReportCard(report) {
const reportList = document.getElementById("detailedreport-list");
const reportDiv = document.createElement("div");
reportDiv.classList.add("detailedReport-card");

reportDiv.innerHTML = `
    <input value= ${report.id}></input>
    <input value= ${report.customerId}></input>
    <input value= ${report.category}></input>
    <input value= ${report.status}></input>
    <input value= ${report.closeReason}></input>
`;
reportList.appendChild(reportDiv);
}

function getComments(comment){
const reportList = document.getElementById("detailedreport-list");
const reportDiv = document.createElement("div");
reportDiv.classList.add("detailedReport-card");
reportDiv.innerHTML =`
    <input value= ${comment.text} disabled></input>
`;
reportList.appendChild(reportDiv);
}



