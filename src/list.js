class toDoList {
  constructor(title, listType) {
    this.#title = title;
    this.#listType = listType;
  };

  #list = [];
  #listType;
  #title = "New Todo List";

  get list() { return this.#list };
  set listType(newListType) { this.#listType = newListType };
  get listType() { return this.#listType };
  get title() { return this.#title };
  set title(newTitle) { this.#title = newTitle; };

  addEntry(newEntry) { this.#list.push(newEntry) };
  delEntry(entry) { console.log("deleting entry: " + entry); this.#list.splice(entry, 1) };
  getEntry(entry) { return this.#list[entry] };
  moveEntry(entry, position) {
    targetEntry = this.#list[entry];
    this.#list.splice(entry, 1);
    this.#list.splice(position - 1, 0, targetEntry);
  };
};

export { toDoList };