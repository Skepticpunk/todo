class toDoEntry {  
  constructor(priority, title, description, added, due) {
    this.#priority = priority;
    this.#title = title;
    this.#description = description;
    this.#added = added;
    this.#due = due;
  };
  #priority = 0;
  #title = "Title";
  #description = "Description";
  #added = "1/1/1900";
  #due = "12/31/2099";
  #status = 0;
  #attributes = [
    this.priority,
    this.#title, 
    this.#description,
    this.#added,
    this.#due,
    this.#status
  ]

  get title() { return this.#title };
  set title(newTitle) { this.#title = newTitle };
  get desc() { return this.#description };
  set desc(newDesc) { this.#description = newDesc };
  get added() { return this.#added; }
  set added(newAdded) { this.#added = newAdded }
  get due() { return this.#due };
  set due(newDue) { this.#due = newDue };
  get priority() { return this.#priority };
  set priority(newPriority) { this.#priority = newPriority };
  get status() { return this.#status };
  set status(newStatus) { this.#status = newStatus };
  get attributes() { return this.#attributes };
};

export { toDoEntry };