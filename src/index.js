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
class entryDisplay {
  constructor(elementType, ...newElements) {
    elements = []
    for (let i = 0; i <= (arguments.length() - 1); i++){
      elements.push(document.createElement(elementType));
      if (i != 0) {elements[0].append(elements[i])};
      eval("this.#" + arguments[i] + " = elements[i]");
    };
  };
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
  
  addEntry() {
    this.#header.textContent = "";
    elements = new entryDisplay("input", "entryCell", "cellPriority", "cellTitle", "cellDesc", "cellAdded", "cellDue");
    elements.entryCell.id = "entry";
    elements.cellTitle.id = "entryTitle";
    this.#header.append(entryCell)
    this.#addButton.removeEventListener("click")
    this.#addButton.addEventListener("click", () => {
      newEntry = new toDoEntry(cellPriority.textContent, cellTitle.textContent, cellDesc.textContent, cellAdded.textContent, cellDue.textContent);
      this.#list.push(newEntry)
    });
  };
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
        cellTitle.id = "entryTitle";
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
};


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