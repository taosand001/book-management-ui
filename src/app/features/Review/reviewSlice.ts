import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ReviewState } from '../../../interfaces/interfaces';
import { createReviewRequest, deleteReviewRequest } from '../../../utils/apiCalls';
import {
	createReviewExtraReducers,
	deleteReviewExtraReducers,
} from '../../extraReducers/ReviewReducer';

export const createReview = createAsyncThunk('review/createReview', createReviewRequest);
export const deleteReview = createAsyncThunk('review/deleteReview', deleteReviewRequest);

const initialState: ReviewState = {
	status: false,
	reviewData: {
		comment: '',
		rating: 0,
		username: '',
		bookId: 0,
	},
	message: '',
};

export const reviewSlice = createSlice({
	name: 'review',
	initialState,
	reducers: {
		updateStatus: (state) => {
			state.status = 'idle';
		},
		setReviewData: (state, action) => {
			state.reviewData = action.payload;
		},
	},
	extraReducers: (builder) => {
		createReviewExtraReducers(builder, createReview);
		deleteReviewExtraReducers(builder, deleteReview);
	},
});

export const { updateStatus, setReviewData } = reviewSlice.actions;
export default reviewSlice.reducer;
