class entryDisplay {
  constructor(entry, subPanel, subPanelContent, showSubPanel, parentList, entryIndex) {
    // listify elements so we can just do stuff with the list
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
    this.#cellPriority.textContent = entry.priority;
    this.#cellTitle.textContent = entry.title;
    this.#cellDesc.textContent = entry.desc;
    this.#cellAdded.textContent = entry.added;
    this.#cellDue.textContent = entry.due;
    this.#cellStatus.textContent = entry.status;
    this.#cellRemoveButton.textContent = "-";
    this.#subPanel = subPanel;
    if(subPanelContent){
      this.#subPanelContent = subPanelContent;
    }
    switch(showSubPanel) {
      case 1:
        this.#entryCell.addEventListener("mouseover", () => { this.#subPanel.textContent = subPanelContent });
        this.#entryCell.addEventListener("mouseout", () => { this.#subPanel.textContent = "" });  
        break;
      case 2:
        this.#entryCell.addEventListener("click", () => { this.#subPanel.textContent = subPanelContent })
        break;
    }
    this.#parentList = parentList;
    this.#cellRemoveButton.addEventListener("click", () => {
      console.log("removing todo");
      console.log(this.#parentList);
      this.#subPanel.textContent = "";
      this.#parentList.delEntry(entryIndex);
      this.#entryCell.remove() })
  };
  #elements = [];
  #removeFromListArgumentFromParentDoNotDoThisItsBad;

  #cellPriority;
  #cellTitle;
  #cellDesc;
  #cellAdded;
  #cellDue;
  #cellStatus;
  #subPanel;
  #subPanelContent;
  #parentList;

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