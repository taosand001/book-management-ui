import {
	ScaleFade,
	Center,
	Spinner,
	Flex,
	Box,
	Grid,
	GridItem,
	useDisclosure,
	useToast,
} from '@chakra-ui/react';
import { useEffect } from 'react';
import type { RootState, AppDispatch } from '../../app/store';
import { useSelector, useDispatch } from 'react-redux';
import { deleteBookById, fetchBooks } from '../../app/features/book/bookSlice';
import { Role, Status } from '../../enums/enums';
import { BookCard } from './BookCard';
import { Book, User } from '../../interfaces/interfaces';
import React from 'react';
import { DrawerModal } from '../DrawerModal';
import { StatusFeedBack } from '../StatusFeedBack';
import { useNavigate } from 'react-router-dom';

export const Books = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const navigate = useNavigate();
	const dispatch = useDispatch<AppDispatch>();
	const books = useSelector((state: RootState) => state.book.books);
	const user = useSelector((state: RootState) => state.auth.user);
	const status = useSelector((state: RootState) => state.book.status);
	const message = useSelector((state: RootState) => state.book.message);
	const btnRef = React.useRef<HTMLButtonElement>(null);
	const toast = useToast();

	useEffect(() => {
		document.title = 'Books';
		dispatch(fetchBooks(null));
	}, [dispatch]);

	if (status === Status.Loading) {
		return (
			<ScaleFade initialScale={0.1} in={true}>
				<Flex align='center' justify='center' minHeight='80vh'>
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

	const handleDeleteBook = (id: number) => {
		dispatch(deleteBookById(id)).then(() => {
			toast({
				title: 'Book deleted',
				description: 'Book has been deleted successfully',
				status: 'success',
				duration: 5000,
				isClosable: true,
			});
			dispatch(fetchBooks(null));
		});
	};

	const showAdminPanel = () => {
		if (user?.role === Role.Admin) {
			return (
				<Box
					onClick={onOpen}
					borderWidth='1px'
					height={20}
					width={20}
					borderRadius='50%'
					overflow='hidden'
					boxShadow='lg'
					position='fixed'
					display='flex'
					alignItems='center'
					justifyContent={'center'}
					fontSize={12}
					flexDirection={'column'}
					bg='green.500'
					cursor={'pointer'}
					textAlign={'center'}
					fontWeight={'bold'}
					color='white'
					bottom='10px'
					right='10px'
				>
					Open Admin panel
				</Box>
			);
		}
	};

	return (
		<ScaleFade initialScale={0.1} in={true}>
			<StatusFeedBack status={status} message={message} />
			<Box position='relative'>
				<Grid p={4} templateColumns='repeat(auto-fill, minmax(350px, 1fr))' gap={4}>
					{books.map((book: Book) => (
						<GridItem key={book.id}>
							<BookCard
								id={book.id}
								title={book.title}
								coverPage={book.cover}
								author={book.author}
								onEdit={() => navigate(`/edit-book/${book.id}`)}
								onDelete={handleDeleteBook}
								reviews={book.reviews}
								rating={book.rating}
								user={user as User}
							/>
						</GridItem>
					))}
				</Grid>
				{showAdminPanel()}
				<DrawerModal isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
			</Box>
		</ScaleFade>
	);
};
