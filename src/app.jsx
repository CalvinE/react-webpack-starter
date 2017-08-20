/* global document */
import React from 'react';
import ReactDOM from 'react-dom';

import CheckboxWithLabel from './js/components/CheckboxWithLabel/CheckboxWithLabel';

import defaultImage from './images/default.png';

import './sass/index.scss';

ReactDOM.render(
	(
		<div>
			<h1>Howdy!</h1>
			<CheckboxWithLabel labelOn="On" labelOff="Off" onChange={(event) => { console.log('did change!', event); }} />
			<img alt="This is a default image." src={defaultImage} />
		</div>
	),
	document.getElementById('root'),
);
