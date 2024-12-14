import { userDetailsTypes } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

type AuthState = {
	userData: userDetailsTypes | null;
	user_name: string;
	miscellaneous: {
		expandedBranchID: number | null;
	};
};

const initialState: AuthState = {
	userData: null,
	miscellaneous: {
		expandedBranchID: null,
	},
	user_name: '',
};

const authenticationSlice = createSlice({
	name: 'authentication',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<userDetailsTypes>) => {
			state.userData = action.payload;
		},
		clearUserData: (state) => {
			state.userData = null;
		},
		setExpandedBranchID: (state, action: PayloadAction<number | null>) => {
			state.miscellaneous.expandedBranchID = action.payload;
		},
		setUser_name: (state, action: PayloadAction<string>) => {
			state.user_name = action.payload;
		},
		logoutAction: (state) => {
			state.userData = null;
			state.miscellaneous = {
				expandedBranchID: null,
			};
		},
	},
});

export const { setUserData, clearUserData, setExpandedBranchID, logoutAction, setUser_name } =
	authenticationSlice.actions;

export default authenticationSlice.reducer;
