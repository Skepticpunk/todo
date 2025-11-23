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
  #list = [];
  addEntry( newEntry ) { this.#list.push(newEntry) };
  delEntry( entry ) { this.#list.splice(entry, 1) };
  getEntry( entry ) { return this.#list[ entry ] };
  moveEntry( entry, position ) {
    targetEntry = this.#list[ entry ];
    this.#list.splice( entry, 1 );
    this.#list.splice( position - 1, 0, targetEntry ); }; };
class listDisplay {
  constructor( parentNode ) {
    this.#parent = parentNode };
  #parent = undefined;
  getParent() { return this.#parent };
  setParent( newParent ) { this.#parent = newParent };
  addEntry( newEntry ) { this.#parent.append( newEntry ) };
  delEntry( entry ) { this.#parent[ entry ].remove() };
  getEntry( entry ) { return this.#parent[ entry ] };
  moveEntry( entry, position ) {
    targetEntry = this.#parent[ entry ];
    this.#parent[ entry ].remove();
    this.#parent.splice( position - 1, 0, targetEntry ); }; };

const lists = [];
const list1 = new toDoList;
const entry1 = new toDoEntry("asdf", "ARE WE WORKING YET????", "4/20/69", 0);

function addList( list ) { lists.push( list ) };
function delList( list ) { lists.splice( list, 1 ) };

addList( list1 );
lists[0].addEntry( entry1 );
console.log(lists[0].getEntry(0).getTitle());
console.log(lists[0].getEntry(0).getDesc());