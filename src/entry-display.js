import { toDoEntry } from "./entry.js";

class entryDisplay {
  constructor(entry, subPanel, subPanelContent, showSubPanel, parentList, entryIndex) {
    this.#entry = new toDoEntry(entry.priority, entry.title, entry.desc, entry.added, entry.due, entry.status);
    // listify elements so we can just do stuff with the list
    for (let i = 0; i < 6; i++) {
      this.#elements.push(document.createElement("div"))
    };
    this.#cellPriority = this.#elements[0];
    this.#cellTitle = this.#elements[1];
    this.#cellDesc = this.#elements[2];
    this.#cellAdded = this.#elements[3];
    this.#cellDue = this.#elements[4];
    this.#cellStatus = this.#elements[5];
    // edit attributes
    this.#entryCell.classList.add("entry");
    this.#cellTitle.classList.add("entryTitle");
    // add text
    this.#editDialog.priority.placeholder = "task priority";
    this.#editDialog.title.placeholder = "title";
    this.#editDialog.desc.placeholder = "description";
    this.#editDialog.added.placeholder = "date added";
    this.#editDialog.due.placeholder = "date due";
    this.#editDialog.status.placeholder = "status";
    this.#cancelButton.textContent = "cancel";
    this.#editButton.textContent = "edit";
    this.#updateButton.textContent = "save";
    this.#cellRemoveButton.textContent = "-";
    // set up subpanel
    this.#subPanel = subPanel;
    if (subPanelContent) {
      this.#subPanelContent = subPanelContent;
    }
    switch (showSubPanel) { // which sub-panel type are we showing?
      case 1: // to-do description
        this.#entryCell.addEventListener("mouseover", () => { this.#subPanel.textContent = subPanelContent });
        this.#entryCell.addEventListener("mouseout", () => { this.#subPanel.textContent = "" });
        break;
      case 2: // to-do list
        this.#entryCell.addEventListener("click", () => { this.#subPanel.textContent = subPanelContent })
        break;
    }
    this.#parentList = parentList;
    // add button functions
    this.#cancelButton.addEventListener("click", this.render);
    this.#editButton.addEventListener("click", () => {
      this.renderEditDialog();
    })
    this.#updateButton.addEventListener("click", () => {
      this.updateEntry();
      this.render()
    })
    this.#cellRemoveButton.addEventListener("click", () => {
      this.#subPanel.textContent = "";
      this.#parentList.delEntry(entryIndex);
      this.#entryCell.remove()
    })
  };
  // data
  #elements = [];
  #entry;
  // HTML elements
  #cellPriority;
  #cellTitle;
  #cellDesc;
  #cellAdded;
  #cellDue;
  #cellStatus;
  #subPanel;
  #subPanelContent;
  #parentList;

  #editDialog = {
    container: document.createElement("div"),
    priority: document.createElement("input"),
    title: document.createElement("input"),
    desc: document.createElement("input"),
    added: document.createElement("input"),
    due: document.createElement("input"),
    status: document.createElement("input")
  };

  #entryCell = document.createElement("div");
  #cellRemoveButton = document.createElement("button");
  #cancelButton = document.createElement("button");
  #editButton = document.createElement("button");
  #updateButton = document.createElement("button");

  get entryCell() { return this.#entryCell };
  get cellPriority() { return this.#cellPriority };
  get cellTitle() { return this.#cellTitle };
  get cellDesc() { return this.#cellDesc };
  get cellAdded() { return this.#cellAdded };
  get cellDue() { return this.#cellDue };
  get cellStatus() { return this.#cellStatus };
  get editButton() { return this.#editButton };
  get removeButton() { return this.#cellRemoveButton };
  get editButton() { return this.#editButton };
  get updateButton() { return this.#updateButton };

  render() {
    // clear display state
    this.#entryCell.textContent = "";
    // set up cell contents
    this.#cellPriority.textContent = this.#entry.priority;
    this.#cellTitle.textContent = this.#entry.title;
    this.#cellDesc.textContent = this.#entry.desc;
    this.#cellAdded.textContent = this.#entry.added;
    this.#cellDue.textContent = this.#entry.due;
    this.#cellStatus.textContent = this.#entry.status;
    // append elements
    this.#elements.forEach((element) => {
      this.#entryCell.append(element);
    })
    this.#entryCell.append(this.#editButton);
    this.#entryCell.append(this.#cellRemoveButton);
  }
  renderEditDialog(newEntry) {
    // clear the entry
    this.#entryCell.textContent = "";
    // append and set up elements
    this.#entryCell.append(this.#editDialog.priority);
    this.#entryCell.append(this.#editDialog.title);
    this.#entryCell.append(this.#editDialog.desc);
    this.#entryCell.append(this.#editDialog.added);
    this.#entryCell.append(this.#editDialog.due);
    this.#entryCell.append(this.#editDialog.status);
    this.#entryCell.append(this.#updateButton);
    this.#entryCell.priority.value = newEntry.priority;
    this.#entryCell.title.value = newEntry.title;
    this.#entryCell.desc.value = newEntry.desc;
    this.#entryCell.added.value = newEntry.added;
    this.#entryCell.due.value = newEntry.due;
    this.#entryCell.status.value = newEntry.status;
  }
  updateEntry() {
    this.#entry.priority = this.#editDialog.priority.value;
    this.#entry.value = this.#editDialog.title.value;
    this.#entry.desc = this.#editDialog.desc.value;
    this.#entry.added = this.#editDialog.added.value;
    this.#entry.due = this.#editDialog.due.value;
    this.#entry.status = this.#editDialog.status.value;
    this.render();
  }
};
export { entryDisplay };
