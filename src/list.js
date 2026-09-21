class toDoList {
  constructor(title, isToDoList) {
    this.#title = title;
    this.#isToDoList = isToDoList;
  };

  #list = [];
  #isToDoList;
  #title = "New Todo List";

  get list() { return this.#list };
  set list(newList) { this.#list = newList };
  set isToDoList(newSetting) { this.#isToDoList = newSetting };
  get isToDoList() { return this.#isToDoList };
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
    localStorage.removeItem(this.#list[entryIndex].title);
    this.updateStorage();
  };
  editEntry(entryIndex, editedEntry) {
    this.#list.splice(entryIndex, 1);
    localStorage.removeItem(this.#list[entryIndex].title);
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
      newItem.isToDoList = item.isToDoList;
      newItem.title = item.title;
      stringifiedList.push(newItem);
    });
    localStorage.setItem(this.#title, JSON.stringify(stringifiedList));
  };
};

export { toDoList };
