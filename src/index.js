import "./page.css";

class toDoEntry {  
  constructor(priority, title, description, added, due) {
    this.#priority = priority;
    this.#title = title;
    this.#description = description;
    this.#added = added;
    this.#due = due;
  };
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

};
class entryDisplay {
  constructor(entry, subPanel) {
    for(let i = 0; i < 6; i++){
      this.#elements.push(document.createElement("div"))
    };
    this.#cellPriority = this.#elements[0];
    this.#cellTitle = this.#elements[1];
    this.#cellDesc = this.#elements[2];
    this.#cellAdded = this.#elements[3];
    this.#cellDue = this.#elements[4];
    this.#cellStatus = this.#elements[5];
    this.#entryCell.classList.add("entry");
    this.#cellTitle.classList.add("entryTitle");
    if(entry) {
      this.#cellPriority.textContent = entry.priority;
      this.#cellTitle.textContent = entry.title;
      this.#cellDesc.textContent = entry.desc;
      this.#cellAdded.textContent = entry.added;
      this.#cellDue.textContent = entry.due;
      this.#cellStatus.textContent = entry.status;
      this.#cellRemoveButton.textContent = "-";
    };
    this.#entryCell.addEventListener("mouseover", () => { this.#subPanel.textContent = entry.desc })
    this.#entryCell.addEventListener("mouseout", () => { this.#subPanel.textContent = "" })
    this.#cellRemoveButton.addEventListener("click", () => { this.#subPanel.textContent = ""; this.#entryCell.remove() })
  };
  #elements = [];

  #cellPriority;
  #cellTitle;
  #cellDesc;
  #cellAdded;
  #cellDue;
  #cellStatus;

  #entryCell = document.createElement("div");
  #cellRemoveButton = document.createElement("button");
  #subPanel = document.createElement("div");

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
};
class toDoList {
  constructor(title) { this.#title = title };
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
};
class listDisplay {
  constructor(parentNode, tagHeader, list) {
    this.#parent = parentNode;
    this.#tagHeader = tagHeader;
    this.#header = document.createElement("h1");
    this.#header.id = this.#tagHeader + "Header";
    this.#addButton = document.createElement("button");
    this.#addButton.id = this.#tagHeader + "AddButton"
    this.#listDisplay = document.createElement("div");
    this.#list = list;
    this.#subPanel = document.createElement("div");
    this.#addButton.addEventListener("click", this.addEntry)
  };
  #parent;
  #tagHeader;
  #header;
  #listDisplay;
  #list = [];
  #subPanel;
  #addButton;

  get list() { return this.#list };
  get displayNode() { return this.#listDisplay };
  set displayNode(newListDisplay) { this.#listDisplay = newListDisplay };
  get headerId() { return this.#header.id };
  set headerId(newId) { this.#header.id = newId };
  get parent() { return this.#parent };
  set parent(newParent) { this.#parent = newParent };
  get header() { return this.#header };
  set header(newHeader) { this.#header = newHeader };
  
  addEntry = () => {
    const input = new entryDisplay();
    input.id = "newEntry";
    console.log(input);
    console.log(input.id);
    this.#header.textContent = "";
    this.#header.append(input.entryCell);
    this.#header.backgroundColor = "silver";
    this.#addButton.removeEventListener("click", this.addEntry);
    this.#addButton.addEventListener("click", this.submitEntry);
    this.#addButton.textContent = "Submit";
  };
  submitEntry = () => {
    const newEntry = new toDoEntry();
    const input = document.querySelector("#newEntry");
    console.log(input);
    newEntry.priority = input.cellPriority.textContent,
    newEntry.title = input.cellTitle.textContent,
    newEntry.desc = input.cellDesc.textContent,
    newEntry.added = input.cellAdded.textContent,
    newEntry.due = input.cellDue.textContent;
    this.#list.addEntry(newEntry);
    this.#addButton.removeEventListener("click", this.submitEntry);
    this.#addButton.addEventListener("click", this.addEntry);
    this.#addButton.textContent = "+";
    this.render();
};
  render() {
    // clear the display state
    this.#parent.textContent = "";
    // put the header and list up
    this.#parent.append(this.#header)
    this.#header.textContent = this.#list.title;
    this.#parent.append(this.#listDisplay)
    // build the new list
    this.#list.list.forEach((entry) => {
      if (entry instanceof toDoEntry) {
        //make new to-do entry, then append it
        const newEntry = new entryDisplay(entry)
        newEntry.id = this.#tagHeader + "Entry";
        this.#listDisplay.append(newEntry.entryCell)
        newEntry.render()
      }
      else {
        this.#listDisplay.append(entry.title);
      };
    });
  };


};
class submitForm {
  #elements = [];

  #cellPriority;
  #cellTitle;
  #cellDesc;
  #cellAdded;
  #cellDue;
  #cellStatus;

  #entryCell = document.createElement("div");
  #cellSubmitButton = document.createElement("button");

  get entryCell() {return this.#entryCell}
  get cellPriority() {return this.#cellPriority};
  get cellTitle() {return this.#cellTitle};
  get cellDesc() {return this.#cellDesc};
  get cellAdded() {return this.#cellAdded}
  get cellDue() {return this.#cellDue};
  get cellStatus() {return this.#cellStatus};
  get submitButton() {return this.#cellSubmitButton};

  render() {
    this.#entryCell.textContent = "";
    this.#elements.forEach((element) => {
      this.#entryCell.append(element);
    })
    this.#entryCell.append(this.#cellSubmitButton);
  }

  constructor(entry) {
    for(let i = 0; i < 6; i++){
      this.#elements.push(document.createElement("input"))
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
      this.#cellSubmitButton.textContent = "Submit";
    };
    this.#cellSubmitButton.addEventListener("click", this.#entryCell.remove() )
  };
};

const projectLists = new toDoList("Lists");
const toDoList1 = new toDoList("List 1");
const projectsDisplay = new listDisplay(document.querySelector("#projectList"), "project", projectLists);
const toDoListDisplay = new listDisplay(document.querySelector("#toDo"), "toDoList", toDoList1);
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