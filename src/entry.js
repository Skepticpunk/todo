class toDoEntry {
  constructor(priority, title, description, added, due, status) {
    this.#priority = priority;
    this.#title = title;
    this.#description = description;
    this.#added = added;
    this.#due = due;
    this.status = status;
    this.#attributes = [
      this.#priority,
      this.#title,
      this.#description,
      this.#added,
      this.#due,
      this.#status
    ];
  };
  #priority = 0;
  #title = "Title";
  #description = "Description";
  #added = "1/1/1900";
  #due = "12/31/2099";
  #status = 0;
  #attributes = [];

  get title() { return this.#title };
  set title(newTitle) { this.#title = newTitle; this.updateStorage(); };
  get desc() { return this.#description };
  set desc(newDesc) { this.#description = newDesc; this.updateStorage(); };
  get added() { return this.#added; }
  set added(newAdded) { this.#added = newAdded; this.updateStorage(); }
  get due() { return this.#due };
  set due(newDue) { this.#due = newDue; this.updateStorage(); };
  get priority() { return this.#priority };
  set priority(newPriority) { this.#priority = newPriority; this.updateStorage(); };
  get status() { return this.#status };
  set status(newStatus) { this.#status = newStatus; this.updateStorage(); };
  get attributes() { return this.#attributes };

  updateStorage() {
    localStorage.setItem(this.#title, JSON.stringify({
      priority: this.#priority,
      title: this.#title,
      description: this.#description,
      added: this.#added,
      due: this.#due,
      status: this.#status
    }));
  };
  updateAll(newPriority, newTitle, newDescription, newAdded, newDue, newStatus) {
    this.#priority = newPriority;
    this.#title = newTitle;
    this.#description = newDescription;
    this.#added = newAdded;
    this.#due = newDue;
    this.#status = newStatus;
    localStorage.setItem(this.#title, JSON.stringify({
      priority: this.#priority,
      title: this.#title,
      description: this.#description,
      added: this.#added,
      due: this.#due,
      status: this.#status
    }));
  };
};

export { toDoEntry };
