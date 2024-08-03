/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomError, ReviewState } from '../../interfaces/interfaces';

import { ActionReducerMapBuilder, AsyncThunk } from '@reduxjs/toolkit';

export const createReviewExtraReducers = (
	builder: ActionReducerMapBuilder<ReviewState>,
	createReview: AsyncThunk<any, any, any>
) => {
	builder.addCase(createReview.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(createReview.fulfilled, (state) => {
		state.status = 'success';
		state.message = 'Review created successfully';
		state.reviewData = { comment: '', rating: 0, username: '', bookId: 0 };
	});
	builder.addCase(createReview.rejected, (state, action) => {
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

export const deleteReviewExtraReducers = (
	builder: ActionReducerMapBuilder<ReviewState>,
	deleteReview: AsyncThunk<any, number, any>
) => {
	builder.addCase(deleteReview.pending, (state) => {
		state.status = 'loading';
	});
	builder.addCase(deleteReview.fulfilled, (state) => {
		state.status = 'success';
		state.message = 'Review has been deleted';
	});
	builder.addCase(deleteReview.rejected, (state, action) => {
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
