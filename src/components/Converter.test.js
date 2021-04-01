import React from 'react';
import { render, screen, fireEvent, container } from '@testing-library/react';
import Converter from './Converter';
import { Provider } from 'react-redux';
import store from '../app/store';

describe('Converter', () => {
	test('should accept value for currency exchange rate', () => {
		render(
			<Provider store={store}>
				<Converter />
			</Provider>
		);
		screen.debug();
		const Input = screen.getByPlaceholderText(/type value eg. 4.441/i);

		expect(Input).toBeInTheDocument();
		const rate = 4.444;
		fireEvent.change(Input, { target: { value: rate } });
		expect(Input.value).toContain(rate);
	});
	test('button should open new transaxtion form', () => {
		const mockOpenTransaction = jest.fn();
		render(
			<Provider store={store}>
				<Converter handleOpen={mockOpenTransaction()} />
			</Provider>
		);

		const Button = screen.getByRole('button');

		fireEvent.click(Button);
		expect(mockOpenTransaction).toHaveBeenCalled();
	});
});
