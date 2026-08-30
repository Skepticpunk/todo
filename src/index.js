import "./page.css";
import { toDoList } from "./list.js";
import { toDoEntry } from "./entry.js";
import { listDisplay } from "./list-display.js";
import { storageHandler } from "./storage.js"

const projectLists = new toDoList("Lists", 1);
if (localStorage.getItem("Lists")) {
  projectLists.list = JSON.parse(localStorage.getItem("Lists"));
  console.log("loaded main list from storage with contents: " + localStorage.getItem("Lists"));
  console.log(projectLists.list);
};

const projectsDisplay = new listDisplay(document.querySelector("#projectList"));
projectsDisplay.tagHeader = "project"; 
projectsDisplay.subPanel = document.querySelector("#toDo");
projectsDisplay.list = projectLists;
const toDoListDisplay = new listDisplay(document.querySelector("#toDoEntries"))
toDoListDisplay.tagHeader = "toDoList";
toDoListDisplay.subPanel = document.querySelector("#toDoDesc");
projectsDisplay.childList = toDoListDisplay;