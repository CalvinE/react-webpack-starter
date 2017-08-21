/* global describe, it */
import * as Chai from 'chai';
import React from 'react';
import { shallow } from 'enzyme';
import CheckboxWithLabel from '../CheckboxWithLabel.jsx';

describe('CheckboxWithLabel component tests.', () => {
	it('Component should have on and off labels that are switched based on state.', () => {
		const checkbox = shallow(
			<CheckboxWithLabel labelOn="On" labelOff="Off" />
		);

		Chai.expect(checkbox.text()).to.equal('Off');
		checkbox.find('input').simulate('change');
		Chai.expect(checkbox.text()).to.equal('On');
	});

	it('Component onChange prop should fire when change occurrs.', () => {
		let didFire = false;
		const checkbox = shallow(
			<CheckboxWithLabel labelOn="On" labelOff="Off" onChange={() => { didFire = true; }} />
		);
		checkbox.find('input').simulate('change');
		Chai.expect(didFire).to.equal(true);
	});
});
