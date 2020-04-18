//Selectors
const todoInput = selectElement('.todo-input');
const todoButton = selectElement('.todo-button');
const todoList = selectElement('.todo-list');
const filterOption = selectElement('.filter-todo');
const currentDay = selectElement('.current-day');
const daylist = ["Sunday","Monday","Tuesday","Wednesday ","Thursday","Friday","Saturday"];

const today = new Date();
const day = today.getDay();
	currentDay.innerHTML = daylist[day];
//Functions

// Selecting dom-element
function selectElement(element) {
	return document.querySelector(element);
}
// Adding class for dom-element
const addStyle = (element, cls) => element.classList.add(cls);
// Creating new dom-element
const createNewElement = element => document.createElement(element);

// Add Todo
const addTodo = event => {
	// Prevent form from submiting;
	event.preventDefault();
	// Todo DIV 
	const todoDiv = createNewElement('div');
	addStyle(todoDiv, 'todo');
	// Create LI
	const newTodo = createNewElement('li');
	newTodo.innerText = todoInput.value;
	addStyle(newTodo, 'todo-item');
	todoDiv.appendChild(newTodo);
	// ADD TODO TO LOCALSTORAGE
	saveLocalTodos(todoInput.value);
	// CHECK MARK BUTTON
	const completedButton = createNewElement('button');
	completedButton.innerHTML = '<i class="fa fa-check"></i>';
	addStyle(completedButton, 'complete-btn');
	todoDiv.prepend(completedButton);
	// CHECK TRASH BUTTON
	const trashButton = createNewElement('button');
	trashButton.innerHTML = '<i class="fa fa-trash"></i>';
	addStyle(trashButton, 'trash-btn');
	todoDiv.appendChild(trashButton);
	// APPENED TO LSIT
	todoList.appendChild(todoDiv);
	// Clear Todo INPUT VALUE
	todoInput.value = '';
}

// Delete Todo
const deleteCheck = ({target}) => {
	if (target.classList[0] === 'trash-btn') {
		const todo = target.parentElement;
		todo.classList.add("fall");
		removeLocalTodos(todo);
		todo.addEventListener('transitionend', function () {
			todo.remove();
		});
	};
	if (target.classList[0] === 'complete-btn') {
		const todo = target.parentElement;
		todo.classList.toggle("completed");
	};
};

// Filtering todo's
const filterTodo = ({target}) => {
	const todos = todoList.childNodes;
	todos.forEach(function (todo) {
		switch (target.value) {
			case "all":
				todo.style.display = "flex";
				break;
			case "completed":
				todo.classList.contains("completed") ?
					todo.style.display = "flex" :
					todo.style.display = "none";
				break;
			case "uncompleted":
				!todo.classList.contains("completed") ?
					todo.style.display = "flex" :
					todo.style.display = "none";
		};
	});
};

function saveLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.push(todo);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function removeLocalTodos(todo) {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	const todoIndex = todo.children[0].innerText;
	todos.splice(todos.indexOf(todoIndex), 1);
	localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos() {
	let todos;
	if (localStorage.getItem("todos") === null) {
		todos = [];
	} else {
		todos = JSON.parse(localStorage.getItem("todos"));
	}
	todos.forEach(function (todo) {
		//Create todo div
		const todoDiv = document.createElement("div");
		todoDiv.classList.add("todo");
		//Create list
		const newTodo = document.createElement("li");
		newTodo.innerText = todo;
		addStyle(newTodo, 'todo-item');
		todoDiv.appendChild(newTodo);
		todoInput.value = "";
		//Create Completed Button
		const completedButton = document.createElement("button");
		completedButton.innerHTML = `<i class="fa fa-check"></i>`;
		addStyle(completedButton, 'complete-btn');
		todoDiv.prepend(completedButton);
		//Create trash button
		const trashButton = document.createElement("button");
		trashButton.innerHTML = `<i class="fa fa-trash"></i>`;
		addStyle(trashButton, 'trash-btn');
		todoDiv.appendChild(trashButton);
		//attach final Todo
		todoList.appendChild(todoDiv);
	});
}
// Event Listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filterOption.addEventListener('click', filterTodo);