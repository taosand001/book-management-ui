import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../../app/features/Auth/AuthSlice';
import bookReducer from '../../app/features/book/bookSlice';
import reviewReducer from '../../app/features/Review/reviewSlice';

export const testStore = configureStore({
	reducer: {
		auth: authReducer,
		book: bookReducer,
		review: reviewReducer,
	},
});
