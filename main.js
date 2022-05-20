const descTaskInput = document.querySelector('#description-task');
const addTaskBtn = document.querySelector('#add-task-btn');
const todosWrapper = document.querySelector('.todos-wrapper');
const todosTitle = document.querySelector('#todos-title');

let tasks;
!localStorage.tasks ? (tasks = []) : (tasks = JSON.parse(localStorage.getItem('tasks')));

let todoItemsElems;

class Task {
    constructor(description) {
        (this.description = description), (this.complited = false);
    }
}

const createTemplate = (task, index) => {
    return ` <div class="todo-item ${task.complited ? 'complited' : ''}">
                <p class="description">${task.description}</p>
                <div class="buttons-wrapper">
                    <input onclick="compliteTask(${index})" type="checkbox" class="btn-complite" ${task.complited ? 'checked' : ''} />
                    <button onclick="removeTask(${index})" class="todo-remove">x</button>
                </div>
            </div>`;
};

const filterTasks = () => {
    const activeTasks = tasks.length && tasks.filter(item => item.complited == false);
    const complitedTasks = tasks.length && tasks.filter(item => item.complited == true);
    tasks = [...activeTasks, ...complitedTasks];
};

const fillHtmlList = () => {
    todosWrapper.innerHTML = '';

    if (tasks.length > 0) {
        filterTasks();
        tasks.forEach((item, index) => {
            todosWrapper.innerHTML += createTemplate(item, index);
        });
        todoItemsElems = document.querySelectorAll('.todo-item');
    }
};

fillHtmlList();

const updateLocal = () => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const compliteTask = index => {
    tasks[index].complited = !tasks[index].complited;
    if (tasks[index].complited) {
        todoItemsElems[index].classList.add('complited');
    } else todoItemsElems[index].classList.remove('complited');
    updateLocal();
    fillHtmlList();
};

const removeTask = index => {
    todoItemsElems[index].classList.add('delition');
    setTimeout(() => {
        tasks.splice(index, 1);
        updateLocal();
        fillHtmlList();
    }, 900);
};

addTaskBtn.addEventListener('click', () => {
    if (descTaskInput.value) {
        tasks.push(new Task(descTaskInput.value));
        updateLocal();
        fillHtmlList();
        descTaskInput.value = '';
    } else alert('Введите текст');
});
