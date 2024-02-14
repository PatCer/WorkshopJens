export class Report {
    constructor(id, category, customerId, description, labels, owner, assignedTo, createdAt, editedAt, closedAt, state, priority, comments, closeReason, references){ 
        this.id = id;
        this.category = category;
        this.customerId = customerId;
        this.description = description;
        this.labels = labels || [];
        this.owner = owner;
        this.assignedTo = assignedTo;
        this.createdAt = createdAt;
        this.editedAt = editedAt;
        this.closedAt = closedAt;
        this.state = state;
        this.priority = priority;
        this.comments = comments || [];
        this.closeReason = closeReason;
        this.references = references || [];
    }
};

export const reports = [];

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomId = '';
  
    for (let i = 0; i < 4; i++) {
      // Choose a random character from the 'characters' string
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
  
      // Append the random character to the ID
      randomId += randomChar;
    }
  
    return randomId;
}

export function createNewReport(category, customerId, description, labels, owner, state, references){
    do{
        const id = generateRandomId();
        if (reports.some((Report) => Report.id === id)){
            const report = new Report(id,category, customerId, description, labels, owner,'-',Date.now,'-','-',state,'-','-','-',references);
            reports.push(report);
            return
        }
    }while(true)
}

export function changeReport(id ,labels ,assignedTo ,state, priority, comments, closeReason, references){   
    getReport(id).labels.push(labels);
    getReport(id).comments.push(comments);
    getReport(id).references.push(references);
    getReport(id).assignedTo = assignedTo;
    getReport(id).state = state;
    getReport(id).priority = priority;
    getReport(id).closeReason = closeReason;
    const currentTimestamp = Date.now();
    getReport(id).editedAt = currentTimestamp;
}

export function getReport(id){
    return reports.find((Report) => Report.id === id);
};

export function getReportByCustomerId(customerId){
    return reports.filter((Report) => Report.customerId === customerId);
};

export function getReportByAssignedTo(assignedTo){
    return reports.filter((Report) => Report.assignedTo === assignedTo);
}

export function deleteReport(id){
    const index = getReport(id);
    reports.splice(index,1)
}



export const customerSchema = {
    schema: {
      body: {
        type: 'object',
        properties: {
          category: { type: 'string', minLength: 0 },
          customerId: { type: 'string', minLength: 0 },
          description: {type: 'string', minLength: 0},
          labels: { type: 'string', minLength: 0},
        },
        required: ['firstname', 'lastname', 'email', 'customerId']
      }
    }
}


const report = new Report(1,'Bug', 'ETUR-CN-34623', 'hallo, alles kaputt', ['drei lable'],'me' , 'Patrik', 'jetzt', 'Jetzt plus 5 min', 'noch nicht', 'in Bearbeitung', 1, ['Isch Kaputt','Isch wirklich Kaputt'], 'none', ['wikipedia.de/idunno']);
const report2 = new Report(3,'Bug2', 'ETUR-CN-34623', 'hallo, alles kaputt', ['zwei lable'],'me' , 'Patrik', 'jetzt', 'Jetzt plus 5 min', 'noch nicht', 'in Bearbeitung', 1, ['Isch Kaputt','Isch wirklich Kaputt'], 'none', ['wikipedia.de/idunno']);
reports.push(report);
reports.push(report2);