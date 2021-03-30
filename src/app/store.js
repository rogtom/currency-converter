import { configureStore } from '@reduxjs/toolkit';
import rateReducer from '../features/converterSlice';

export default configureStore({
	reducer: {
		converter: rateReducer,
	},
});
