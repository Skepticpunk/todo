import "./page.css";

class toDoEntry {
  #priority = 0;
  #title = "Title";
  #description = "Description";
  #added = "1/1/1900";
  #due = "12/31/2099";
  #status = 0;
  #attributes = [
    this.priority,
    this.#title, 
    this.#description,
    this.#added,
    this.#due,
    this.#status
  ]

  get title() { return this.#title };
  set title(newTitle) { this.#title = newTitle };
  get desc() { return this.#description };
  set desc(newDesc) { this.#description = newDesc };
  get added() { return this.#added; }
  set added(newAdded) { this.#added = newAdded }
  get due() { return this.#due };
  set due(newDue) { this.#due = newDue };
  get priority() { return this.#priority };
  set priority(newPriority) { this.#priority = newPriority };
  get status() { return this.#status };
  set status(newStatus) { this.#status = newStatus };
  get attributes() { return this.#attributes };
  
  constructor(priority, title, description, added, due) {
    this.#priority = priority;
    this.#title = title;
    this.#description = description;
    this.#added = added;
    this.#due = due;
  };
};
class entryDisplay {
  #elements = [];

  #cellPriority;
  #cellTitle;
  #cellDesc;
  #cellAdded;
  #cellDue;
  #cellStatus;

  #entryCell = document.createElement("div");
  #cellRemoveButton = document.createElement("button");
  #expDesc = document.querySelector("#toDoDesc");

  get entryCell() {return this.#entryCell}
  get cellPriority() {return this.#cellPriority};
  get cellTitle() {return this.#cellTitle};
  get cellDesc() {return this.#cellDesc};
  get cellAdded() {return this.#cellAdded}
  get cellDue() {return this.#cellDue};
  get cellStatus() {return this.#cellStatus};
  get removeButton() {return this.#cellRemoveButton};

  render() {
    this.#entryCell.textContent = "";
    this.#elements.forEach((element) => {
      this.#entryCell.append(element);
    })
    this.#entryCell.append(this.#cellRemoveButton);
  }

  constructor(entry) {
    for(let i = 0; i < 6; i++){
      this.#elements.push(document.createElement("div"))
    };
    this.#cellPriority = this.#elements[0];
    this.#cellTitle = this.#elements[1];
    this.#cellDesc = this.#elements[2];
    this.#cellAdded = this.#elements[3];
    this.#cellDue = this.#elements[4];
    this.#cellStatus = this.#elements[5];
    this.#entryCell.id = "entry";
    this.#cellTitle.id = "entryTitle";
    if(entry) {
      this.#cellPriority.textContent = entry.priority;
      this.#cellTitle.textContent = entry.title;
      this.#cellDesc.textContent = entry.desc;
      this.#cellAdded.textContent = entry.added;
      this.#cellDue.textContent = entry.due;
      this.#cellStatus.textContent = entry.status;
      this.#cellRemoveButton.textContent = "-";
    };
    this.#entryCell.addEventListener("mouseover", () => { this.#expDesc.textContent = entry.desc })
    this.#entryCell.addEventListener("mouseout", () => { this.#expDesc.textContent = "" })
    this.#cellRemoveButton.addEventListener("click", () => { this.#expDesc.textContent = ""; this.#entryCell.remove() })
  };
};
class toDoList {
  #list = [];
  #title = "Unspecified Title";
  addEntry(newEntry) { this.#list.push(newEntry) };
  delEntry(entry) { this.#list.splice(entry, 1) };
  getEntry(entry) { return this.#list[entry] };
  moveEntry(entry, position) {
    targetEntry = this.#list[entry];
    this.#list.splice(entry, 1);
    this.#list.splice(position - 1, 0, targetEntry);
  };

  get list() { return this.#list };
  get title() { return this.#title };
  set title(newTitle) { this.#title = newTitle; };

  constructor(title) { this.#title = title };
};
class listDisplay {
  #parent;
  #header;
  #listDisplay;
  #list = [];
  #addButton;
  #newEntry;
  #newEntryDisplay;

  get list() { return this.#list };
  get displayNode() { return this.#listDisplay };
  set displayNode(newListDisplay) { this.#listDisplay = newListDisplay };
  get parent() { return this.#parent };
  set parent(newParent) { this.#parent = newParent };
  get header() { return this.#header };
  set header(newHeader) { this.#header = newHeader };
  
  createNewEntryPrompt = () => {
    this.#newEntry = new toDoEntry();
    this.#newEntryDisplay = new entryDisplay(this.#newEntry);
    this.#newEntryDisplay.id = "newEntry";
    console.log(this.#newEntryDisplay);
    console.log(this.#newEntryDisplay.id);
    this.#header.textContent = "";
    this.#header.append(this.#newEntryDisplay.entryCell);
    this.#header.backgroundColor = "silver";
    this.#addButton.removeEventListener("click", this.createNewEntryPrompt);
    this.#addButton.addEventListener("click", this.submitEntry);
    this.#addButton.textContent = "Submit";
  };
render() {
    this.#listDisplay.textContent = "";
    this.#header.textContent = this.#list.title;
    this.#list.list.forEach((entry) => {
      if (entry instanceof toDoEntry) {
       const newEntry = new entryDisplay(entry)
       this.#listDisplay.append(newEntry.entryCell)
       newEntry.render()
      }
      else {
        this.#listDisplay.append(entry.title);
      };
    });
  };

  constructor(parentNode, headerNode, buttonNode, listDisplayNode, list) {
    this.#parent = parentNode;
    this.#header = headerNode;
    this.#listDisplay = listDisplayNode;
    this.#list = list;
    this.#addButton = buttonNode;
    this.#addButton.addEventListener("click", this.createNewEntryPrompt)
    console.log(this.#addButton.id)
    this.render()
  };
};

const projectLists = new toDoList("Lists");
const toDoList1 = new toDoList("List 1");
const projectsDisplay = new listDisplay(
  document.querySelector("#projectList"), 
  document.querySelector("#projectHeader > h1"), 
  document.querySelector("#projectHeader > button"),
  document.querySelector("#projects"), 
  projectLists);
const toDoListDisplay = new listDisplay(
  document.querySelector("#toDo"), 
  document.querySelector("#toDoTitle"), 
  document.querySelector("#toDoButton"),
  document.querySelector("#toDoEntries"), 
  toDoList1);
const entry1 = new toDoEntry(
  0,
  "Debug Entry",
  "Lorem Ipsum Dolor Sit Amet blah blah blah here's more words I LOVE BEIJING TIANANMEN",
  "4/20/69",
  "3/14/15",
  0);

function addList(list) { projectLists.push(list) };
function delList(list) { projectLists.splice(list, 1) };

projectLists.addEntry(toDoList1);
projectLists.getEntry(0).addEntry(entry1);
projectsDisplay.render();
toDoListDisplay.render();