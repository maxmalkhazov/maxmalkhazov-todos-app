'use strict'

// Fetch existing data from localStorage
const getSavedData = () => {
	const todosJSON = localStorage.getItem('todos');
	
	try {
		return todosJSON ? JSON.parse(todosJSON) : [];
	} catch (e) {
		return [];
	}
	
}

// Save data to local storage
const saveData = (todos) => {
	localStorage.setItem('todos', JSON.stringify(todos2));
}

// Remove data from list
const removeData = (id) => {
	todos2.filter((todo, i) => {
		if (todo.id.includes(id)) {
			todos2.splice(i, 1);
		}
	})
}

// Toggle todo checkbox
const toggleTodo = (id) => {
	todos2.filter((todo) => {
		if (todo.id.includes(id) && todo) {
			todo.completed = !todo.completed
		}
	})
}

// Render application data based of filters
const renderData = (todos, filters) => {
	const todosEl = document.querySelector('#todos');
	const filteredTodos = todos.filter((todo) => {
		const searchTextMatch = todo.text.toLowerCase().includes(filters.searchText.toLowerCase());
		const hideCompletedMatch = !todo.completed || !filters.hideCompleted;
		return searchTextMatch && hideCompletedMatch;
	});
	
	const nonCompleted = filteredTodos.filter((todo) => {
		return !todo.completed;
	});
	
	todosEl.innerHTML = '';
	
	if (todos.length > 0) {
		todosEl.appendChild(generateSummaryDOM(nonCompleted));
	}
	
	
	if (todos.length > 0) {
		filteredTodos.forEach((todo) => {
			todosEl.appendChild(generateDataDOM(todo));
		});
	} else {
		const emptyP = document.createElement('p');
		emptyP.classList.add('empty-message');
		emptyP.textContent = 'Your list is empty. Type something below to start!';
		todosEl.appendChild(emptyP);
	}
}

// Get the DOM Elements for an individual item
const generateDataDOM = (todo) => {
	//Set up div
	const newTodo = document.createElement('label');
	const container = document.createElement('div');
	
	//Set up checkbox
	const checkbox = document.createElement('input');
	checkbox.setAttribute('type', 'checkbox');
	container.appendChild(checkbox);
	checkbox.checked = todo.completed;
	checkbox.addEventListener('change', (e) => {
		toggleTodo(todo.id);
		saveData(todos2);
		renderData(todos2, filters);
	})
	
	//Set up todo text
	const textEl = document.createElement('span');
	textEl.textContent = todo.text;
	container.appendChild(textEl)
	
	// Set up container
	newTodo.classList.add('list-item');
	container.classList.add('list-item__container');
	newTodo.appendChild(container);
	
	//Set up remove button
	const button = document.createElement('button');
	button.textContent = 'Remove';
	button.classList.add('button', 'button--text');
	newTodo.appendChild(button);
	button.addEventListener('click', () => {
		removeData(todo.id);
		saveData(todos2);
		renderData(todos2, filters);
	})
	
	
	return newTodo;
}


// Get the DOM elements for list summary
const generateSummaryDOM = (nonCompleted) => {
	let todosLeft;
	const summary = document.createElement('p');
	summary.classList.add('list-title');
	if (nonCompleted.length === 1) {
		todosLeft = 'todo';
	} else {
		todosLeft = 'todos';
	}
	summary.textContent = `You have ${nonCompleted.length} ${todosLeft} left!`;
	return summary;
}