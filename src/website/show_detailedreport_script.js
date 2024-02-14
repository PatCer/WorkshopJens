const editable = false;
document.addEventListener("DOMContentLoaded", async () => {
    const response = await fetch("http://localhost:3000/report");
    if (response.ok) {
      const data = await response.json();
      console.log(data)
      data.forEach((report) => {
        const submitButton = document.getElementById('btn');
        submitButton.addEventListener('click', () => {
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
      });
    }
  });


  function showReportCard(report) {
    const reportList = document.getElementById("report-list");
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
    const reportList = document.getElementById("report-list");
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
    const reportList = document.getElementById("report-list");
    const reportDiv = document.createElement("div");
    reportDiv.classList.add("detailedReport-card");
    reportDiv.innerHTML =`
        <input value= ${comment.text} disabled></input>
    `;
    reportList.appendChild(reportDiv);
}