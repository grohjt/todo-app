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
  const todoEl = document.createElement("label");
  const containerEl = document.createElement("div");
  const todoCheckbox = document.createElement("input");
  const todoText = document.createElement("span");
  const removeButton = document.createElement("button");

  // Setup todo checkbox
  todoCheckbox.setAttribute("type", "checkbox");
  todoCheckbox.checked = todo.completed;
  containerEl.appendChild(todoCheckbox);
  todoCheckbox.addEventListener("change", () => {
    toggleTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  // Setup todo text
  todoText.textContent = todo.text;
  containerEl.appendChild(todoText);

  // Setup container
  todoEl.classList.add("list-item");
  containerEl.classList.add("list-item__container");
  todoEl.appendChild(containerEl);

  // Setup remove todo button
  removeButton.textContent = "remove";
  removeButton.classList.add("button", "button--text");
  todoEl.appendChild(removeButton);
  removeButton.addEventListener("click", () => {
    removeTodo(todo.id);
    saveTodos(todos);
    renderTodos(todos, filters);
  });

  return todoEl;
};

const generateSummeryDom = (incompleteTodos) => {
  const summery = document.createElement("h2");
  const plural = incompleteTodos.length === 1 ? "" : "s";
  summery.classList.add("list-title");
  summery.textContent = `You have ${incompleteTodos.length} todo${plural} left.`;
  document.querySelector("#todos").appendChild(summery);
};

const renderTodos = (todos, filters) => {
  const todoEl = document.querySelector("#todos");
  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(filters.searchText.toLowerCase())
  );

  const incompleteTodos = filteredTodos.filter((todo) => !todo.completed);

  todoEl.innerHTML = "";

  generateSummeryDom(incompleteTodos);

  let showOrHideCompleted;
  if (filters.hideCompleted === true) {
    showOrHideCompleted = incompleteTodos;
  } else {
    showOrHideCompleted = filteredTodos;
  }

  if (showOrHideCompleted.length > 0) {
    showOrHideCompleted.forEach((todo) => {
      todoEl.appendChild(generateTodoDom(todo));
    });
  } else {
    const messageEl = document.createElement("p");
    messageEl.classList.add("empty-message");
    messageEl.textContent = "No to-dos to show";
    todoEl.appendChild(messageEl);
  }
};
