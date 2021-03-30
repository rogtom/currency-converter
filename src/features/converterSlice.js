import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	rate: '',
	transactionList: [],
};

const converterSlice = createSlice({
	name: 'converter',
	initialState,
	reducers: {
		saveRate: (state, action) => {
			state.rate = action.payload;
		},
		saveTransaction: (state, action) => {
			state.transactionList.push(action.payload);
		},
	},
});

export const { saveRate, saveTransaction } = converterSlice.actions;
export default converterSlice.reducer;
