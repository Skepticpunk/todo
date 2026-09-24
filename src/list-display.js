import { entryDisplay } from "./entry-display"
import { toDoEntry } from "./entry";
import { toDoList } from "./list";

class listDisplay {
  constructor(parentNode) {
    this.#parent = parentNode;
    this.#header = document.createElement("h1");
    this.#listDisplay = document.createElement("div");
    this.#addButton = document.createElement("button");
    this.#cancelButton = document.createElement(("button"));
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
  #cancelButton;
  #newEntryDialog = {
    container: document.createElement("div"),
    priority: document.createElement("input"),
    title: document.createElement("input"),
    desc: document.createElement("input"),
    added: document.createElement("input"),
    due: document.createElement("input"),
    status: document.createElement("input")
  };
  #editEntryDialog = {
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
  set list(newList) {
    this.#list = newList;
    this.render()
  };
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
    this.header.style.gridTemplateColumns = "10fr repeat(2, 78px)";
    // change button to "submit" and add append function
    this.#addButton.textContent = "submit";
    this.#addButton.removeEventListener("click", this.renderNewEntryDialog);
    this.#addButton.addEventListener("click", this.addEntry);
    this.#cancelButton.textContent = "cancel";
    this.#cancelButton.addEventListener("click", this.cancelEntry);
  }
  addEntry = () => {
    // make a new entry
    const newEntry = new toDoEntry(
      this.#newEntryDialog.priority.value,
      this.#newEntryDialog.title.value,
      this.#newEntryDialog.desc.value,
      this.#newEntryDialog.added.value,
      this.#newEntryDialog.due.value,
      this.#newEntryDialog.status.value
    );
    // add new entry to list
    this.#list.addEntry(newEntry);
    this.#addButton.textContent = "add";
    this.#addButton.removeEventListener("click", this.addEntry);
    this.#addButton.addEventListener("click", this.renderNewEntryDialog);
    this.#cancelButton.textContent = "edit";
    this.#cancelButton.removeEventListener("click", this.cancelEntry);
    this.render();
  }
  cancelEntry = () => {
    this.#addButton.textContent = "add";
    this.#addButton.removeEventListener("click", this.addEntry);
    this.#addButton.addEventListener("click", this.renderNewEntryDialog);
    this.#cancelButton.textContent = "";
    this.#cancelButton.removeEventListener("click", this.cancelEntry);
    this.render();
  }
  renderNewListDialog = () => {
    // same shit as above but instead of appending all the fields we just append the one for the title
    this.#header.textContent = "";
    this.#newEntryDialog.textContent = "";
    this.#header.append(this.#newEntryDialog.container);
    this.#newEntryDialog.container.append(this.#newEntryDialog.title);
    this.#newEntryDialog.title.value = "";
    this.#newEntryDialog.title.placeholder = "title";
    this.#header.append(this.#cancelButton);
    this.#header.append(this.#addButton);
    this.#header.style.gridTemplateColumns = "4fr repeat(2, minmax(1em, 48px))";
    this.#addButton.textContent = "submit";
    this.#addButton.removeEventListener("click", this.renderNewListDialog);
    this.#addButton.addEventListener("click", this.addList);
    this.#cancelButton.textContent = "cancel";
    this.#cancelButton.addEventListener("click", this.cancelList);
  }
  addList = () => {
    // same as above but for lists
    const newList = new toDoList();
    newList.title = this.#newEntryDialog.title.value;
    this.list.addEntry(newList);
    this.#addButton.textContent = "add";
    this.#addButton.removeEventListener("click", this.addList);
    this.#addButton.addEventListener("click", this.renderNewListDialog);
    this.#cancelButton.textContent = "";
    this.#cancelButton.removeEventListener("click", this.cancelList);
    this.render();
  }
  cancelList = () => {
    this.#addButton.textContent = "add";
    this.#addButton.removeEventListener("click", this.addList);
    this.#addButton.addEventListener("click", this.renderNewListDialog);
    this.#cancelButton.textContent = "";
    this.#cancelButton.removeEventListener("click", this.cancelList);
    this.render();
  }
  render() {
    // clear the display state
    this.#parent.textContent = "";
    this.#listDisplay.textContent = "";
    // put the header and list up
    this.#header.textContent = this.#list.title;
    this.#addButton.textContent = "add";
    this.#parent.append(this.#header);
    this.#header.append(this.#addButton);
    this.#parent.append(this.#listDisplay);
    // build the new list
    if (this.#list.isProjectList == 1) {
      this.header.style.gridTemplateColumns = "4fr minmax(0, 48px)";
      this.#addButton.addEventListener("click", this.renderNewListDialog);
      this.#list.list.forEach((entry, index) => {
        // make new list entry, put the entry title in the entry, add a click event listener, then append it
        const entryContainer = document.createElement("div");
        const newEntry = document.createElement("div");
        entryContainer.className = "entry";
        newEntry.className = this.#tagHeader + "Entry";
        newEntry.textContent = entry.title;
        newEntry.addEventListener("click", () => {
          // get list from the entry, then switch the subpanel's current list with it
          this.#childList.list = entry;
        });
        const removeButton = document.createElement("button")
        const editButton = document.createElement("button")
        editButton.textContent = "edit"
        editButton.addEventListener("click", () => {
          this.#list.updateEntry(index);
          this.render();
        })
        removeButton.textContent = "-"
        removeButton.addEventListener("click", () => {
          newEntry.remove;
          this.#list.delEntry(index);
          this.render();
        })
        entryContainer.append(newEntry);
        entryContainer.append(editButton)
        entryContainer.append(removeButton);
        this.#listDisplay.append(entryContainer);
      });
    } else {
      this.header.style.gridTemplateColumns = "4fr minmax(0, 48px)";
      this.#addButton.addEventListener("click", this.renderNewEntryDialog);
      this.#list.list.forEach((entry, index) => {
        //make new to-do entry, then append it
        const newEntry = new entryDisplay(entry, this.#subPanel, entry.desc, 1, this.#list, index);
        this.#listDisplay.append(newEntry.entryCell);
        newEntry.render();
      });
    };
  };
};

export { listDisplay };
