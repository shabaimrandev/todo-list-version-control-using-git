document.addEventListener("DOMContentLoaded", initTodoApp);

function initTodoApp() {
    const addButton = document.getElementById("addButton");
    const taskInput = document.getElementById("taskInput");

    addButton.addEventListener("click", addTask);
    taskInput.addEventListener("keypress", e => {
        if (e.key === "Enter") addTask();
    });

    loadTasks(); // Load saved tasks from localStorage
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();
    if (!text) return alert("Please enter a task!");

    const li = createTaskElement(text);
    document.getElementById("taskList").appendChild(li);
    taskInput.value = "";
    saveTasks();
}

function createTaskElement(text) {
    const li = document.createElement("li");
    li.textContent = text;

    li.addEventListener("click", () => {
        li.classList.toggle("completed");
        saveTasks();
    });

    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "×";
    deleteBtn.className = "delete";
    deleteBtn.addEventListener("click", e => {
        e.stopPropagation();
        li.remove();
        saveTasks();
    });

    li.appendChild(deleteBtn);
    return li;
}

function saveTasks() {
    const tasks = [...document.querySelectorAll("#taskList li")].map(li => ({
        text: li.firstChild.textContent,
        completed: li.classList.contains("completed")
    }));
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem("tasks") || "[]");
    tasks.forEach(t => {
        const li = createTaskElement(t.text);
        if (t.completed) li.classList.add("completed");
        document.getElementById("taskList").appendChild(li);
    });
}
