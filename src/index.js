import "./page.css";

class toDoEntry {
  constructor( priority, title, description, dateAdded, dueDate) {
    this.#priority = priority;
    this.#title = title;
    this.#description = description;
    this.#dateAdded = dateAdded;
    this.#dueDate = dueDate; };
  #priority = 0;
  #title = "Title";
  #description = "Description";
  #dateAdded = "1/1/1900";
  #dueDate = "12/31/2099";
  #status = 0;
  getTitle() { return this.#title };
  setTitle( newTitle ) { this.#title = newTitle };
  getDesc() { return this.#description };
  setDesc( newDesc ) { this.#description = newDesc };
  getAdded() { return this.#dateAdded; }
  setAdded( newAdded ) { this.#dateAdded = newAdded }
  getDue() { return this.#dueDate };
  setDue( newDue ) { this.#dueDate = newDue };
  getPriority() { return this.#priority };
  setPriority( newPriority ) { this.#priority = newPriority };
  getStatus() { return this.#status };
  setStatus( newStatus ) { this.#status = newStatus };
};
class toDoList {
  constructor( title ) { this.#title = title };
  #list = [];
  #title = "Unspecified Title";
  getList() { return this.#list };
  addEntry( newEntry ) { this.#list.push(newEntry) };
  delEntry( entry ) { this.#list.splice(entry, 1) };
  getEntry( entry ) { return this.#list[ entry ] };
  moveEntry( entry, position ) {
    targetEntry = this.#list[ entry ];
    this.#list.splice( entry, 1 );
    this.#list.splice( position - 1, 0, targetEntry ); }; 
  getTitle() { return this.#title }
  setTitle( newTitle ) { this.#title = newTitle; }
};
class listDisplay {
  constructor( parentNode, headerNode, list ) {
    this.#parent = parentNode;
    this.#header = headerNode; 
    this.#list = list; };

  #parent = undefined;
  #header = undefined;
  #list = [];

  getList() { return this.#list };
  getParent() { return this.#parent };
  setParent( newParent ) { this.#parent = newParent };
  getHeader() { return this.#header };
  setHeader( newHeader ) { this.#header = newHeader };

  renderList( listType ) {
    this.#parent.textContent = "";
    this.#header.textContent = this.#list.getTitle();
    this.#list.getList().forEach( ( entry ) => {
     if ( entry instanceof toDoEntry ) { 
        const entryCell = document.createElement("div");
        const cellPriority = document.createElement("div");
        const cellTitle = document.createElement("div");
        const cellDesc = document.createElement("div");
        const cellAdded = document.createElement("div");
        const cellDue = document.createElement("div");
        const cellStatus = document.createElement("div");
        entryCell.id = "entry"; 
        cellTitle.id = "cellTitle";
        cellTitle.textContent = entry.getTitle();
        cellPriority.textContent = entry.getPriority();
        cellDesc.textContent = entry.getDesc();
        cellAdded.textContent = entry.getAdded();
        cellDue.textContent = entry.getDue();
        cellStatus.textContent = entry.getStatus();
        entryCell.append( cellPriority );
        entryCell.append( cellTitle );
        entryCell.append( cellDesc );
        entryCell.append( cellAdded );
        entryCell.append( cellDue );
        entryCell.append( cellStatus );
        this.#parent.append( entryCell ); }
      else {
        this.#parent.append( entry.getTitle() ); };
    } );
  };
};

const toDoLists = new toDoList("Lists");
const toDoList1 = new toDoList("List 1");
const listsDisplay = new listDisplay( document.querySelector( "#toDoLists" ), document.querySelector( "#listsHeader > h1" ), toDoLists );
const toDoListDisplay = new listDisplay( document.querySelector( "#toDoEntries" ), document.querySelector( "#toDoTitle" ), toDoList1 );
const entry1 = new toDoEntry(0, "asdf", "ARE WE WORKING YET????", "4/20/69", "3/14/15", 0);

function addList( list ) { toDoLists.push( list ) };
function delList( list ) { toDoLists.splice( list, 1 ) };

toDoLists.addEntry( toDoList1 );
toDoLists.getEntry(0).addEntry( entry1 );
listsDisplay.renderList();
toDoListDisplay.renderList();