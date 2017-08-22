import React from 'react';

import Todo from './Todo';
import * as TodoActions from '../../Actions/TodoActions';
import TodoStore from '../../Stores/TodoStore';


export default class Todos extends React.Component {
	constructor() {
		super();
		this.getTodos = this.getTodos.bind(this);
		this.state = {
			todos: TodoStore.getAll(),
		};
	}

	componentWillMount() {
		TodoStore.on('change', this.getTodos);
	}

	componentWillUnmount() {
		TodoStore.removeListener('change', this.getTodos);
	}

	getTodos() {
		this.setState({
			todos: TodoStore.getAll(),
		});
	}

	reloadTodos() { // eslint-disable-line class-methods-use-this
		TodoActions.reloadTodos();
	}

	render() {
		const { todos } = this.state;

		const TodoComponents = todos.map(todo => <Todo key={todo.id} {...todo} />);

		return (
			<div>
				<button onClick={this.reloadTodos}>Reload!</button>
				<h1>Todos</h1>
				<ul>{TodoComponents}</ul>
			</div>
		);
	}
}
