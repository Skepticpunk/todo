import { entryDisplay } from "./entry-display"
import { toDoEntry } from "./entry";
import { toDoList } from "./list";

class listDisplay {
  constructor(parentNode) {
    this.#parent = parentNode;
    this.#header = document.createElement("h1");
    this.#listDisplay = document.createElement("div");
    this.#addButton = document.createElement("button");
    this.#list = [];
    this.#childList = "";
    this.#newEntryDialog.container.id = "newEntryDialog"
  };
  #parent;
  #tagHeader;
  #header;
  #listDisplay;
  #list;
  #childList;
  #subPanel;
  #addButton;
  #newEntryDialog = {
    container: document.createElement("div"),
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
    this.#newEntryDialog.container.id = this.#tagHeader + "NewEntryDialog"
  };
  get header() { return this.#header };
  set header(newHeader) { this.#header = newHeader };
  get list() { return this.#list };
  set list(newList) { this.#list = newList; console.log("rendering list for " + this.#tagHeader); this.render() };
  get subPanel() { return this.#subPanel };
  set subPanel(newSubPanel) { this.#subPanel = newSubPanel };
  get childList() { return this.#childList };
  set childList(newchildList) { this.#childList = newchildList };
  
  
  renderNewEntryDialog = () => {
    // clear the header and dialog
    this.#header.textContent = "";
    this.#newEntryDialog.container.textContent = "";
    // append elements
    this.#header.append(this.#newEntryDialog.container);
    this.#newEntryDialog.container.append(this.#newEntryDialog.priority);
    this.#newEntryDialog.container.append(this.#newEntryDialog.title);
    this.#newEntryDialog.container.append(this.#newEntryDialog.desc);
    this.#newEntryDialog.container.append(this.#newEntryDialog.added);
    this.#newEntryDialog.container.append(this.#newEntryDialog.due);
    this.#newEntryDialog.container.append(this.#newEntryDialog.status);
    this.#header.append(this.#addButton);
    // change button to "submit" and add append function
    this.#addButton.textContent = "submit";
    this.#addButton.removeEventListener("click", this.renderNewEntryDialog);
    this.#addButton.addEventListener("click", this.addEntry);
  }
  renderNewListDialog = () => {
    // same shit as above but instead of appending all the fields we just append the one for the title
    this.#header.textContent = "";
    this.#newEntryDialog.textContent = "";
    this.#header.append(this.#newEntryDialog.container);
    this.#newEntryDialog.container.append(this.#newEntryDialog.title);
    this.#header.append(this.#addButton);
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
  addList = () => {
    // same as above but for lists
    const newList = new toDoList();
    newList.title = this.#newEntryDialog.title.value;
    this.list.addEntry(newList);
    this.#addButton.textContent = "add";
    this.#addButton.removeEventListener("click", this.addList);
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
    if (this.#list.listType == 0) {
      this.#list.list.forEach((entry, index) => {
        this.#addButton.addEventListener("click", this.renderNewListDialog);
        // make new list entry, put the entry title in the entry, add a click event listener, then append it
        const newEntry = document.createElement("div")
        newEntry.id = this.#tagHeader + "Entry";
        this.#listDisplay.append(newEntry)
        newEntry.textContent = entry.title
        
        newEntry.addEventListener("click", () => {
          // get list from the entry, then switch the subpanel's current list with it
          this.#childList.list = entry;
        });
        const removeButton = document.createElement("button")
        removeButton.textContent = "-"
        removeButton.addEventListener("click", () => {
          newEntry.remove;
          this.#list.delEntry(index)
          this.render();
          })
        this.#listDisplay.append(newEntry)
        this.#listDisplay.append(removeButton);
      });
    } else {
      this.#list.list.forEach((entry, index) => {
        this.#addButton.addEventListener("click", this.renderNewEntryDialog);
        //make new to-do entry, then append it
        console.log("rendering entry");
        const newEntry = new entryDisplay(entry, this.#subPanel, entry.desc, 1, this.#list, index);
        this.#listDisplay.append(newEntry.entryCell);
        newEntry.render();
      });
    };
  };
};

export { listDisplay };