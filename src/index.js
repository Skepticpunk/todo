import "./page.css";
import { toDoList } from "./list.js";
import { toDoEntry } from "./entry.js";
import { listDisplay } from "./list-display.js";
import { storageHandler } from "./storage.js"

const projectLists = new toDoList("Lists", 1);
if (localStorage.getItem("Lists")) {
  const savedList = JSON.parse(localStorage.getItem("Lists"));
  savedList.forEach((entry) => {
      const savedEntry = new toDoList(entry.title, 0);
      savedEntry.list = entry.list;
      projectLists.addEntry(savedEntry);
    });
  console.log("loaded main list from storage with contents: " + JSON.stringify(savedList));
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