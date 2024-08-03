/* eslint-disable @typescript-eslint/no-explicit-any */

import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';
import { BookData, BookState, CustomError } from '../../interfaces/interfaces';

export const fetchBookExtraReducers = (
	builder: ActionReducerMapBuilder<BookState>,
	fetchBooks: AsyncThunk<any, any, any>
) => {
	builder.addCase(fetchBooks.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(fetchBooks.fulfilled, (state, action) => {
		state.status = 'idle';
		state.message = '';
		state.books = action.payload;
	});
	builder.addCase(fetchBooks.rejected, (state, action) => {
		state.status = 'failed';
		if ((action.payload as CustomError).status === 401) {
			state.message = 'There is an error in the request(Unauthorized)';
		} else if ((action.payload as CustomError).status === 400) {
			state.message = (action.payload as CustomError).message as string;
		} else {
			state.message = (action.payload as Error).message || '';
		}
	});
};

export const fetchBookByIdExtraReducers = (
	builder: ActionReducerMapBuilder<BookState>,
	fetchBookById: AsyncThunk<any, any, any>
) => {
	builder.addCase(fetchBookById.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(fetchBookById.fulfilled, (state, action) => {
		state.status = 'idle';
		state.message = '';
		state.book = action.payload;
	});
	builder.addCase(fetchBookById.rejected, (state, action) => {
		state.status = 'failed';
		if ((action.payload as CustomError).status === 401) {
			state.message = 'There is an error in the request(Unauthorized)';
		} else if ((action.payload as CustomError).status === 400) {
			state.message = (action.payload as CustomError).message as string;
		} else if ((action.payload as CustomError).status === 404) {
			state.message = (action.payload as CustomError).data as string;
		} else {
			state.message = (action.payload as Error).message || '';
		}
	});
};

export const deleteBookByIdExtraReducers = (
	builder: ActionReducerMapBuilder<BookState>,
	deleteBookById: AsyncThunk<any, any, any>
) => {
	builder.addCase(deleteBookById.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(deleteBookById.fulfilled, (state) => {
		state.status = 'success';
		state.message = 'Book has been deleted successfully';
	});
	builder.addCase(deleteBookById.rejected, (state, action) => {
		state.status = 'failed';
		if ((action.payload as CustomError).status === 401) {
			state.message = 'There is an error in the request(Unauthorized)';
		} else if ((action.payload as CustomError).status === 400) {
			state.message = (action.payload as CustomError).message as string;
		} else if ((action.payload as CustomError).status === 404) {
			state.message = (action.payload as CustomError).data as string;
		} else {
			state.message = (action.payload as Error).message || '';
		}
	});
};

export const editBookExtraReducers = (
	builder: ActionReducerMapBuilder<BookState>,
	editBook: AsyncThunk<any, any, any>
) => {
	builder.addCase(editBook.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(editBook.fulfilled, (state) => {
		state.status = 'success';
		state.message = 'Book has been updated successfully';
	});
	builder.addCase(editBook.rejected, (state, action) => {
		state.status = 'failed';
		if ((action.payload as CustomError).status === 401) {
			state.message = 'There is an error in the request(Unauthorized)';
		} else if ((action.payload as CustomError).status === 400) {
			state.message = (action.payload as CustomError).message as string;
		} else if ((action.payload as CustomError).status === 404) {
			state.message = (action.payload as CustomError).data as string;
		} else {
			state.message = (action.payload as Error).message || '';
		}
	});
};

export const createBookExtraReducers = (
	builder: ActionReducerMapBuilder<BookState>,
	createBook: AsyncThunk<any, BookData, any>
) => {
	builder.addCase(createBook.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(createBook.fulfilled, (state, action) => {
		state.status = 'success';
		state.message = '';
		state.book = action.payload;
		state.bookData = {
			title: '',
			author: '',
			description: '',
			cover: '',
			year: 0,
			rating: 0,
			genre: [],
		};
	});
	builder.addCase(createBook.rejected, (state, action) => {
		state.status = 'failed';
		if ((action.payload as CustomError).status === 401) {
			state.message = 'There is an error in the request(Unauthorized)';
		} else if ((action.payload as CustomError).status === 400) {
			state.message = (action.payload as CustomError).message as string;
		} else if ((action.payload as CustomError).status === 404) {
			state.message = (action.payload as CustomError).data as string;
		} else if ((action.payload as CustomError).status === 500) {
			state.message = 'Internal Server Error';
		} else {
			state.message = (action.payload as Error).message || '';
		}
	});
};
