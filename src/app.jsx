/* global document */
import React from 'react';
import ReactDOM from 'react-dom';

import defaultImage from './images/default.png';

import './sass/index.scss';

ReactDOM.render(
	(
		<div>
			<h1>Howdy!</h1>
			<img alt="This is a default image." src={defaultImage} />
		</div>
	),
	document.getElementById('root'),
);