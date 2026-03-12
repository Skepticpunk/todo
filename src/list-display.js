import { entryDisplay } from "./entry-display"
import { toDoEntry } from "./entry";

class listDisplay {
  constructor(parentNode) {
    this.#parent = parentNode;
    this.#header = document.createElement("h1");
    this.#listDisplay = document.createElement("div");
    this.#addButton = document.createElement("button");
    this.#list = [];
  };
  #parent;
  #tagHeader;
  #header;
  #listDisplay;
  #list;
  #subPanel;
  #addButton;

  get parent() { return this.#parent };
  set parent(newParent) { this.#parent = newParent };
  get tagHeader() { return this.#tagHeader };
  set tagHeader(newTagHeader) { 
    this.#tagHeader = newTagHeader
    this.#header.id = this.#tagHeader + "Header";
    this.#addButton.id = this.#tagHeader + "AddButton";
    this.#listDisplay.id = this.#tagHeader + "ListDisplay";
  };
  get header() { return this.#header };
  set header(newHeader) { this.#header = newHeader };
  get list() { return this.#list };
  set list(list) { this.#list = list; console.log("rendering list for " + this.#tagHeader); this.render() };
  get subPanel() { return this.#subPanel };
  set subPanel(newSubPanel) { this.#subPanel = newSubPanel };
  
  newEntryDialog() {
    // clear the header
    this.#header.textContent = "";
    // create elements for dialog
    let newPriority = document.createElement("input")
    let newTitle = document.createElement("input")
    let newDesc = document.createElement("input")
    let newAdded = document.createElement("input")
    let newDue = document.createElement("input")
    let newStatus = document.createElement("input")
    // append elements
    this.#header.append(newPriority)
    this.#header.append(newTitle)
    this.#header.append(newDesc)
    this.#header.append(newAdded)
    this.#header.append(newDue)
    this.#header.append(newStatus)
    this.#header.append(this.#addButton)
    // change button to "add" and add append function
    // todo: change fake "addEntry" function to something real
    this.#addButton.textContent = "add"
    this.#addButton.addEventListener("click", addEntry(entry))
  }
  render() {
    // clear the display state
    this.#parent.textContent = "";
    // put the header and list up
    this.#parent.append(this.#header);
    this.#header.textContent = this.#list.title;
    this.#header.append(this.#addButton);
    this.#parent.append(this.#listDisplay);
    // build the new list
    this.#list.list.forEach((entry) => {
      if (entry instanceof toDoEntry) {
        //make new to-do entry, then append it
        const newEntry = new entryDisplay(entry, this.#subPanel)
        newEntry.id = this.#tagHeader + "Entry";
        this.#listDisplay.append(newEntry.entryCell)
        newEntry.render()
      }
      else {
        // make new list entry, put the entry title in the entry, then append it
        const newEntry = document.createElement("div");
        newEntry.textContent = entry.title
        this.#listDisplay.append(newEntry);
      };
    });
  };
};

export { listDisplay };