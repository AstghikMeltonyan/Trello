// SELECTORS
const addBtn = document.querySelector('.add_btn');
const closeModalBtn = document.querySelector('.modal .header .close');
const modalWindow = document.querySelector('.modal');
const createTodoBtn = document.querySelector('.modal input[type=submit]');
const todoInput = document.querySelector('.modal input[type=text]');
const all_status = document.querySelectorAll('.status');


// EVENT LISTENERS
addBtn.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
createTodoBtn.addEventListener('click', createTodo);

all_status.forEach((status)=>{
    status.addEventListener('dragover', dragOver);
    status.addEventListener('dragenter', dragEnter);
    status.addEventListener('dragleave', dragLeave);
    status.addEventListener('drop', dragDrop);
    status.addEventListener('click', removeTodo);
});

// FUNCTIONS

function openModal(){
    modalWindow.classList.add('active');
    todoInput.focus();
}

function closeModal(){
    modalWindow.classList.remove('active');
    todoInput.blur();  
}

function createTodo(e){
    e.preventDefault(); 
    if (!todoInput.value.trim()) return;

    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    todoDiv.setAttribute('draggable', 'true');

    const span1 = document.createElement('span');
    span1.innerText = todoInput.value;
    todoDiv.appendChild(span1);

    const span2 = document.createElement('span');
    span2.classList.add('close');
    span2.innerText = '\u00D7';
    todoDiv.appendChild(span2);

    all_status[0].appendChild(todoDiv);
    todoInput.value = '';
    closeModal();

    todoDiv.addEventListener('dragstart', dragStart);
    todoDiv.addEventListener('dragend', dragEnd);
}


// TODO FUNCTIONS
let todo = null; 
function dragStart(){
    todo = this;
    setTimeout(()=>{
        this.style.display = 'none';
    }, 0);
}

function dragEnd(){
    todo = null;
    setTimeout(()=>{
        this.style.display = 'flex';
    }, 0);
}

//STATUS FUNCTIONS

function dragOver(e){
    e.preventDefault()
}


function dragEnter(){
    this.style.border = '1px solid #ccc';
}


function dragLeave(){
    this.style.border = 'none';
}


function dragDrop(){
    this.appendChild(todo);
    this.style.border = 'none'; 
}

function removeTodo(e){
    if(e.target.classList == 'close'){
        e.target.parentElement.classList.add('fall');
        e.target.parentElement.addEventListener('transitionend',() =>{
            e.target.parentElement.remove() 
        })  
    }    
}