import "./page.css";
import { toDoList } from "./list.js";
import { toDoEntry } from "./entry.js";
import { listDisplay } from "./list-display.js";
import { storageHandler } from "./storage.js"

const projectLists = new toDoList("Lists", 1);
if (localStorage.getItem("Lists")) {
  const savedProjectLists = JSON.parse(localStorage.getItem("Lists"));
  console.log("loaded main list from storage with contents: " + JSON.stringify(savedProjectLists));
  savedProjectLists.forEach((savedList) => {
      console.log("loading saved list " + savedList.title + ":");
      console.log(savedList);
      const savedListContents = JSON.parse(localStorage.getItem(savedList.title));
      console.log("loaded list contents:");
      console.log(savedListContents); 
      const newList = new toDoList(savedList.title, 0);
      savedListContents.forEach((entry) => {
        const savedEntry = localStorage.getItem(entry.title)
        const newEntry = new toDoEntry(savedEntry.priority, savedEntry.title, savedEntry.description, savedEntry.added, savedEntry.due)
        newList.addEntry(newEntry);
      });
      projectLists.addEntry(newList);
    });
  console.log("loading complete:");
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