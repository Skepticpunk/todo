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
  #expDesc = document.querySelector("toDoDesc");

  get cellPriority() {return this.#cellPriority};
  get cellTitle() {return this.#cellTitle};
  get cellDesc() {return this.#cellDesc};
  get cellAdded() {return this.#cellAdded}
  get cellDue() {return this.#cellDue};
  get cellStatus() {return this.#cellStatus};
  get removeButton() {return this.#cellRemoveButton};

  constructor(entry) {
    for(i = 0; i < 6; i++){
      this.#elements.push(document.createElement("div"))
      this.#entryCell.append(elements[i])
    };
    this.#cellPriority = this.#elements[0];
    this.#cellTitle = this.#elements[1];
    this.#cellDesc = this.#elements[2];
    this.#cellAdded = this.#elements[3];
    this.#cellDue = this.#elements[4];
    this.#cellStatus = this.#elements[5];
    this.#cellPriority.textContent = entry.priority;
    this.#cellTitle.textContent = entry.title;
    this.#cellDesc.textContent = entry.desc;
    this.#cellAdded.textContent = entry.added;
    this.#cellDue.textContent = entry.due;
    this.#cellStatus.textContent = entry.status;
    cellRemoveButton.textContent = "-";
    entryCell.addEventListener("mouseover", () => { this.#expDesc.textContent = entry.desc })
    entryCell.addEventListener("mouseout", () => { this.#expDesc.textContent = "" })
    cellRemoveButton.addEventListener("click", () => { this.#expDesc.textContent = ""; entryCell.remove() })
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
  get title() { return this.#title }
  set title(newTitle) { this.#title = newTitle; }

  constructor(title) { this.#title = title };
};
class listDisplay {
  #parent = undefined;
  #header = undefined;
  #listDisplay = undefined;
  #list = [];
  #addButton = undefined;

  get list() { return this.#list };
  get displayNode() { return this.#listDisplay }
  set displayNode(newListDisplay) { this.#listDisplay = newListDisplay };
  get parent() { return this.#parent };
  set parent(newParent) { this.#parent = newParent };
  get header() { return this.#header };
  set header(newHeader) { this.#header = newHeader };
  
  addEntry() {
    entry = new entryDisplay(
      "input",
      "entryCell",
      "cellPriority",
      "cellTitle",
      "cellDesc",
      "cellAdded",
      "cellDue");
    entry.entryCell.id = "entry";
    entry.cellTitle.id = "entryTitle";
    this.#header.textContent = "";
    this.#header.append(entryCell)
    this.#addButton.removeEventListener("click")
    this.#addButton.addEventListener("click", () => {
      newEntry = new toDoEntry(
        entry.cellPriority.textContent,
        entry.cellTitle.textContent,
        entry.cellDesc.textContent,
        entry.cellAdded.textContent,
        entry.cellDue.textContent);
      this.#list.push(newEntry)
    });
  };
  renderList() {
    this.#listDisplay.textContent = "";
    this.#header.textContent = this.#list.Title;
    this.#list.list.forEach((entry) => {
      if (entry instanceof toDoEntry) {
        const entryCell = document.createElement("div");
        const cellPriority = document.createElement("div");
        const cellTitle = document.createElement("div");
        const cellDesc = document.createElement("div");
        const cellAdded = document.createElement("div");
        const cellDue = document.createElement("div");
        const cellStatus = document.createElement("div");
        const cellRemoveButton = document.createElement("button");
        const expDesc = document.querySelector("#toDoDesc");
        entryCell.id = "entry";
        cellTitle.id = "entryTitle";
        cellTitle.textContent = entry.title;
        cellPriority.textContent = entry.priority;
        cellDesc.textContent = entry.desc;
        cellAdded.textContent = entry.added;
        cellDue.textContent = entry.due;
        cellStatus.textContent = entry.status;
        entryCell.append(cellPriority);
        entryCell.append(cellTitle);
        entryCell.append(cellDesc);
        entryCell.append(cellAdded);
        entryCell.append(cellDue);
        entryCell.append(cellStatus);
        entryCell.append(cellRemoveButton);
        cellRemoveButton.textContent = "-";
        entryCell.addEventListener("mouseover", () => { expDesc.textContent = entry.desc })
        entryCell.addEventListener("mouseout", () => { expDesc.textContent = "" })
        cellRemoveButton.addEventListener("click", () => { expDesc.textContent = ""; entryCell.remove() })
        this.#listDisplay.append(entryCell);
      }
      else {
        this.#listDisplay.append(entry.title);
      };
    });
  };

  constructor(parentNode, headerNode, listDisplayNode, list) {
    this.#parent = parentNode;
    this.#header = headerNode;
    this.#listDisplay = listDisplayNode;
    this.#list = list;
    console.log(this.#parent.id)
    this.#addButton = document.querySelector("#projectHeader > button ");
    console.log(this.#addButton)
    this.#addButton.addEventListener("click", () => {false})
  };
};

const projectLists = new toDoList("Lists");
const toDoList1 = new toDoList("List 1");
const projectsDisplay = new listDisplay(
  document.querySelector("#projectList"), 
  document.querySelector("#projectHeader > h1"), 
  document.querySelector("#projects"), 
  projectLists);
const toDoListDisplay = new listDisplay(
  document.querySelector("#toDo"), 
  document.querySelector("#toDoTitle"), 
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
projectsDisplay.renderList();
toDoListDisplay.renderList();