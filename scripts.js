function TodoList() {
  this.todoList = [];
  this.currentId = 0;
}

TodoList.prototype.addTodo = function(todo) {
  todo.id = this.assignId();
  this.todoList.push(todo)
}

TodoList.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
}

TodoList.prototype.findTodo = function(id) {
  for (let i = 0; i < this.todoList.length; i++ ) {
    if (this.todoList[i].id === id) {
      return this.todoList[i];
    }
  }
  return false;
}

TodoList.prototype.deleteTodo = function(id) {
  for (let i = 0; i < this.todoList.length; i++) {
    if (this.todoList[i].id === id) {
      this.todoList.splice(i, 1);
      return true;
    }
  }
  return false;
}

TodoList.prototype.displayTodos = function() {
  this.todoList.forEach((todo) => {
    $("#todo-list").append(`
    <p>${todo.description}</p>
    `);
  });
}

function TodoItem(description) {
  this.description = description;
  this.isCompleted = false;
}

$(document).ready(function(){
  let todoList = new TodoList();
  $("form#create-todo").submit(function(event) {
    event.preventDefault();
    let todoItem = new TodoItem($("input#description-input").val());
    todoList.addTodo(todoItem);
    $("#todo-list").empty();
    todoList.displayTodos();
  })
})