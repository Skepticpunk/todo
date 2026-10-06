import { entryDisplay } from "./entry-display"
import { toDoEntry } from "./entry";
import { toDoList } from "./list";

class listDisplay {
  constructor(parentNode) {
    // create elements for object
    this.#parent = parentNode;
    this.#header = document.createElement("h1");
    this.#listDisplay = document.createElement("div");
    this.#addButton = document.createElement("button");
    this.#editButton = document.createElement("button");
    this.#saveButton = document.createElement("button");
    this.#cancelButton = document.createElement("button");
    this.#newEntryDialog = {
      container: document.createElement("div"),
      priority: document.createElement("input"),
      title: document.createElement("input"),
      desc: document.createElement("input"),
      added: document.createElement("input"),
      due: document.createElement("input"),
      status: document.createElement("input")
    };
    this.#editTitleDialog = {
      container: document.createElement("div"),
      title: document.createElement("input"),
    };
    // edit attributes
    this.#addButton.textContent = "+";
    this.#editButton.textContent = "edit";
    this.#saveButton.textContent = "O";
    this.#cancelButton.textContent = "X";
    // set other variables
    this.#list = [];
    this.#childList = "";
    this.#newEntryDialog.container.id = "newEntryDialog"
    this.#editTitleDialog.container.id = "editTitleDialog"
  };
  // dummy entries for elements to be filled by constructor
  #parent;
  #tagHeader;
  #header;
  #listDisplay;
  #list;
  #childList;
  #subPanel;
  #addButton;
  #editButton;
  #saveButton;
  #cancelButton;
  #newEntryDialog;
  #editTitleDialog;
  // getters/setters
  get parent() { return this.#parent };
  set parent(newParent) { this.#parent = newParent };
  get tagHeader() { return this.#tagHeader };
  set tagHeader(newTagHeader) {
    this.#tagHeader = newTagHeader
    this.#header.id = this.#tagHeader + "Header";
    this.#addButton.id = this.#tagHeader + "AddButton";
    this.#listDisplay.id = this.#tagHeader + "ListDisplay";
    this.#newEntryDialog.container.id = this.#tagHeader + "NewEntryDialog";
    this.#editTitleDialog.container.id = this.#tagHeader + "EditTitleDialog"
  };
  get header() { return this.#header };
  set header(newHeader) { this.#header = newHeader };
  get list() { return this.#list };
  set list(newList) {
    this.#list = newList;
    this.render()
  };
  get subPanel() { return this.#subPanel };
  set subPanel(newSubPanel) { this.#subPanel = newSubPanel };
  get childList() { return this.#childList };
  set childList(newchildList) { this.#childList = newchildList };
  get editButton() { return this.#editButton };
  // functions
  renderNewListDialog = () => {
    // clear header and dialog
    this.#header.textContent = "";
    this.#newEntryDialog.textContent = "";
    // append field
    this.#header.append(this.#newEntryDialog.container);
    this.#newEntryDialog.container.append(this.#newEntryDialog.title);
    // set field default values
    this.#newEntryDialog.title.value = "";
    this.#newEntryDialog.title.placeholder = "title";
    // append buttons
    this.#header.append(this.#cancelButton);
    this.#header.append(this.#addButton);
    // change style to fit two buttons
    this.#header.style.gridTemplateColumns = "4fr repeat(2, minmax(1em, 48px))";
    // add listeners
    this.#addButton.removeEventListener("click", this.renderNewListDialog);
    this.#addButton.addEventListener("click", this.addList);
    this.#cancelButton.addEventListener("click", this.cancelList);
  }
  renderNewEntryDialog = () => {
    // same as above, but with six fields this time
    this.#header.textContent = "";
    this.#newEntryDialog.container.textContent = "";
    this.#header.append(this.#newEntryDialog.container);
    this.#newEntryDialog.container.append(this.#newEntryDialog.priority);
    this.#newEntryDialog.container.append(this.#newEntryDialog.title);
    this.#newEntryDialog.container.append(this.#newEntryDialog.desc);
    this.#newEntryDialog.container.append(this.#newEntryDialog.added);
    this.#newEntryDialog.container.append(this.#newEntryDialog.due);
    this.#newEntryDialog.container.append(this.#newEntryDialog.status);
    this.#newEntryDialog.priority.value = "";
    this.#newEntryDialog.title.value = "";
    this.#newEntryDialog.desc.value = "";
    this.#newEntryDialog.added.value = "";
    this.#newEntryDialog.due.value = "";
    this.#newEntryDialog.status.value = "";
    this.#newEntryDialog.priority.placeholder = "task priority";
    this.#newEntryDialog.title.placeholder = "title";
    this.#newEntryDialog.desc.placeholder = "description";
    this.#newEntryDialog.added.placeholder = "date added";
    this.#newEntryDialog.due.placeholder = "date due";
    this.#newEntryDialog.status.placeholder = "status";
    this.#header.append(this.#cancelButton);
    this.#header.append(this.#addButton);
    this.#addButton.removeEventListener("click", this.renderNewEntryDialog);
    this.#addButton.addEventListener("click", this.addEntry);
    this.#cancelButton.addEventListener("click", this.cancelEntry);
  }
  addList = () => {
    // make new list, set its title
    const newList = new toDoList();
    newList.title = this.#newEntryDialog.title.value;
    // add it to the list
    this.list.addEntry(newList);
    // add listeners
    this.#addButton.removeEventListener("click", this.addList);
    this.#addButton.addEventListener("click", this.renderNewListDialog);
    this.#cancelButton.removeEventListener("click", this.cancelList);
    this.render();
  }
  addEntry = () => {
    // same as above, but with six attributes
    const newEntry = new toDoEntry(
      this.#newEntryDialog.priority.value,
      this.#newEntryDialog.title.value,
      this.#newEntryDialog.desc.value,
      this.#newEntryDialog.added.value,
      this.#newEntryDialog.due.value,
      this.#newEntryDialog.status.value
    );
    this.#list.addEntry(newEntry);
    this.#addButton.removeEventListener("click", this.addEntry);
    this.#addButton.addEventListener("click", this.renderNewEntryDialog);
    this.#cancelButton.removeEventListener("click", this.cancelEntry);
    this.render();
  }
  renderEditTitleDialog = (entry, parent) => {
    // similar to above, but with inputs instead of divs
    this.#header.textContent = "";
    this.#editTitleDialog.textContent = "";
    this.#header.append(this.#editTitleDialog.container);
    this.#editTitleDialog.container.append(this.#editTitleDialog.title);
    this.#editTitleDialog.title.value = entry.title;
    this.#editTitleDialog.title.placeholder = "new title";
    this.#header.append(this.#cancelButton);
    this.#header.append(this.#saveButton);
    this.#saveButton.addEventListener("click", () => {this.updateListTitle(entry, parent)});
    this.#cancelButton.addEventListener("click", this.cancelListTitleUpdate);
  }
  updateListTitle = (entry, parent) => {
    // set new title, then update storage
    entry.title = this.#editTitleDialog.title.value;
    parent.#list.updateStorage();
    this.cancelListTitleUpdate();
    parent.render();
  }
  cancelList = () => {
    // set style back to 1-button
    this.#header.style.gridTemplateColumns = "4fr minmax(1em, 48px)";
    // reset listeners, then render
    this.#addButton.removeEventListener("click", this.addList);
    this.#addButton.addEventListener("click", this.renderNewListDialog);
    this.#cancelButton.removeEventListener("click", this.cancelList);
    this.render();
  }
  cancelEntry = () => {
    // guess what this does
    this.#addButton.removeEventListener("click", this.addEntry);
    this.#addButton.addEventListener("click", this.renderNewEntryDialog);
    this.#cancelButton.removeEventListener("click", this.cancelEntry);
    this.render();
  }
  cancelListTitleUpdate = () => {
    // wheeeee
    this.#addButton.removeEventListener("click", () => {this.updateListTitle()});
    this.#addButton.addEventListener("click", this.renderNewEntryDialog);
    this.#cancelButton.removeEventListener("click", this.cancelListTitleUpdate);
    this.render();
  }
  render() {
    // clear the display state
    this.#parent.textContent = "";
    this.#listDisplay.textContent = "";
    // put the header and list up
    this.#header.textContent = this.#list.title;
    this.#parent.append(this.#header);
    this.#parent.append(this.#listDisplay);
    // build the new list
    if (this.#list.isProjectList == 1) {
      this.#header.append(this.#addButton);
      this.#addButton.addEventListener("click", this.renderNewListDialog);
      this.#list.list.forEach((entry, index) => {
        // make new list entry, put the entry title in the entry, add a click event listener, then append it
        const entryContainer = document.createElement("div");
        const newEntry = document.createElement("div");
        entryContainer.classList.add("entry");
        if((index + 1) % 2 == 0) { entryContainer.classList.add("altList") }
        newEntry.classList.add(this.#tagHeader + "Entry");
        newEntry.textContent = entry.title;
        newEntry.addEventListener("click", () => {
          // swap subpanel's current list with one from entry
          this.#childList.list = entry;
          this.#childList.editButton.addEventListener("click", () => {
            this.#childList.renderEditTitleDialog(entry, this);
          });
        });
        const removeButton = document.createElement("button")
        removeButton.textContent = "-"
        removeButton.addEventListener("click", () => {
          newEntry.remove;
          this.#list.delEntry(index);
          this.render();
        })
        entryContainer.append(newEntry);
        entryContainer.append(removeButton);
        this.#listDisplay.append(entryContainer);
      });
    } else { // this is a to-do list
      this.header.style.gridTemplateColumns = "4fr repeat(2, minmax(0, 48px))";
      this.#addButton.addEventListener("click", this.renderNewEntryDialog);
      this.#header.append(this.#editButton);
      this.#header.append(this.#addButton);
      this.#list.list.forEach((entry, index) => {
        // make new to-do entry, then append it
        const newEntry = new entryDisplay(entry, this.#subPanel, entry.desc, 1, this.#list, index);
        if ((index + 1) % 2 == 0) {
          newEntry.entryCell.classList.add("altEntry")
        }
        this.#listDisplay.append(newEntry.entryCell);
        newEntry.render();
      });
    };
  };
};

export { listDisplay };
