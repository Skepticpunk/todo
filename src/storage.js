class listStorageHandler {
  constructor(storedListIndex) {
    this.loadIndex(storedListIndex)
  }

  #storedListIndex = [];
  #storedLists = [];

  // the main list needs to have CRUD functions, as do the sublists

  set storedLists(storedLists) { this.#storedLists = storedLists };
  get storedLists() { return this.#storedLists };

  addList = (list) => {
    newList = this.#storedLists[list]
    this.#storedLists[list] = JSON.parse(newList + entry)
  }
  loadIndex(storedListIndex) {
    // We want to try loading a main list when the page is loaded
    // and then load every sublist in it

    // if the list exists, load it
    if (storedListIndex) {
      this.#storedListIndex = JSON.parse(storedListIndex);
    }
    // load each sublist and push it into the stored lists
    this.#storedListIndex.forEach((list) => {
      this.#storedLists.push(JSON.parse("webStorage." + list))
    })
  }
}
