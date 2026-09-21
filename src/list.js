class toDoList {
  constructor(title, isProjectList) {
    this.#title = title;
    this.#isProjectList = isProjectList;
  };

  #list = [];
  #isProjectList;
  #title = "New Todo List";

  get list() { return this.#list };
  set list(newList) { this.#list = newList };
  set isProjectList(newSetting) { this.#isProjectList = newSetting };
  get isProjectList() { return this.#isProjectList };
  get title() { return this.#title };
  set title(newTitle) { this.#title = newTitle; };

  addEntry(newEntry) {
    if (newEntry.title != "") {
      this.#list.push(newEntry);
      this.updateStorage();
    };
  };
  delEntry(entryIndex) {
    this.#list.splice(entryIndex, 1);
    this.updateStorage();
  };
  updateEntry(entryIndex, newEntry) {
    this.#list.splice(entryIndex, 1, newEntry);
    this.updateStorage();
  }
  getEntry(entryIndex) { return this.#list[entryIndex] };
  moveEntry(entryIndex, newPosition) {
    targetEntry = this.#list[entryIndex];
    this.#list.splice(entryIndex, 1);
    this.#list.splice(newPosition - 1, 0, targetEntry);
    this.updateStorage();
  };
  updateStorage() {
    let stringifiedList = [];
    this.#list.forEach((item) => {
      let newItem = {};
      newItem.list = item.list;
      newItem.isProjectList = item.isProjectList;
      newItem.title = item.title;
      stringifiedList.push(newItem);
    });
    localStorage.setItem(this.#title, JSON.stringify(stringifiedList));
  };
};

export { toDoList };
