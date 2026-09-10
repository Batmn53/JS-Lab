document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');
    const taskList = document.getElementById('taskList');

    // Load tasks from local storage or use defaults
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [
        { id: 1, text: 'Js Lab' },
        { id: 2, text: 'DS Que' }
    ];

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const li = document.createElement('li');
            li.className = 'task-item';
            li.innerHTML = `
                <span class="task-text">${task.text}</span>
                <div class="task-actions">
                    <button class="action-btn edit-btn" onclick="editTask(${task.id})">
                        <i class="fas fa-pen"></i>
                    </button>
                    <button class="action-btn delete-btn" onclick="deleteTask(${task.id})">
                        <i class="fas fa-times"></i>
                    </button>
                </div>
            `;
            taskList.appendChild(li);
        });
        saveTasks();
    }

    function addTask() {
        const text = taskInput.value.trim();
        if (text) {
            tasks.push({
                id: Date.now(),
                text: text
            });
            taskInput.value = '';
            renderTasks();
        }
    }

    window.deleteTask = function(id) {
        tasks = tasks.filter(t => t.id !== id);
        renderTasks();
    }

    window.editTask = function(id) {
        const task = tasks.find(t => t.id === id);
        if (task) {
            const newText = prompt('Edit task:', task.text);
            if (newText !== null && newText.trim() !== '') {
                task.text = newText.trim();
                renderTasks();
            }
        }
    }

    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    addBtn.addEventListener('click', addTask);
    taskInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') addTask();
    });

    // Initial render
    renderTasks();
});
