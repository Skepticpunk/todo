class listStorageHandler {
  constructor(storedLists) {
    // if the list exists, load it
    if(storedLists) {
       this.#storedLists = storedLists;
    }
  }

  #storedLists = [];
  
  set storedLists(storedLists) { this.#storedLists = storedLists };
  get storedLists() { return this.#storedLists };

  addEntry = (entry, list) => {
    entry = toString(entry)
    newList = this.#storedLists[list]
    this.#storedLists[list] = JSON.parse(newList + entry)
  }
}