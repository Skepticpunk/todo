class listStorageHandler {
  constructor(storedLists) {

    // We want to try loading a main list when the page is loaded
    // and then load every sublist in it

    // if the list exists, load it
    if (storedLists) {
      this.#storedLists = storedLists;
    }
  }

  #storedLists = [];

  // the main list needs to have CRUD functions, as do the sublists

  set storedLists(storedLists) { this.#storedLists = storedLists };
  get storedLists() { return this.#storedLists };

  addEntry = (entry, list) => {
    entry = toString(entry)
    newList = this.#storedLists[list]
    this.#storedLists[list] = JSON.parse(newList + entry)
  }
}
