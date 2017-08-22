/*
    This is a sample Store file I pulled from the internet to show the general structure.
*/
import { EventEmitter } from 'events';

import dispatcher from '../Dispatcher/Dispatcher';

class TodoStore extends EventEmitter {
	constructor() {
		super();
		this.todos = [
			{
				id: 113464613,
				text: 'Go Shopping',
				complete: false
			},
			{
				id: 235684679,
				text: 'Pay Water Bill',
				complete: false
			},
		];
	}

	createTodo(text) {
		const id = Date.now();

		this.todos.push({
			id,
			text,
			complete: false,
		});

		this.emit('change');
	}

	getAll() {
		return this.todos;
	}

	handleActions(action) {
		switch (action.type) { // eslint-disable-line default-case
		case 'CREATE_TODO': {
			this.createTodo(action.text);
			break;
		}
		case 'RECEIVE_TODOS': {
			this.todos = action.todos;
			this.emit('change');
			break;
		}
		}
	}
}

const todoStore = new TodoStore();
dispatcher.register(todoStore.handleActions.bind(todoStore));

export default todoStore;
