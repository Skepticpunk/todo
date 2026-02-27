import "./page.css";
import { toDoList } from "./list.js";
import { toDoEntry } from "./entry.js";
import { listDisplay } from "./list-display.js";

class submitForm {
  #elements = [];

  #cellPriority;
  #cellTitle;
  #cellDesc;
  #cellAdded;
  #cellDue;
  #cellStatus;

  #entryCell = document.createElement("div");
  #cellSubmitButton = document.createElement("button");

  get entryCell() {return this.#entryCell}
  get cellPriority() {return this.#cellPriority};
  get cellTitle() {return this.#cellTitle};
  get cellDesc() {return this.#cellDesc};
  get cellAdded() {return this.#cellAdded}
  get cellDue() {return this.#cellDue};
  get cellStatus() {return this.#cellStatus};
  get submitButton() {return this.#cellSubmitButton};

  render() {
    this.#entryCell.textContent = "";
    this.#elements.forEach((element) => {
      this.#entryCell.append(element);
    })
    this.#entryCell.append(this.#cellSubmitButton);
  }

  constructor(entry) {
    for(let i = 0; i < 6; i++){
      this.#elements.push(document.createElement("input"))
    };
    this.#cellPriority = this.#elements[0];
    this.#cellTitle = this.#elements[1];
    this.#cellDesc = this.#elements[2];
    this.#cellAdded = this.#elements[3];
    this.#cellDue = this.#elements[4];
    this.#cellStatus = this.#elements[5];
    this.#entryCell.id = "entry";
    this.#cellTitle.id = "entryTitle";
    if(entry) {
      this.#cellPriority.textContent = entry.priority;
      this.#cellTitle.textContent = entry.title;
      this.#cellDesc.textContent = entry.desc;
      this.#cellAdded.textContent = entry.added;
      this.#cellDue.textContent = entry.due;
      this.#cellStatus.textContent = entry.status;
      this.#cellSubmitButton.textContent = "Submit";
    };
    this.#cellSubmitButton.addEventListener("click", this.#entryCell.remove() )
  };
};

const projectLists = new toDoList("Lists");
const toDoList1 = new toDoList("List 1");
const toDoList2 = new toDoList("List 2");
const projectsDisplay = new listDisplay(document.querySelector("#projectList"), "project", document.querySelector("#toDo"), projectLists);
const toDoListDisplay = new listDisplay(document.querySelector("#toDoEntries"), "toDoList", document.querySelector("#toDoDesc"), toDoList1);
const entry1 = new toDoEntry(
  0,
  "Debug Entry",
  "Lorem Ipsum Dolor Sit Amet blah blah blah here's more words I LOVE BEIJING TIANANMEN",
  "4/20/69",
  "3/14/15",
  0);
const entry2 = new toDoEntry(
  0,
  "fuckfuckfuckf",
  "AGGA",
  "Literally 1984",
  "Feb 30",
  0);

function addList(list) { projectLists.push(list) };
function delList(list) { projectLists.splice(list, 1) };

projectLists.addEntry(toDoList1);
projectLists.addEntry(toDoList2);
projectLists.getEntry(0).addEntry(entry1);
projectLists.getEntry(1).addEntry(entry2);
projectsDisplay.render();
toDoListDisplay.render();