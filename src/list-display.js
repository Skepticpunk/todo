import { entryDisplay } from "./entry-display";

class listDisplay {
  constructor(parentNode, tagHeader, subPanel, list) {
    this.#parent = parentNode;
    this.#header = document.createElement("h1");
    this.#listDisplay = document.createElement("div");
    this.#addButton = document.createElement("button");
    this.#subPanel = subPanel;
    this.#tagHeader = tagHeader;
    this.#list = list;
    this.#header.id = this.#tagHeader + "Header";
    this.#addButton.id = this.#tagHeader + "AddButton";
    this.#listDisplay.id = this.#tagHeader + "ListDisplay";
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
  changeList = (list) => {
    this.#list = list;
    this.render()
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
        //make new to-do entry, then append itB
        const newEntry = new entryDisplay(entry, this.#subPanel)
        newEntry.id = this.#tagHeader + "Entry";
        this.#listDisplay.append(newEntry.entryCell)
        newEntry.render()
      }
      else {
        //make new list entry, put the entry title in the entry, then append it
        const newEntry = document.createElement("div");
        newEntry.textContent = entry.title
        this.#listDisplay.append(newEntry);
      };
    });
  };
};

export { listDisplay };