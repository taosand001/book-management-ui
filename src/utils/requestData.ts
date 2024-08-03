import { ReviewData, ReviewRequestData } from '../interfaces/interfaces';

export const reviewDataRequest = (review: ReviewData): ReviewRequestData => {
	return {
		bookId: review.bookId,
		rating: review.rating,
		comment: review.comment,
		user: {
			username: review.username,
		},
	};
};
