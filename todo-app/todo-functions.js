"use strict";

const getSavedTodos = () => {
  const todosJSON = localStorage.getItem("todos");

  try {
    return todosJSON ? JSON.parse(todosJSON) : [];
  } catch (error) {
    return [];
  }
};

// Save the todos to local storage
const saveTodos = (todos) => {
  localStorage.setItem("todos", JSON.stringify(todos));
};

// Remove todo by id
const removeTodo = (id) => {
  const todoIndex = todos.findIndex((todo) => todo.id === id);

  if (todoIndex > -1) {
    todos.splice(todoIndex, 1);
  }
};

// Toggle the completed value for a given todo
function toggleTodo(id) {
  const todo = todos.find((todo) => todo.id === id);

  if (todo) {
    todo.completed = !todo.completed;
  }
}

// Generate the DOM structure for a todo
const generateTodoDom = (todo) => {
  const todoEl = document.createElement("div");
  const todoCheckbox = document.createElement("input");
  const todoText = document.createElement("span");
  const todoButton = document.createElement("button");

  // Setup todo checkbox
  todoCheckbox.setAttribute("type", "checkbox");
  todoCheckbox.checked = todo.completed;
  todoEl.appendChild(todoCheckbox);
  todoCheckbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup todo text
  todoText.textContent = todo.text;
  todoEl.appendChild(todoText);

  // Setup todo button
  todoButton.textContent = "x";
  todoEl.appendChild(todoButton);
  todoButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

const generateSummeryDom = (incompleteTodos) => {
  const summery = document.createElement("h2");
  summery.textContent = `You have ${incompleteTodos.length} todos left.`;
  document.querySelector("#todos").appendChild(summery);
};

const renderTodos = (todos, filters) => {
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  document.querySelector("#todos").innerHTML = "";

  generateSummeryDom(incompleteTodos);

  let showOrHideCompleted;
  if (filters.hideCompleted === true) {
    showOrHideCompleted = incompleteTodos;
  } else {
    showOrHideCompleted = filteredTodos;
  }

  showOrHideCompleted.forEach((todo) => {
    document.querySelector("#todos").appendChild(generateTodoDom(todo));
  });
};
