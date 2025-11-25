let tasks = JSON.parse(localStorage.getItem("todo-tasks")) || [];
let draggedElement = null;
let currentFilter = "all";
let editingTaskId = null;

const taskForm = document.getElementById("task-form");
const taskInput = document.getElementById("task-input");
const taskCategory = document.getElementById("task-category");
const submitBtn = document.getElementById("submit-btn");
const taskList = document.getElementById("task-list");
const taskCount = document.getElementById("task-count");
const filterBtns = document.querySelectorAll(".filter-btn");

displayTasks();
updateCounter();

taskForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (editingTaskId) {
    const task = tasks.find((t) => t.id === editingTaskId);
    task.text = taskInput.value;
    task.category = taskCategory.value;

    editingTaskId = null;
    submitBtn.textContent = "Add Task";
  } else {
    const task = {
      id: Date.now(),
      text: taskInput.value,
      category: taskCategory.value,
      completed: false,
    };
    tasks.push(task);
  }

  saveTasks();
  displayTasks();
  updateCounter();
  taskInput.value = "";
});

function displayTasks() {
  taskList.innerHTML = "";

  let filteredTasks = tasks;
  if (currentFilter !== "all") {
    filteredTasks = tasks.filter((t) => t.category === currentFilter);
  }

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<p class="empty">No tasks found. Add one above!</p>';
    return;
  }

  filteredTasks.forEach((task) => {
    const taskEl = createTaskElement(task);
    taskList.appendChild(taskEl);
  });
}

function createTaskElement(task) {
  const div = document.createElement("div");
  div.className = `task-item category-${task.category} ${
    task.completed ? "completed" : ""
  }`;
  div.setAttribute("draggable", "true");
  div.dataset.taskId = task.id;

  const categoryEmoji = {
    work: "💼",
    personal: "🏠",
    shopping: "🛒",
  };

  div.innerHTML = `
        <span class="drag-handle">⋮⋮</span>
        <input 
            type="checkbox" 
            class="task-checkbox"
            ${task.completed ? "checked" : ""}
            onchange="toggleTask(${task.id})"
        >
        <div class="task-content">
            <span class="task-text">${task.text}</span>
            <span class="task-category">${categoryEmoji[task.category]} ${
    task.category
  }</span>
        </div>
        <div class="task-actions">
            <button class="btn-edit" onclick="editTask(${
              task.id
            })">Edit</button>
            <button class="btn-delete" onclick="deleteTask(${
              task.id
            })">Delete</button>
        </div>
    `;

  div.addEventListener("dragstart", handleDragStart);
  div.addEventListener("dragend", handleDragEnd);
  div.addEventListener("dragover", handleDragOver);

  return div;
}

function handleDragStart(e) {
  draggedElement = this;
  this.classList.add("dragging");
  e.dataTransfer.effectAllowed = "move";
}

function handleDragEnd(e) {
  this.classList.remove("dragging");
}

function handleDragOver(e) {
  if (e.preventDefault) {
    e.preventDefault();
  }
  e.dataTransfer.dropEffect = "move";

  const afterElement = getDragAfterElement(taskList, e.clientY);
  const dragging = document.querySelector(".dragging");

  if (afterElement == null) {
    taskList.appendChild(dragging);
  } else {
    taskList.insertBefore(dragging, afterElement);
  }

  updateTaskOrder();

  return false;
}

function getDragAfterElement(container, y) {
  const draggableElements = [
    ...container.querySelectorAll(".task-item:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}

function updateTaskOrder() {
  const taskElements = document.querySelectorAll(".task-item");
  const newOrder = [];

  taskElements.forEach((el) => {
    const id = parseInt(el.dataset.taskId);
    const task = tasks.find((t) => t.id === id);
    if (task) {
      newOrder.push(task);
    }
  });

  tasks.forEach((task) => {
    if (!newOrder.find((t) => t.id === task.id)) {
      newOrder.push(task);
    }
  });

  tasks = newOrder;
  saveTasks();
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  task.completed = !task.completed;
  saveTasks();
  displayTasks();
  updateCounter();
}

function editTask(id) {
  const task = tasks.find((t) => t.id === id);

  taskInput.value = task.text;
  taskCategory.value = task.category;
  submitBtn.textContent = "Update Task";
  editingTaskId = id;

  taskInput.focus();
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function deleteTask(id) {
  if (confirm("Delete this task?")) {
    tasks = tasks.filter((t) => t.id !== id);
    saveTasks();
    displayTasks();
    updateCounter();
  }
}

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterBtns.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    displayTasks();
    updateCounter();
  });
});

function updateCounter() {
  let count = tasks.length;
  if (currentFilter !== "all") {
    count = tasks.filter((t) => t.category === currentFilter).length;
  }
  taskCount.textContent = count;
}

function saveTasks() {
  localStorage.setItem("todo-tasks", JSON.stringify(tasks));
}
