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
  const text = e.target.elements.addTodo.value.trim();
  if (text.length > 0) {
    todos.push({
      id: uuidv4(),
      text,
      completed: false,
    });
    saveTodos(todos);
    renderTodos(todos, filters);
    e.target.elements.addTodo.value = "";
  }
});

document.querySelector("#hide-completed").addEventListener("change", (e) => {
  filters.hideCompleted = e.target.checked;
  renderTodos(todos, filters);
});

renderTodos(todos, filters);
