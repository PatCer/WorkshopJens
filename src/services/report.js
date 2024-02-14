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

export class Comment{
    constructor(author, text, createdAt, type){
        this.author = author;
        this.text = text;
        this.createdAt = createdAt;
        this.type = type;
    }
}

export const reports = [];

function generateRandomId() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let randomId = '';
  
    for (let i = 0; i < 4; i++) {
      const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
      randomId += randomChar;
    }
  
    return randomId;
}

export function createNewReport(category, customerId, description, labels, owner, state, references){
    const id = generateRandomId();
    if (reports.some((Report) => Report.id === id)){       
    }
    else{
        const report = new Report(id,category, customerId, description, labels, owner,'-',new Date(),'-','-',state,'-',['-'],'-',references);
        reports.push(report);
        return
    }
}

export function changeReport(id ,labels ,assignedTo ,state, priority, comments, closeReason, references){   
    getReport(id).labels.push(labels);
    getReport(id).references.push(references);
    getReport(id).assignedTo = assignedTo;
    getReport(id).state = state;
    getReport(id).priority = priority;
    getReport(id).closeReason = closeReason;
    const currentTimestamp = new Date();
    getReport(id).editedAt = currentTimestamp;
}

export function addComment(newComment){
    newComment.createdAt = new Date();
    getReport(id).comments.push(newComment)
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

const comments = []
const comments2 = []
const comment = new Comment('Patrik','Sehr Kaputt','11.12.2024', 'dev comment')
comments.push(comment);
const comment2 = new Comment('Patrik','Sehr Kaputt','11.12.2024', 'dev comment')
comments.push(comment2);
const comment3 = new Comment('Patrik','Sehr Kaputt','11.12.2024', 'dev comment')
comments2.push(comment3);
const comment4 = new Comment('Patrik','Sehr Kaputt','11.12.2024', 'dev comment')
comments2.push(comment4);

const report = new Report(1,'Bug', 'ETUR-CN-34623', 'hallo, alles kaputt', ['drei lable'],'me' , 'Patrik', 'jetzt', 'Jetzt plus 5 min', 'noch nicht', 'in Bearbeitung', 1, comments, 'none', ['wikipedia.de/idunno']);
const report2 = new Report(3,'Bug2', 'ETUR-CN-34623', 'hallo, alles kaputt', ['zwei lable'],'me' , 'Patrik', 'jetzt', 'Jetzt plus 5 min', 'noch nicht', 'in Bearbeitung', 1, comments2, 'none', ['wikipedia.de/idunno']);
reports.push(report);
reports.push(report2);