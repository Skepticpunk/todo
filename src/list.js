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

  addEntry(newEntry) { this.#list.push(newEntry); this.updateStorage(); };
  delEntry(entry) {
    console.log("deleting entry: " + entry); 
    this.#list.splice(entry, 1); 
    this.updateStorage(); 
  };
  getEntry(entry) { return this.#list[entry] };
  moveEntry(entry, position) {
    targetEntry = this.#list[entry];
    this.#list.splice(entry, 1);
    this.#list.splice(position - 1, 0, targetEntry);
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
    console.log("saved list " + this.#title + " with content " + stringifiedList);
  };
};

export { toDoList };