
//Define UI Vars by ID
const form = document.querySelector('#task-form');
// const form = document.getElementById("task-form");
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');


//Load All event listeners
loadEventListeners();

//Load All event listeners funstion
function loadEventListeners() {
    //add task event
    form.addEventListener('submit', addTask);
    //Remove task event
    taskList.addEventListener('click', removeTask);
    //Clear task event
    clearBtn.addEventListener('click', clearTask);
    //Filter task event
    filter.addEventListener('keyup', filterTask);
}


//Add task
function addTask(e) {
    if (taskInput.value === '') {
        alert('Add a task');
    }

    // <li class="collection-item">{taskInput.value}
    // <a class="delete-item secondary-content" href="#"><i class="fa fa-remove"></i></a>
    // </i>

    //Create list item
    const li = document.createElement('li');
    //add class
    li.className = 'collection-item'
    //Create text node and append
    li.appendChild(document.createTextNode(taskInput.value));
    //Create new link element
    const link = document.createElement('a');
    //add class
    link.className = 'delete-item secondary-content';
    //add icon html
    link.innerHTML = '<i class = "fa fa-remove"></i>';
    //Append the link to li
    li.appendChild(link);

    // console.log(li);

    //append li to ul
    taskList.appendChild(li);

    //clear input
    taskInput.value = '';


    e.preventDefault();

}

//Remmove Task
function removeTask(e) {
    if (e.target.parentElement.classList.contains('delete-item')) {
        if (confirm('Are you sure to delete this item?')) {
            e.target.parentElement.parentElement.remove();
        }
    }
    // console.log(e.target)
}


//Clear task
function clearTask() {
    // taskList.innerHTML = '';
    if (confirm('Delete all tasks?')) {
        while (taskList.firstChild) {
            taskList.removeChild(taskList.firstChild);
        }
    }
}

//Filter task
function filterTask(e) {

    const text = e.target.value.toLowerCase(); //whatever we type

    //querySelectorAll return nodelist, getElementbyClass return HTML cleection need to convert to array
    document.querySelectorAll('.collection-item').forEach
        (function (task1) { //task1 as iterator
            const item = task1.firstChild.textContent;
            if (item.toLowerCase().indexOf(text) != -1) {
                task1.style.display = 'block';
            } else {
                task1.style.display = 'none';
            }
        })

}