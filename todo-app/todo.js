"use strict";

let todos = getSavedTodos();

const filters = {
  searchText: "",
  hideCompleted: false,
};

document.querySelector("#filter-todo").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderTodos(todos, filters);
});

document.querySelector("#todo-form").addEventListener("submit", (e) => {
  e.preventDefault();
  todos.push({
    id: uuidv4(),
    text: e.target.elements.addTodo.value,
    completed: false,
  });
  saveTodos(todos);
  renderTodos(todos, filters);
  e.target.elements.addTodo.value = "";
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});

renderTodos(todos, filters);
