function TodoList() {
  this.todoList = localStorage.getItem('todoList')
    ? JSON.parse(localStorage.getItem('todoList'))
    : [];
  this.currentId = this.todoList[this.todoList.length - 1]
    ? this.todoList[this.todoList.length - 1].id
    : 0;
}

TodoList.prototype.setLocalStorageTodoList = function () {
  localStorage.setItem('todoList', JSON.stringify(this.todoList));
};

TodoList.prototype.addTodo = function (todo) {
  todo.id = this.assignId();
  this.todoList.push(todo);
  this.setLocalStorageTodoList();
};

TodoList.prototype.assignId = function () {
  this.currentId += 1;
  return this.currentId;
};

TodoList.prototype.findTodo = function (id) {
  for (let i = 0; i < this.todoList.length; i++) {
    if (this.todoList[i].id == id) {
      return this.todoList[i];
    }
  }
  return false;
};

TodoList.prototype.deleteTodo = function (id) {
  for (let i = 0; i < this.todoList.length; i++) {
    if (this.todoList[i].id == id) {
      this.todoList.splice(i, 1);
    }
  }
  this.setLocalStorageTodoList();
};

TodoList.prototype.displayTodos = function () {
  this.todoList.forEach((todo) => {
    if (todo.isCompleted) {
      $('#todo-list').append(`
    <p data-id=${todo.id} class="strikethrough"><input type="checkbox" checked> ${todo.description} <button class="btn btn-danger btn-sm">X</button></p>
    `);
    } else {
      $('#todo-list').append(`
      <p data-id=${todo.id}><input type="checkbox"> ${todo.description} <button class="btn btn-danger btn-sm">X</button></p>
      `);
    }
  });
};

function TodoItem(description) {
  this.description = description;
  this.isCompleted = false;
}

$(document).ready(function () {
  const todoList = new TodoList();
  todoList.displayTodos();

  $('#todo-list').on('click', function (event) {
    if (event.target.tagName === 'BUTTON') {
      todoList.deleteTodo(event.target.parentElement.dataset.id);
      $(event.target.parentElement).remove();
    } else if (event.target.tagName === 'INPUT') {
      let item = todoList.findTodo(event.target.parentElement.dataset.id);
      if (!item.isCompleted) {
        item.isCompleted = true;
        $(event.target.parentElement).addClass('strikethrough');
        todoList.setLocalStorageTodoList();
      } else {
        item.isCompleted = false;
        $(event.target.parentElement).removeClass('strikethrough');
        todoList.setLocalStorageTodoList();
      }
    }
  });

  $('form#create-todo').submit(function (event) {
    event.preventDefault();
    let todoItem = new TodoItem($('input#description-input').val());
    $('input#description-input').val('');
    todoList.addTodo(todoItem);
    $('#todo-list').empty();
    todoList.displayTodos();
  });
});
