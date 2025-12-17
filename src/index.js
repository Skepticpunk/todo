import "./page.css";

class toDoEntry {
  #priority = 0;
  #title = "Title";
  #description = "Description";
  #dateAdded = "1/1/1900";
  #dueDate = "12/31/2099";
  #status = 0;

  constructor(priority, title, description, dateAdded, dueDate) {
    this.#priority = priority;
    this.#title = title;
    this.#description = description;
    this.#dateAdded = dateAdded;
    this.#dueDate = dueDate;
  };
  
  getTitle() { return this.#title };
  setTitle(newTitle) { this.#title = newTitle };
  getDesc() { return this.#description };
  setDesc(newDesc) { this.#description = newDesc };
  getAdded() { return this.#dateAdded; }
  setAdded(newAdded) { this.#dateAdded = newAdded }
  getDue() { return this.#dueDate };
  setDue(newDue) { this.#dueDate = newDue };
  getPriority() { return this.#priority };
  setPriority(newPriority) { this.#priority = newPriority };
  getStatus() { return this.#status };
  setStatus(newStatus) { this.#status = newStatus };
};
class toDoList {
  constructor(title) { this.#title = title };
  #list = [];
  #title = "Unspecified Title";
  getList() { return this.#list };
  addEntry(newEntry) { this.#list.push(newEntry) };
  delEntry(entry) { this.#list.splice(entry, 1) };
  getEntry(entry) { return this.#list[entry] };
  moveEntry(entry, position) {
    targetEntry = this.#list[entry];
    this.#list.splice(entry, 1);
    this.#list.splice(position - 1, 0, targetEntry);
  };
  getTitle() { return this.#title }
  setTitle(newTitle) { this.#title = newTitle; }
};
class listDisplay {
  #parent = undefined;
  #header = undefined;
  #listDisplay = undefined;
  #list = [];
  #addButton = document.querySelector(this.#parent + " > button ")

  constructor(parentNode, headerNode, listDisplayNode, list) {
    this.#parent = parentNode;
    this.#header = headerNode;
    this.#listDisplay = listDisplayNode;
    this.#list = list;
  };

  getList() { return this.#list };
  getDisplayNode() { return this.#listDisplay }
  setDisplayNode(newListDisplay) { this.#listDisplay = newListDisplay };
  getParent() { return this.#parent };
  setParent(newParent) { this.#parent = newParent };
  getHeader() { return this.#header };
  setHeader(newHeader) { this.#header = newHeader };

  renderList() {
    this.#listDisplay.textContent = "";
    this.#header.textContent = this.#list.getTitle();
    this.#list.getList().forEach((entry) => {
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
        cellTitle.id = "cellTitle";
        cellTitle.textContent = entry.getTitle();
        cellPriority.textContent = entry.getPriority();
        cellDesc.textContent = entry.getDesc();
        cellAdded.textContent = entry.getAdded();
        cellDue.textContent = entry.getDue();
        cellStatus.textContent = entry.getStatus();
        entryCell.append(cellPriority);
        entryCell.append(cellTitle);
        entryCell.append(cellDesc);
        entryCell.append(cellAdded);
        entryCell.append(cellDue);
        entryCell.append(cellStatus);
        entryCell.append(cellRemoveButton);
        cellRemoveButton.textContent = "-";
        entryCell.addEventListener("mouseover", () => { expDesc.textContent = entry.getDesc() })
        entryCell.addEventListener("mouseout", () => { expDesc.textContent = "" })
        cellRemoveButton.addEventListener("click", () => { expDesc.textContent = ""; entryCell.remove() })
        this.#listDisplay.append(entryCell);
      }
      else {
        this.#listDisplay.append(entry.getTitle());
      };
    });
  };
  addEntry() {
    this.#header.textContent = "";
    const entryCell = document.createElement("input");
    const cellPriority = document.createElement("input");
    const cellTitle = document.createElement("input");
    const cellDesc = document.createElement("input");
    const cellAdded = document.createElement("input");
    const cellDue = document.createElement("input");
    const cellStatus = document.createElement("input");
    entryCell.id = "entry";
    cellTitle.id = "cellTitle";
    entryCell.append(cellPriority);
    entryCell.append(cellTitle);
    entryCell.append(cellDesc);
    entryCell.append(cellAdded);
    entryCell.append(cellDue);
    entryCell.append(cellStatus);
    this.#header.append(entryCell)
    this.#addButton.removeEventListener("click")
    this.#addButton.addEventListener("click", () => {
      newEntry = new toDoEntry(cellPriority.textContent, cellTitle.textContent, cellDesc.textContent, cellAdded.textContent, cellDue.textContent);
      this.#list.push(newEntry)
    } );
  }
};
class entryDisplay {
  #elementType = "div";
  #entry = undefined;
  #entryCell = document.createElement(this.#elementType);
  #cellPriority = document.createElement(this.elementType);
  #cellTitle = document.createElement(this.elementType);
  #cellDesc = document.createElement(this.elementType);
  #cellAdded = document.createElement(this.elementType);
  #cellDue = document.createElement(this.elementType);
  #cellStatus = document.createElement(this.elementType);
  #cellRemoveButton = document.createElement("button");
  #entryDisplayNode = undefined;
  #expDesc = document.querySelector("#toDoDesc");

  constructor( parentNode, entryDisplayNode, entry, elementType ) {
    this.#elementType = elementType;
    this.#entry = entry;
    this.#entryDisplayNode = entryDisplayNode;
    this.#entryCell.id = "entry";
    this.#cellTitle.id = "cellTitle";
    this.#cellTitle.textContent = this.#entry.getTitle();
    this.#cellPriority.textContent = this.#entry.getPriority();
    this.#cellDesc.textContent = this.#entry.getDesc();
    this.#cellAdded.textContent = this.#entry.getAdded();
    this.#cellDue.textContent = this.#entry.getDue();
    this.#cellStatus.textContent = this.#entry.getStatus();
  };
  renderEntry() {
    this.#entryCell.append(this.#cellPriority);
    this.#entryCell.append(this.#cellTitle);
    this.#entryCell.append(this.#cellDesc);
    this.#entryCell.append(this.#cellAdded);
    this.#entryCell.append(this.#cellDue);
    this.#entryCell.append(this.#cellStatus);
    this.#entryCell.append(this.#cellRemoveButton);
    this.#cellRemoveButton.textContent = "-";
    this.#entryCell.addEventListener("mouseover", () => { expDesc.textContent = entry.getDesc() });
    this.#entryCell.addEventListener("mouseout", () => { expDesc.textContent = "" });
    this.#cellRemoveButton.addEventListener("click", () => { expDesc.textContent = ""; entryCell.remove() });
    this.#entryDisplayNode.append(entryCell);
  }
}

const projectLists = new toDoList("Lists");
const toDoList1 = new toDoList("List 1");
const projectsDisplay = new listDisplay(document.querySelector("#projectList"), document.querySelector("#projectHeader > h1"), document.querySelector("#projects"), projectLists);
const toDoListDisplay = new listDisplay(document.querySelector("#toDo"), document.querySelector("#toDoTitle"), document.querySelector("#toDoEntries"), toDoList1);
const entry1 = new toDoEntry(0, "Debug Entry", "Lorem Ipsum Dolor Sit Amet blah blah blah here's more words I LOVE BEIJING TIANANMEN", "4/20/69", "3/14/15", 0);

function addList(list) { projectLists.push(list) };
function delList(list) { projectLists.splice(list, 1) };

projectLists.addEntry(toDoList1);
projectLists.getEntry(0).addEntry(entry1);
projectsDisplay.renderList();
toDoListDisplay.renderList();