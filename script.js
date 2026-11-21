
// Get HTML elements
const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");

const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const pendingTasks = document.getElementById("pendingTasks");
const taskPriority = document.getElementById("taskPriority");
const taskDeadline = document.getElementById("taskDeadline");

// Store tasks
let tasks = JSON.parse(localStorage.getItem("studyspaceTasks")) || [];

// Save tasks
function saveTasks() {
    localStorage.setItem("studyspaceTasks", JSON.stringify(tasks));
}

// Display tasks
function displayTasks() {

    taskList.innerHTML = "";

    tasks.forEach((task, index) => {

        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;
        const priorityLabel = document.createElement("small");
        priorityLabel.textContent = task.priority || "Medium";
        priorityLabel.className = "priority-" + (task.priority || "Medium").toLowerCase();
        const deadlineLabel = document.createElement("small");

if (task.deadline) {
    deadlineLabel.textContent = "Due: " + task.deadline;
} else {
    deadlineLabel.textContent = "No deadline";
}

deadlineLabel.className = "deadline-label";

        if (task.completed) {
            taskText.style.textDecoration = "line-through";
        }

        const completeBtn = document.createElement("button");
        completeBtn.textContent = task.completed ? "Undo" : "Complete";

        completeBtn.addEventListener("click", () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
            displayTasks();
        });

const editBtn = document.createElement("button");
editBtn.textContent = "Edit";

editBtn.addEventListener("click", () => {

    const newText = prompt("Edit your task:", task.text);

    if (newText === null) return;

    if (newText.trim() === "") {
        alert("Task name cannot be empty!");
        return;
    }

    const newPriority = prompt(
        "Enter priority: High, Medium or Low",
        task.priority || "Medium"
    );

    if (newPriority === null) return;

    const priority = newPriority.trim().toLowerCase();

    if (!["high", "medium", "low"].includes(priority)) {
        alert("Please enter High, Medium or Low.");
        return;
    }

    const newDeadline = prompt(
        "Enter deadline (YYYY-MM-DD), or leave blank:",
        task.deadline || ""
    );

    if (newDeadline === null) return;

    if (
        newDeadline.trim() !== "" &&
        !/^\d{4}-\d{2}-\d{2}$/.test(newDeadline.trim())
    ) {
        alert("Please enter the date in YYYY-MM-DD format.");
        return;
    }

    tasks[index].text = newText.trim();

    tasks[index].priority =
        priority.charAt(0).toUpperCase() + priority.slice(1);

    tasks[index].deadline = newDeadline.trim();

    saveTasks();
    displayTasks();

});


        const deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.addEventListener("click", () => {
            tasks.splice(index, 1);
            saveTasks();
            displayTasks();
        });

        li.appendChild(taskText);
        li.appendChild(priorityLabel);
        li.appendChild(deadlineLabel);
        li.appendChild(editBtn);
        li.appendChild(completeBtn);
        li.appendChild(deleteBtn);

        taskList.appendChild(li);
    });

    // Update statistics
    const completed = tasks.filter(task => task.completed).length;

    totalTasks.textContent = tasks.length;
    completedTasks.textContent = completed;
    pendingTasks.textContent = tasks.length - completed;
}

// Add a new task
function addTask() {

    const text = taskInput.value.trim();

    if (text === "") {
        alert("Please enter a task!");
        return;
    }

    tasks.push({
    text: text,
    completed: false,
    priority: taskPriority.value,
    deadline: taskDeadline.value
});


    taskInput.value = "";
    taskDeadline.value = "";

    saveTasks();
    displayTasks();
}

// Button click
addTaskBtn.addEventListener("click", addTask);

// Press Enter to add a task
taskInput.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        addTask();
    }
});

// Display saved tasks when page loads
displayTasks();
