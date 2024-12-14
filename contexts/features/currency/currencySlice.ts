import { createSlice } from '@reduxjs/toolkit';
import currencyReducer from '../currency/currencySlice';

interface CurrencyState {
	convert: boolean;
}

const initialState: CurrencyState = {
	convert: false, // default state (can be true/false based on your app's needs)
};

const currencySlice = createSlice({
	name: 'currency',
	initialState,
	reducers: {
		toggleConvert: (state) => {
			state.convert = !state.convert;
		},
		setConvert: (state, action) => {
			state.convert = action.payload;
		},
	},
});

export const { toggleConvert, setConvert } = currencySlice.actions;
export default currencySlice.reducer; // Export only the reducer
