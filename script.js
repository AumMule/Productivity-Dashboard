function openFeatures() {
    var allElems = document.querySelectorAll('.elem');
    var FullElempage = document.querySelectorAll('.fullElems');
    var fullElemsBack = document.querySelectorAll('.fullElems .back');

    allElems.forEach(function (elem) {
        elem.addEventListener('click', function () {
            FullElempage[elem.id].style.display = 'block';
        });
    });

    fullElemsBack.forEach(function (back) {
        back.addEventListener('click', function () {
            FullElempage[back.id].style.display = 'none';
        });
    });
}

function todoList() {
    const addBtn = document.getElementById("add-btn");
    const removeBtn = document.getElementById("remove-all-btn");
    const titleInput = document.getElementById("todo-title");
    const detailsInput = document.getElementById("todo-details");
    const outputBox = document.getElementById("todo-output");

    let taskList = JSON.parse(localStorage.getItem('taskList')) || [];


    renderTasks();
    if (taskList.length == 0) {
        outputBox.innerHTML = `<div class="dekhte"><h2>Add Tasks</h2></div>`;
    }


    addBtn.addEventListener("click", addTask);
    titleInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (titleInput.value.length === 0) {
                alert("Title must not be empty");
            } else {
                detailsInput.focus();
            }
        }
    });

    detailsInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
            e.preventDefault();
            if (titleInput.value.length === 0) {
                alert("Title must not be empty");
            } else {
                addTask();
                document.getElementById('todo-title').focus();
            }
        }
    });

    document.addEventListener('keydown', (e) => {
        if (e.ctrlKey && e.key === 'Enter') {
            e.preventDefault();
            document.getElementById('todo-title').focus();
        }
    });

    removeBtn.addEventListener("click", () => {
        localStorage.clear();
        taskList = [];
        outputBox.innerHTML = "";
        if (taskList.length == 0) {
            outputBox.innerHTML = `<div class="dekhte"><h2>Add Tasks</h2></div>`;
        }
    });

    function addTask() {
        const title = titleInput.value.trim();
        const details = detailsInput.value.trim();

        if (title === "" && details === "") return;

        const task = {
            title: title,
            details: details,
            completed: false,
        };

        taskList.push(task);
        renderTasks();

        titleInput.value = "";
        detailsInput.value = "";
    }

    function renderTasks() {
        if (!outputBox) {
            console.error("Output box not found!");
            return;
        }

        outputBox.innerHTML = "";

        taskList.forEach((task, index) => {
            const taskElem = document.createElement("div");
            taskElem.classList.add("task-box");

            if (task.completed) {
                taskElem.classList.add("completed");
            }

            taskElem.innerHTML = `<div><h3>${task.title}</h3><p>${task.details}</p></div>`;

            const doneBtn = document.createElement("button");
            doneBtn.innerText = task.completed ? "Done" : "Undone";
            doneBtn.classList.add("btn", task.completed ? "done" : "undone");

            doneBtn.addEventListener("click", () => {
                task.completed = !task.completed;
                renderTasks();
            });

            taskElem.appendChild(doneBtn);
            outputBox.appendChild(taskElem);
        });

        localStorage.setItem('taskList', JSON.stringify(taskList));
    }
}

document.addEventListener('DOMContentLoaded', () => {
    openFeatures();
    todoList();
    fetchData();
});

async function fetchData() {
  try {
    document.getElementById('quote').textContent = 'Loading...';
    document.getElementById('author').textContent = '';
    const response = await fetch('https://dummyjson.com/quotes/random');
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    document.getElementById('quote').textContent = data.quote;
    document.getElementById('author').textContent = `- ${data.author}`;
  } catch (error) {
    console.error('Error fetching data:', error);
    document.getElementById('quote').textContent = 'Failed to load quote.';
    document.getElementById('author').textContent = '';
  }
}