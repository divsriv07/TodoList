const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

document.addEventListener("DOMContentLoaded", getLocalTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("change", filterTodo);


//Function to add todo item
function addTodo(event) {
    event.preventDefault();
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");
    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value; 

    //check if submission is empty, then return a window alert.
    if(newTodo.innerText===''){
        window.alert("Error: TODO field cannot be left empty.");
        return;
    }
    else{
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);
    }


    //adding to local storage; here we have used localStorage functionality. 
    saveLocalTodos(todoInput.value);
    
    const completedButton = document.createElement("button");
    completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
    completedButton.classList.add("complete-btn");
    todoDiv.appendChild(completedButton);

    const trashButton = document.createElement("button");
    trashButton.innerHTML = '<i class="fas fa-trash"></li>';
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);
    
    todoList.appendChild(todoDiv);
    todoInput.value = "";
}



function deleteCheck(e) {
    const item = e.target;

    if(item.classList[0] === "trash-btn") {
        const todo = item.parentElement;
        todo.classList.add("slide");

        removeLocalTodos(todo);
        todo.addEventListener("transitionend", function() {
            todo.remove();
        });
    }

    if(item.classList[0] === "complete-btn") {
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }
}


//This function helps to segregate tasks into (all, incomplete and complete).
function filterTodo(e) {
    const todos = todoList.childNodes;

    todos.forEach(function(todo) {
        switch(e.target.value) {
            case "all": 
                todo.style.display = "flex";
                break;
            case "completed": 
                if(todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            case "incomplete":
                if(!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
        }
    });
}


//Storage of todo-items is done using localStorage. (Comments added to explain the working of code with the localStorage.)
function saveLocalTodos(todo) {
    let todos;

    //if todos key does not exist, we create an array.
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } 
    
    // else we receive the data in string form, which is then parsed into JSON format.

    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    //new todo item is pushed onto array.
    todos.push(todo);

    //todos key set to stringified value of array.
    localStorage.setItem("todos", JSON.stringify(todos));
}


//function to pull information from localStorage and put it into structure on web application
function getLocalTodos() {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } 
    
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    todos.forEach(function(todo) {


        //the todo item
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");
        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);


        //completion button
        const completedButton = document.createElement("button");
        completedButton.innerHTML = '<i class="fas fa-check-circle"></li>';
        completedButton.classList.add("complete-btn");
        todoDiv.appendChild(completedButton);


        //delete icon
        const trashButton = document.createElement("button");
        trashButton.innerHTML = '<i class="fas fa-trash"></li>';
        trashButton.classList.add("trash-btn");
        todoDiv.appendChild(trashButton);

        todoList.appendChild(todoDiv);
    });
}


//Function to remove a todo item.
function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } 
    
    else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }


    //Splicing the array to remove the todo item
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}