import "./page.css";
import { toDoList } from "./list.js";
import { toDoEntry } from "./entry.js";
import { listDisplay } from "./list-display.js"

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