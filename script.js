let tasks = JSON.parse(localStorage.getItem('kanban-tasks')) || [];
let currentFilter = 'all';
let draggedElement = null;

const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const taskCategory = document.getElementById('task-category');
const taskPriority = document.getElementById('task-priority');
const taskDate = document.getElementById('task-date');

const todoList = document.getElementById('todo-list');
const progressList = document.getElementById('progress-list');
const doneList = document.getElementById('done-list');

const filterBtns = document.querySelectorAll('.filter-btn');

taskDate.valueAsDate = new Date();

displayAllTasks();
updateStats();

taskForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const task = {
        id: Date.now(),
        text: taskInput.value,
        category: taskCategory.value,  
        status: 'todo',               
        priority: taskPriority.value,
        dueDate: taskDate.value,
        createdAt: new Date().toISOString()
    };
    
    tasks.push(task);
    saveTasks();
    displayAllTasks();
    updateStats();
    
    taskForm.reset();
    taskDate.valueAsDate = new Date();
});

function displayAllTasks() {
    todoList.innerHTML = '';
    progressList.innerHTML = '';
    doneList.innerHTML = '';
    
    let filteredTasks = tasks;
    if (currentFilter !== 'all') {
        filteredTasks = tasks.filter(t => t.category === currentFilter);
    }
    
    const todoTasks = filteredTasks.filter(t => t.status === 'todo');
    const progressTasks = filteredTasks.filter(t => t.status === 'progress');
    const doneTasks = filteredTasks.filter(t => t.status === 'done');
    
    displayTasksInList(todoList, todoTasks);
    displayTasksInList(progressList, progressTasks);
    displayTasksInList(doneList, doneTasks);
    
    document.getElementById('todo-count').textContent = tasks.filter(t => t.status === 'todo').length;
    document.getElementById('progress-count').textContent = tasks.filter(t => t.status === 'progress').length;
    document.getElementById('done-count').textContent = tasks.filter(t => t.status === 'done').length;
    
    showEmptyMessages();
}

function displayTasksInList(listElement, tasksArray) {
    if (tasksArray.length === 0) return;
    
    tasksArray.forEach(task => {
        const taskEl = createTaskElement(task);
        listElement.appendChild(taskEl);
    });
}

function createTaskElement(task) {
    const div = document.createElement('div');
    div.className = `task-item category-${task.category}`;
    div.setAttribute('draggable', 'true');
    div.dataset.taskId = task.id;
    
    const isOverdue = task.dueDate && new Date(task.dueDate) < new Date();
    
    const categoryEmoji = {
        work: '💼',
        personal: '🏠',
        shopping: '🛒'
    };
    
    div.innerHTML = `
        <div class="task-content">
            <div class="task-text">${task.text}</div>
            <div class="task-meta">
                <span class="task-category">
                    ${categoryEmoji[task.category]} ${task.category}
                </span>
                <span class="task-priority">
                    ${task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'}
                    ${task.priority}
                </span>
                ${task.dueDate ? `
                    <span class="task-due-date ${isOverdue ? 'overdue' : ''}">
                        📅 ${formatDate(task.dueDate)}
                        ${isOverdue ? ' (Overdue!)' : ''}
                    </span>
                ` : ''}
            </div>
        </div>
        <div class="task-actions">
            <button class="btn-edit" onclick="editTask(${task.id})">Edit</button>
            <button class="btn-delete" onclick="deleteTask(${task.id})">Delete</button>
        </div>
    `;
    
    div.addEventListener('dragstart', handleDragStart);
    div.addEventListener('dragend', handleDragEnd);
    
    return div;
}

function handleDragStart(e) {
    draggedElement = this;
    this.classList.add('dragging');
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragEnd(e) {
    this.classList.remove('dragging');
    
    document.querySelectorAll('.task-list').forEach(list => {
        list.classList.remove('drag-over');
    });
}

document.querySelectorAll('.task-list').forEach(list => {
    list.addEventListener('dragover', handleDragOver);
    list.addEventListener('drop', handleDrop);
    list.addEventListener('dragleave', handleDragLeave);
});

function handleDragOver(e) {
    if (e.preventDefault) {
        e.preventDefault();
    }
    e.dataTransfer.dropEffect = 'move';
    this.classList.add('drag-over');
    return false;
}

function handleDragLeave(e) {
    this.classList.remove('drag-over');
}

function handleDrop(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    
    this.classList.remove('drag-over');
    
    const taskId = parseInt(draggedElement.dataset.taskId);
    const newStatus = this.dataset.listType;
    
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.status = newStatus;  
        saveTasks();
        displayAllTasks();
        updateStats();
    }
    
    return false;
}

function editTask(id) {
    const task = tasks.find(t => t.id === id);
    
    taskInput.value = task.text;
    taskCategory.value = task.category;
    taskPriority.value = task.priority;
    taskDate.value = task.dueDate;
    
    deleteTask(id);
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function deleteTask(id) {
    if (confirm('Delete this task?')) {
        tasks = tasks.filter(t => t.id !== id);
        saveTasks();
        displayAllTasks();
        updateStats();
    }
}

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        currentFilter = btn.dataset.filter;  
        displayAllTasks();
    });
});

function showEmptyMessages() {
    const lists = [
        { element: todoList, message: 'No tasks here. Add one above!' },
        { element: progressList, message: 'Drag tasks here when you start!' },
        { element: doneList, message: 'Drag completed tasks here!' }
    ];
    
    lists.forEach(({ element, message }) => {
        if (element.children.length === 0) {
            element.innerHTML = `<p class="empty-message">${message}</p>`;
        }
    });
}

function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.status === 'done').length;
    const pending = total - completed;
    
    document.getElementById('total-tasks').textContent = total;
    document.getElementById('completed-tasks').textContent = completed;
    document.getElementById('pending-tasks').textContent = pending;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    const options = { month: 'short', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
}

function saveTasks() {
    localStorage.setItem('kanban-tasks', JSON.stringify(tasks));
}