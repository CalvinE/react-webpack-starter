import React from 'react';
import PropTypes from 'prop-types';

export default function Todo(props) {
	const { complete, edit, text } = props;

	const icon = complete ? '\u2714' : '\u2716';

	if (edit) {
		return (
			<li>
				<input value={text} focus="focused" />
			</li>
		);
	}

	return (
		<li>
			<span>{text}</span>
			<span>{icon}</span>
		</li>
	);
}

Todo.propTypes = {
	complete: PropTypes.bool,
	edit: PropTypes.bool,
	text: PropTypes.string
};
