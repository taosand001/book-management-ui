/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalCloseButton,
	ModalBody,
	FormControl,
	FormLabel,
	ModalFooter,
	Button,
	Textarea,
	NumberInput,
	NumberInputField,
	NumberDecrementStepper,
	NumberIncrementStepper,
	NumberInputStepper,
	ScaleFade,
	useToast,
} from '@chakra-ui/react';
import type { RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { setReviewData, createReview, updateStatus } from '../../app/features/Review/reviewSlice';
import { fetchBookById } from '../../app/features/book/bookSlice';
import { Status, Timeout } from '../../enums/enums';
import { AlertWithStatus } from '../notifications/Alert';
import { Dispatch } from '@reduxjs/toolkit';
import { useEffect } from 'react';

export interface CreateReviewProps {
	isOpen: boolean;
	onClose: () => void;
	bookId: number;
}

export const CreateReview = ({ isOpen, onClose, bookId }: CreateReviewProps) => {
	const dispatch: Dispatch<any> = useDispatch();
	const review = useSelector((state: RootState) => state.review.reviewData);
	const status = useSelector((state: RootState) => state.review.status);
	const message = useSelector((state: RootState) => state.review.message);
	const user = useSelector((state: RootState) => state.auth.user);
	const toast = useToast();

	useEffect(() => {
		if (status === Status.Success) {
			const id = 'test-toast';
			if (!toast.isActive(id)) {
				toast({
					id,
					title: 'Review Added',
					description: message,
					status: 'success',
					duration: Timeout.Medium,
					isClosable: true,
				});
				onClose();
				setTimeout(() => {
					dispatch(fetchBookById(bookId));
				}, 2000);
			}
			dispatch(updateStatus());
		}
	}, [dispatch, status, message, toast, onClose, bookId]);

	const handleReviewCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		dispatch(
			setReviewData({
				...review,
				comment: e.target.value,
				bookId: bookId,
				username: user?.username,
			})
		);
	};

	const handleSubmitReview = () => {
		dispatch(createReview(review));
	};

	if (status === Status.Failed) {
		return (
			<ScaleFade initialScale={0.1} in={true}>
				<AlertWithStatus status={status} message={message} />
			</ScaleFade>
		);
	}

	return (
		<>
			<Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose} isCentered>
				<ModalOverlay />
				<ModalContent>
					<ModalHeader>Add Your Review</ModalHeader>
					<ModalCloseButton />
					<ModalBody pb={6}>
						<FormControl>
							<FormLabel>Review Comment</FormLabel>
							<Textarea
								onChange={handleReviewCommentChange}
								name='comment'
								value={review.comment}
								placeholder='Write your feedback'
							/>
						</FormControl>

						<FormControl mt={4}>
							<FormLabel>Your Rating(From 1 - 5)</FormLabel>
							<NumberInput
								onChange={(_valueAsString: string, valueAsNumber: number) =>
									dispatch(setReviewData({ ...review, rating: valueAsNumber }))
								}
								name='rating'
								value={review.rating}
								defaultValue={1}
								min={1}
								max={5}
							>
								<NumberInputField />
								<NumberInputStepper>
									<NumberIncrementStepper />
									<NumberDecrementStepper />
								</NumberInputStepper>
							</NumberInput>
						</FormControl>
					</ModalBody>

					<ModalFooter>
						<Button
							isDisabled={review.comment === '' || review.rating === 0}
							isLoading={status === Status.Loading}
							onClick={handleSubmitReview}
							colorScheme='blue'
							mr={3}
						>
							Add Review
						</Button>
						<Button onClick={onClose}>Cancel</Button>
					</ModalFooter>
				</ModalContent>
			</Modal>
		</>
	);
};
