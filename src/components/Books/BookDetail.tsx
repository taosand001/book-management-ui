/* eslint-disable @typescript-eslint/no-explicit-any */
import {
	Box,
	Center,
	Flex,
	ScaleFade,
	SlideFade,
	Spinner,
	Image,
	Text,
	Heading,
	Divider,
	Badge,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { useParams } from 'react-router-dom';
import type { AppDispatch, RootState } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { fetchBookById } from '../../app/features/book/bookSlice';
import { useEffect } from 'react';
import { Status } from '../../enums/enums';
import { AlertWithStatus } from '../notifications/Alert';
import { Ratings } from '../Ratings';
import { UserReviews } from '../UserReviews';
import { Review } from '../../interfaces/interfaces';
import { CreateReview } from '../Reviews/CreateReview';
import { deleteReview } from '../../app/features/Review/reviewSlice';

export const BookDetail = () => {
	const params = useParams();
	const dispatch = useDispatch<AppDispatch>();
	const book = useSelector((state: RootState) => state.book.book);
	const status = useSelector((state: RootState) => state.book.status);
	const message = useSelector((state: RootState) => state.book.message);
	const user = useSelector((state: RootState) => state.auth.user);
	const { onOpen, isOpen, onClose } = useDisclosure();

	useEffect(() => {
		document.title = 'Book Detail';
		dispatch(fetchBookById(parseInt(params.id ?? '')));
	}, [params.id, dispatch]);

	const showAddCommentButton = () => {
		if (
			book?.reviews &&
			book?.reviews.length > 0 &&
			book?.reviews.find((review) => review.user.username === user?.username)
		) {
			return null;
		} else {
			return (
				<Button onClick={onOpen} colorScheme='blue' size='sm'>
					Add Review
				</Button>
			);
		}
	};

	const handleDeleteComment = (id: number) => {
		dispatch(deleteReview(id));
	};

	if (status === Status.Loading) {
		return (
			<ScaleFade initialScale={0.1} in={true}>
				<Flex align='center' zIndex={999} justify='center' minHeight='80vh'>
					<Center>
						<Spinner
							size='xl'
							thickness='4px'
							speed='0.65s'
							emptyColor='gray.200'
							color='blue.500'
						/>
					</Center>
				</Flex>
			</ScaleFade>
		);
	}

	if (status === Status.Failed) {
		return (
			<ScaleFade initialScale={0.1} in={true}>
				<AlertWithStatus status={status} message={message} />
			</ScaleFade>
		);
	}

	return (
		<SlideFade in={true} offsetY='20px'>
			<Box maxW='800px' mx='auto' p={4}>
				<Flex mb={4}>
					<Image src={book?.cover} alt='Book Cover' boxSize='200px' mr={4} />
					<Box>
						<Heading as='h1' mb={2}>
							{book?.title}
						</Heading>
						<Text fontSize='lg' mb={2}>
							by{' '}
							<Text as='span' fontWeight='bold'>
								{book?.author}
							</Text>
						</Text>
						{book?.genre &&
							book?.genre.map((genre) => {
								return (
									<Badge mr={2} key={genre} colorScheme='teal' mb={2}>
										{genre}
									</Badge>
								);
							})}
						<Text fontSize='lg'>Published: {book?.year}</Text>

						<Text fontSize='sm' color='gray.500'>
							<Ratings rating={book?.rating as number} />
						</Text>
					</Box>
				</Flex>
				<Divider />
				<Box mt={4}>
					<Heading as='h2' size='lg' mb={2}>
						Description
					</Heading>
					<Text fontSize='lg'>{book?.description}</Text>
				</Box>
				<Divider />
				<Box mt={4}>
					<Flex justify='space-between' align='center'>
						<Heading as='h2' size='lg' mb={2}>
							User Comments
						</Heading>
						{showAddCommentButton()}
					</Flex>
				</Box>
				<UserReviews
					user={user}
					handleDeleteComment={handleDeleteComment}
					reviews={book?.reviews as Review[]}
				/>
				<CreateReview bookId={book?.id as number} isOpen={isOpen} onClose={onClose} />
			</Box>
		</SlideFade>
	);
};
