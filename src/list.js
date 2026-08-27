class toDoList {
  constructor(title, listType) {
    this.#title = title;
    this.#listType = listType;
  };

  #list = [];
  #listType;
  #title = "New Todo List";

  get list() { return this.#list };
  set list(newList) { this.#list = newList };
  set listType(newListType) { this.#listType = newListType };
  get listType() { return this.#listType };
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
      newItem.listType = item.listType;
      newItem.title = item.title;
      stringifiedList.push(JSON.stringify(newItem));
    });
    localStorage.setItem(this.#title, stringifiedList); 
    console.log("saved list " + this.#title + " with content " + stringifiedList);
  };
};

export { toDoList };