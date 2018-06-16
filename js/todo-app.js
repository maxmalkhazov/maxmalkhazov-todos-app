'use strict'

const todos2 = getSavedData();

const filters = {
	searchText: '',
	hideCompleted: false
}

renderData(todos2, filters);

document.querySelector('#search-text').addEventListener('input', (e) => {
	filters.searchText = e.target.value;
	renderData(todos2, filters);
});

document.querySelector('#todo-form').addEventListener('submit', (e) => {
	e.preventDefault();
	if (e.target.elements.todoItem.value.trim().length > 0) {
		todos2.push({
			id: uuidv4(),
			text: e.target.elements.todoItem.value,
			completed: false
		});
		saveData(todos2);
		e.target.elements.todoItem.value = '';
		renderData(todos2, filters);
	}
});

document.querySelector("#is-completed").addEventListener('change', (e) => {
	filters.hideCompleted = e.target.checked;
	renderData(todos2, filters);
});


