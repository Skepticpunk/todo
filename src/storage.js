class storageHandler {
  // pulls stored string from WebStorage and parses it into a list that can be interacted with
  constructor(storedLists) {
    this.loadIndex(storedLists)
  }

  #storedLists = {};

  set storedLists(storedLists) { this.#storedLists = storedLists };
  get storedLists() { return this.#storedLists };

  addList = (list) => {
    this.#storedLists.push(list)
  }
  loadLists(storedLists) {
    // We want to try loading a main list when the page is loaded

    // if the list exists, load it
    if (storedLists) {
      this.#storedLists = JSON.parse(storedLists);
    }
  }
}
