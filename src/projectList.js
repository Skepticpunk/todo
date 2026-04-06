class projectList {
  constructor(title) { this.#title = title };

  #list = [];
  #title = "New Project List";

  get list() { return this.#list };
  get title() { return this.#title };
  set title(newTitle) { this.#title = newTitle; };

  addEntry(newEntry) { this.#list.push(newEntry) };
  delEntry(entry) { this.#list.splice(entry, 1) };
  getEntry(entry) { return this.#list[entry] };
  moveEntry(entry, position) {
    targetEntry = this.#list[entry];
    this.#list.splice(entry, 1);
    this.#list.splice(position - 1, 0, targetEntry);
  };
};

export { toDoList };