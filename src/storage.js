class listStorageHandler {
  constructor(list) {
    // if the list exists, load it
    if(list) {
       this.#list = list;
    }
  }

  #list = [];
  
  set list(list) { this.#list = list };
  get list() { return this.#list };

}