
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
    taskInput.value='';


    e.preventDefault();

}