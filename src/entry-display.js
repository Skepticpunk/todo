class entryDisplay {
  constructor(entry, subPanel) {
    for(let i = 0; i < 6; i++){
      this.#elements.push(document.createElement("div"))
    };
    this.#cellPriority = this.#elements[0];
    this.#cellTitle = this.#elements[1];
    this.#cellDesc = this.#elements[2];
    this.#cellAdded = this.#elements[3];
    this.#cellDue = this.#elements[4];
    this.#cellStatus = this.#elements[5];
    this.#entryCell.classList.add("entry");
    this.#cellTitle.classList.add("entryTitle");
    if(entry) {
      this.#cellPriority.textContent = entry.priority;
      this.#cellTitle.textContent = entry.title;
      this.#cellDesc.textContent = entry.desc;
      this.#cellAdded.textContent = entry.added;
      this.#cellDue.textContent = entry.due;
      this.#cellStatus.textContent = entry.status;
      this.#cellRemoveButton.textContent = "-";
    };
    this.#subPanel = subPanel;
    console.log(subPanel);
    console.log(this.#subPanel);
    this.#entryCell.addEventListener("mouseover", () => { this.#subPanel.textContent = entry.desc })
    this.#entryCell.addEventListener("mouseout", () => { this.#subPanel.textContent = "" })
    this.#cellRemoveButton.addEventListener("click", () => { this.#subPanel.textContent = ""; this.#entryCell.remove() })
  };
  #elements = [];

  #cellPriority;
  #cellTitle;
  #cellDesc;
  #cellAdded;
  #cellDue;
  #cellStatus;
  #subPanel;

  #entryCell = document.createElement("div");
  #cellRemoveButton = document.createElement("button");

  get entryCell() {return this.#entryCell}
  get cellPriority() {return this.#cellPriority};
  get cellTitle() {return this.#cellTitle};
  get cellDesc() {return this.#cellDesc};
  get cellAdded() {return this.#cellAdded}
  get cellDue() {return this.#cellDue};
  get cellStatus() {return this.#cellStatus};
  get removeButton() {return this.#cellRemoveButton};

  render() {
    this.#entryCell.textContent = "";
    this.#elements.forEach((element) => {
      this.#entryCell.append(element);
    })
    this.#entryCell.append(this.#cellRemoveButton);
  }
};
export { entryDisplay };