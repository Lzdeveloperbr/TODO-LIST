const addButton = document.querySelector('.button-add-task');
const taskInput = document.querySelector('.input-task');
const taskList = document.querySelector('.list-tasks');

let tasks = [];

function addTask() {
  const taskText = taskInput.value.trim();
  if (taskText === '') return;

  tasks.push({
    tarefa: taskText,
    concluida: false,
  });

  taskInput.value = '';
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = '';

  tasks.forEach((item, index) => {
    const li = document.createElement('li');
    li.className = `task ${item.concluida ? 'done' : ''}`;

    li.innerHTML = `
      <img src="./img/checked.png" alt="Concluir tarefa" onclick="toggleTask(${index})">
      <p>${item.tarefa}</p>
      <img src="./img/trash.png" alt="Excluir tarefa" onclick="deleteTask(${index})">
    `;

    taskList.appendChild(li);
  });

  localStorage.setItem('lista', JSON.stringify(tasks));
}

function toggleTask(index) {
  tasks[index].concluida = !tasks[index].concluida;
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function loadTasks() {
  const storedTasks = localStorage.getItem('lista');
  if (storedTasks) {
    tasks = JSON.parse(storedTasks);
  }
  renderTasks();
}

addButton.addEventListener('click', addTask);

taskInput.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    addTask();
  }
});

loadTasks();
