import { entryDisplay } from "./entry-display"
import { toDoEntry } from "./entry";

class listDisplay {
  constructor(parentNode) {
    this.#parent = parentNode;
    this.#header = document.createElement("h1");
    this.#listDisplay = document.createElement("div");
    this.#addButton = document.createElement("button");
    this.#addButton.addEventListener("click", this.renderNewEntryDialog);
    this.#list = [];
  };
  #parent;
  #tagHeader;
  #header;
  #listDisplay;
  #list;
  #subPanel;
  #addButton;
  #newEntryDialog = {
    priority: document.createElement("input"),
    title: document.createElement("input"),
    desc: document.createElement("input"),
    added: document.createElement("input"),
    due: document.createElement("input"),
    status: document.createElement("input")
  };

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
  
  renderNewEntryDialog = () => {
    // clear the header
    this.#header.textContent = "";
    // append elements
    this.#header.append(this.#newEntryDialog.priority);
    this.#header.append(this.#newEntryDialog.title);
    this.#header.append(this.#newEntryDialog.desc);
    this.#header.append(this.#newEntryDialog.added);
    this.#header.append(this.#newEntryDialog.due);
    this.#header.append(this.#newEntryDialog.status);
    this.#header.append(this.#addButton);
    // change button to "add" and add append function
    // todo: change fake "addEntry" function to something real
    this.#addButton.textContent = "submit";
    this.#addButton.removeEventListener("click", this.renderNewEntryDialog);
    this.#addButton.addEventListener("click", this.addEntry);
  }
  addEntry = () => {
    // make a new entry
    const newEntry = new toDoEntry();
    // add all the data from the dialog
    newEntry.priority = this.#newEntryDialog.priority.value;
    newEntry.title = this.#newEntryDialog.title.value; 
    newEntry.desc = this.#newEntryDialog.desc.value;
    newEntry.added = this.#newEntryDialog.added.value;
    newEntry.due = this.#newEntryDialog.due.value;
    newEntry.status  = this.#newEntryDialog.status.value;
    // add new entry to list
    this.#list.addEntry(newEntry);
    this.#addButton.textContent = "add";
    this.#addButton.removeEventListener("click", this.addEntry);
    this.#addButton.addEventListener("click", this.renderNewEntryDialog);
    this.render();
  }                                                                
  render() {                                                       
    // clear the display state                                     
    this.#parent.textContent = "";
    this.#listDisplay.textContent = "";
    // put the header and list up
    this.#parent.append(this.#header);
    this.#header.textContent = this.#list.title;
    this.#header.append(this.#addButton);
    this.#addButton.textContent = "add";
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