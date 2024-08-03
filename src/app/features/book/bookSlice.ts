import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book, BookData, BookState } from '../../../interfaces/interfaces';
import {
	createBookRequest,
	deleteBookbyIdRequest,
	editBookRequest,
	getBookByIdRequest,
	getBooksRequest,
} from '../../../utils/apiCalls';
import {
	createBookExtraReducers,
	deleteBookByIdExtraReducers,
	editBookExtraReducers,
	fetchBookByIdExtraReducers,
	fetchBookExtraReducers,
} from '../../extraReducers/BookReducer';

export const fetchBooks = createAsyncThunk('book/fetchBooks', getBooksRequest);
export const fetchBookById = createAsyncThunk('book/fetchBookById', getBookByIdRequest);
export const deleteBookById = createAsyncThunk('book/deleteBookById', deleteBookbyIdRequest);
export const createBook = createAsyncThunk('book/createBook', createBookRequest);
export const editBook = createAsyncThunk('book/editBook', editBookRequest);

const initialState: BookState = {
	books: [],
	status: false,
	book: null,
	message: '',
	bookData: {
		title: '',
		author: '',
		cover: '',
		rating: 0,
		genre: [],
		year: Number(0),
		description: '',
	},
	isEditModelOpen: false,
	bookId: 0,
};

export const bookSlice = createSlice({
	name: 'book',
	initialState,
	reducers: {
		addBook: (state, action: PayloadAction<Book>) => {
			state.books.push(action.payload);
		},
		removeBook: (state, action: PayloadAction<number>) => {
			state.books = state.books.filter((book) => book.id !== action.payload);
		},
		updateBook: (state, action: PayloadAction<Book>) => {
			const index = state.books.findIndex((book) => book.id === action.payload.id);
			state.books[index] = action.payload;
		},
		updateStatus: (state) => {
			state.status = 'idle';
		},
		setBookData: (state, action: PayloadAction<BookData>) => {
			state.bookData = action.payload;
		},
		setEditModelOpen: (state, action: PayloadAction<number>) => {
			state.isEditModelOpen = true;
			state.bookId = action.payload;
		},
		setEditModelClose: (state) => {
			state.isEditModelOpen = false;
		},
	},
	extraReducers: (builder) => {
		fetchBookExtraReducers(builder, fetchBooks);
		fetchBookByIdExtraReducers(builder, fetchBookById);
		createBookExtraReducers(builder, createBook);
		deleteBookByIdExtraReducers(builder, deleteBookById);
		editBookExtraReducers(builder, editBook);
	},
});

export const {
	addBook,
	removeBook,
	updateBook,
	updateStatus,
	setBookData,
	setEditModelClose,
	setEditModelOpen,
} = bookSlice.actions;
export default bookSlice.reducer;
