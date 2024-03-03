document.addEventListener("DOMContentLoaded", function() {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
    const clearBtn = document.getElementById("clearBtn");
  
    // Retrieve tasks from local storage if available
    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  
    // Function to render tasks
    function renderTasks() {
      taskList.innerHTML = "";
      tasks.forEach(function(task, index) {
        const li = document.createElement("li");
        li.textContent = task.name;
        if (task.completed) {
          li.classList.add("completed");
        }
        li.addEventListener("click", function() {
          toggleTask(index);
        });
        taskList.appendChild(li);
      });
      localStorage.setItem("tasks", JSON.stringify(tasks));
    }
  
    // Function to add new task
    function addTask() {
      const taskName = taskInput.value.trim();
      if (taskName !== "") {
        tasks.push({ name: taskName, completed: false });
        renderTasks();
        taskInput.value = "";
      }
    }
  
    // Function to toggle task completion
    function toggleTask(index) {
      tasks[index].completed = !tasks[index].completed;
      renderTasks();
    }
  
    // Function to clear completed tasks
    function clearCompleted() {
      tasks = tasks.filter(task => !task.completed);
      renderTasks();
    }
  
    // Event listeners
    addTaskBtn.addEventListener("click", addTask);
    clearBtn.addEventListener("click", clearCompleted);
  
    // Initial rendering of tasks
    renderTasks();
  });
  