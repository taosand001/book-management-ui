import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/Auth/AuthSlice';
import bookReducer from './features/book/bookSlice';
import reviewReducer from './features/Review/reviewSlice';

export const store = configureStore({
	reducer: {
		auth: authReducer,
		book: bookReducer,
		review: reviewReducer,
	},
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
