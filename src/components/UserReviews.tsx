import { Review, User } from '../interfaces/interfaces';
import { Box, Button, Text } from '@chakra-ui/react';
import { Ratings } from './Ratings';
import { Role } from '../enums/enums';
import { DeleteIcon } from '@chakra-ui/icons';

export interface UserReviewsProps {
	reviews: Review[];
	handleDeleteComment: (id: number) => void;
	user: User | null;
}

export const UserReviews = ({ reviews, user, handleDeleteComment }: UserReviewsProps) => {
	const showDeleteCommentButton = (id: number) => {
		if (user?.role === Role.Admin) {
			return (
				<Box
					onClick={() => handleDeleteComment(id)}
					cursor='pointer'
					backgroundColor='red'
					height={'150px'}
					width={'30px'}
					position='absolute'
					display='flex'
					alignItems='center'
					top={0}
					right={0}
				>
					<Button size='sm' variant='white' colorScheme='red'>
						<DeleteIcon color='white' />
					</Button>
				</Box>
			);
		}
	};

	return (
		<>
			{reviews &&
				reviews.length > 0 &&
				reviews.map((review: Review) => {
					return (
						<Box
							position={'relative'}
							key={review.id}
							borderWidth='1px'
							borderRadius='lg'
							overflow='hidden'
							boxShadow='md'
							p={4}
							mb={4}
						>
							<Text fontSize='lg' mb={2}>
								{review.comment}
							</Text>
							<Text fontSize='lg' mb={2}>
								<Ratings rating={review.rating} />
							</Text>
							<Text fontSize='lg' color='gray.500'>
								- {review.user.username}
							</Text>
							{showDeleteCommentButton(review.id)}
						</Box>
					);
				})}
		</>
	);
};
