/* eslint-disable @typescript-eslint/no-explicit-any */
import axios, { AxiosError } from '../utils/axiosInstance';
import { urls } from '../utils/urls';
import { BookData, LoginState, ReviewData, SignupState } from '../interfaces/interfaces';
import { reviewDataRequest } from './requestData';

export const loginUserRequest = async (
	login: LoginState,
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		if (login.username === '' || login.password === '') {
			return rejectWithValue('Username and password are required');
		}
		const response = await axios.post(urls.login, login);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const signupUserRequest = async (
	signup: SignupState,
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		if (
			signup.username === '' ||
			signup.email === '' ||
			signup.password === '' ||
			signup.confirmPassword === ''
		) {
			return rejectWithValue('All fields are required');
		}
		const response = await axios.post(urls.signup, signup);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const getBooksRequest = async (_: any, { rejectWithValue }: { rejectWithValue: any }) => {
	try {
		const response = await axios.get(urls.getBooks);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const getBookByIdRequest = async (
	id: number,
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		const response = await axios.get(urls.getBookById(id));
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const deleteBookbyIdRequest = async (
	id: number,
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		const response = await axios.delete(urls.deleteBookById(id));
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const createBookRequest = async (
	bookData: BookData,
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		const response = await axios.post(urls.book, bookData);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const editBookRequest = async (
	data: { id: number; bookData: BookData },
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		const response = await axios.put(urls.getBookById(data.id), data.bookData);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const createReviewRequest = async (
	review: ReviewData,
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		const response = await axios.post(urls.review, reviewDataRequest(review));
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};

export const deleteReviewRequest = async (
	id: number,
	{ rejectWithValue }: { rejectWithValue: any }
) => {
	try {
		const response = await axios.delete(`${urls.review}/${id}`);
		return response.data;
	} catch (error) {
		if (error instanceof AxiosError) {
			const axiosError = error as AxiosError;
			return rejectWithValue({
				message: axiosError.message,
				status: axiosError.response?.status,
				statusText: axiosError.response?.statusText,
				data: axiosError.response?.data,
			});
		} else {
			return rejectWithValue(error);
		}
	}
};
