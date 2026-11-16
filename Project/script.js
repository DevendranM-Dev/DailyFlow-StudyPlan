
let taskForm = document.getElementById("taskForm");
let taskInput = document.getElementById("taskInput");
let priority = document.getElementById("priority");
let taskList = document.getElementById("taskList");



let tasks = JSON.parse(localStorage.getItem("tasks")) || [];


taskForm.addEventListener("submit", function(event) {

    event.preventDefault();

    let name = taskInput.value.trim();

    if (name === "") {
        return;
    }

    let newTask = {
        id: Date.now(),
        name: name,
        priority: priority.value,
        completed: false
    };

    tasks.push(newTask);

    saveTasks();
    displayTasks();

    taskInput.value = "";
});


function saveTasks() {

    localStorage.setItem("tasks", JSON.stringify(tasks));
}


function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach(function(task) {

        let li = document.createElement("li");
        li.className = "task-item";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.checked = task.completed;

        let span = document.createElement("span");
        span.className = "task-name";
        span.textContent = task.name;

        if (task.completed) {
            span.classList.add("done");
        }

        let priorityText = document.createElement("small");
        priorityText.textContent = task.priority;

        let deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";

        checkbox.addEventListener("change", function() {

            task.completed = checkbox.checked;

            saveTasks();
            displayTasks();
        });

        
        deleteButton.addEventListener("click", function() {
            tasks = tasks.filter(function(item) {
                return item.id !== task.id;
            });

            saveTasks();
            displayTasks();
        });

        li.append(checkbox, span, priorityText, deleteButton);

        taskList.appendChild(li);
    });

    updateStats();
}


function updateStats() {

    let total = tasks.length;

    let completed = tasks.filter(function(task) {
        return task.completed;
    }).length;

    let pending = total - completed;

    document.getElementById("totalTasks").textContent = total;

    document.getElementById("completedTasks").textContent = completed;

    document.getElementById("pendingTasks").textContent = pending;
}


displayTasks();
