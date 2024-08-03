/* eslint-disable @typescript-eslint/no-explicit-any */
import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import { AuthState, CustomError, User } from '../../interfaces/interfaces';
import { jwtDecode } from 'jwt-decode';
import { setToken } from '../../utils/storage';
import { calculateMillisecondsUntilExpiry } from '../../utils/calculateExpiryTime';

export const loginExtraReducers = (
	builder: ActionReducerMapBuilder<AuthState>,
	loginUser: AsyncThunk<any, any, any>
) => {
	builder.addCase(loginUser.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(loginUser.fulfilled, (state, action) => {
		state.status = 'success';
		const token = jwtDecode(action.payload) as any;
		state.user = {} as User;
		state.user.email = token[
			'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
		] as string;
		state.user.username = token[
			'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
		] as string;
		state.user.role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as
			| 'User'
			| 'Admin';
		state.user.exp = token.exp as number;
		state.tokenExpiryTime = calculateMillisecondsUntilExpiry(token.exp as number);
		setToken(action.payload);
		state.message = 'Login successful';
		state.login = { username: '', password: '' };
	});
	builder.addCase(loginUser.rejected, (state, action) => {
		state.status = 'failed';
		if ((action.payload as CustomError).status === 401) {
			state.message = (action.payload as CustomError).data as string;
		} else if ((action.payload as CustomError).status === 409) {
			state.message = (action.payload as CustomError).data as string;
		} else {
			state.message = (action.payload as Error).message || '';
		}
	});
};

export const signupExtraReducers = (
	builder: ActionReducerMapBuilder<AuthState>,
	signupUser: AsyncThunk<any, any, any>
) => {
	builder.addCase(signupUser.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(signupUser.fulfilled, (state, action) => {
		state.status = 'success';
		const token = jwtDecode(action.payload.token) as any;
		state.user = {} as User;
		state.user.email = token[
			'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
		] as string;
		state.user.username = token[
			'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
		] as string;
		state.user.role = token['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as
			| 'User'
			| 'Admin';
		state.user.exp = token.exp as number;
		state.tokenExpiryTime = calculateMillisecondsUntilExpiry(token.exp as number);
		setToken(action.payload.token);
		state.message = action.payload.message;
		state.signup = { username: '', email: '', password: '', confirmPassword: '', role: 'User' };
	});
	builder.addCase(signupUser.rejected, (state, action) => {
		state.status = 'failed';
		if ((action.payload as CustomError).status === 401) {
			state.message = (action.payload as CustomError).data as string;
		} else if ((action.payload as CustomError).status === 409) {
			state.message = (action.payload as CustomError).data as string;
		} else {
			state.message = (action.payload as Error).message || '';
		}
	});
};
