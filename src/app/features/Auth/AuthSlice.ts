import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AuthState } from '../../../interfaces/interfaces';
import { updateUser } from '../../../utils/updateUser';
import { loginUserRequest, signupUserRequest } from '../../../utils/apiCalls';
import { loginExtraReducers, signupExtraReducers } from '../../extraReducers/AuthReducer';
export const loginUser = createAsyncThunk('auth/loginUser', loginUserRequest);
export const signupUser = createAsyncThunk('auth/signupUser', signupUserRequest);

const initialState: AuthState = {
	loginState: true,
	signupState: false,
	status: false,
	isTokenExpired: false,
	message: '',
	login: {
		username: '',
		password: '',
	},
	signup: {
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		role: 'User',
	},
	user: updateUser(),
	tokenExpiryTime: null,
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		toggleLogin: (state) => {
			state.loginState = true;
			state.signupState = false;
		},
		toggleSignup: (state) => {
			state.loginState = false;
			state.signupState = true;
		},
		handleLoginChange: (state, action) => {
			state.login = action.payload;
		},
		handleSignupChange: (state, action) => {
			state.signup = action.payload;
		},
		logoutUser: (state) => {
			state.user = null;
		},
		updateStatus: (state) => {
			state.status = 'idle';
		},
		setTokenExpired: (state) => {
			state.isTokenExpired = true;
			state.tokenExpiryTime = null;
			state.user = null;
		},
		setTokenValid: (state) => {
			state.isTokenExpired = false;
		},
	},
	extraReducers: (builder) => {
		loginExtraReducers(builder, loginUser);
		signupExtraReducers(builder, signupUser);
	},
});

export const {
	toggleLogin,
	toggleSignup,
	handleLoginChange,
	handleSignupChange,
	logoutUser,
	updateStatus,
	setTokenExpired,
	setTokenValid,
} = authSlice.actions;
export default authSlice.reducer;
