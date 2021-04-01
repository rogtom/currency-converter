import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import store from './app/store';
import App from './App';

describe('App', () => {
	test('renders App component', () => {
		render(
			<Provider store={store}>
				<App />
			</Provider>
		);
	});
	test('renders app title', () => {
		const { getByText } = render(
			<Provider store={store}>
				<App />
			</Provider>
		);

		expect(getByText(/Currency Converter/i)).toBeInTheDocument();
	});
});
