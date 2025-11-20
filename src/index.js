import "./page.css";

class toDoEntry {
  #title = "Title";
  #description = "Description";
  #dueDate = "1/1/1900";
  #priority = 0;
  #status = 0;
  getTitle() { this.title };
  setTitle( newTitle ) { this.title = newTitle };
  getDesc() { this.description };
  setDesc( newDesc ) { this.description = newDesc };
  getDate() { this.dueDate };
  setDate( newDate ) { this.dueDate = newDate };
  getPriority() { this.priority };
  setPriority( newPriority ) { this.priority };
  getStatus() { this.status };
  setStatus( newStatus ) { this.status = newStatus }; };
class toDoList {
  #list = [];
  addEntry( newEntry ) { list.push(newEntry) };
  delEntry( entry ) { list.splice(entry, 1) };
  moveEntry( entry, position ) {
    targetEntry = this.list[ entry ];
    list.splice( entry, 1 );
    list.splice( position - 1, 0, targetEntry ); }; };

const lists = [];

function addList( list ) { lists.push( list ) };
function delList( list ) { list.splice( list, 1 ) };