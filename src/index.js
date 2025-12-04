import "./page.css";

class toDoEntry {
  constructor( title, desc, date, priority ) {
    this.#title = title;
    this.#description = desc;
    this.#dueDate = date,
    this.#priority = priority; };
  #title = "Title";
  #description = "Description";
  #dueDate = "1/1/1900";
  #priority = 0;
  #status = 0;
  getTitle() { return this.#title };
  setTitle( newTitle ) { this.#title = newTitle };
  getDesc() { return this.#description };
  setDesc( newDesc ) { this.#description = newDesc };
  getDate() { return this.#dueDate };
  setDate( newDate ) { this.#dueDate = newDate };
  getPriority() { return this.#priority };
  setPriority( newPriority ) { this.#priority = newPriority };
  getStatus() { return this.#status };
  setStatus( newStatus ) { this.#status = newStatus }; };
class toDoList {
  constructor( title ) { this.#title = title };
  #list = [];
  #title = "";
  getList() { return this.#list };
  addEntry( newEntry ) { this.#list.push(newEntry) };
  delEntry( entry ) { this.#list.splice(entry, 1) };
  getEntry( entry ) { return this.#list[ entry ] };
  moveEntry( entry, position ) {
    targetEntry = this.#list[ entry ];
    this.#list.splice( entry, 1 );
    this.#list.splice( position - 1, 0, targetEntry ); }; 
  getTitle() { return this.#title }
  setTitle( newTitle ) { this.#title = newTitle; }};
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

  renderList() {
    this.#parent.textContent = "";
    this.#header.textContent = this.#list.getTitle();
    this.#list.getList().forEach( ( entry ) => {
      this.#parent.append( entry.getTitle() ); } ); }; };

const toDoLists = new toDoList("Lists");
const toDoList1 = new toDoList("List 1");
const listsDisplay = new listDisplay( document.querySelector( "#toDoLists" ), document.querySelector( "#listsHeader > h1" ), toDoLists );
const toDoListDisplay = new listDisplay( document.querySelector( "#listEntries" ), document.querySelector( "#toDoTitle" ), toDoList1 );
const entry1 = new toDoEntry("asdf", "ARE WE WORKING YET????", "4/20/69", 0);

function addList( list ) { toDoLists.push( list ) };
function delList( list ) { toDoLists.splice( list, 1 ) };

toDoLists.addEntry( toDoList1 );
toDoLists.getEntry(0).addEntry( entry1 );
console.log(toDoLists.getEntry(0).getEntry(0).getTitle());
console.log(toDoLists.getEntry(0).getEntry(0).getDesc());
console.log(toDoLists.getEntry(0).getList());
console.log(toDoLists.getList())
listsDisplay.renderList();
toDoListDisplay.renderList();