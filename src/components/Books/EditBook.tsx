import {
	FormControl,
	FormLabel,
	Textarea,
	NumberInput,
	NumberInputField,
	NumberInputStepper,
	NumberIncrementStepper,
	NumberDecrementStepper,
	Button,
	Input,
	Box,
	ScaleFade,
	VStack,
	useToast,
} from '@chakra-ui/react';
import { Status, Timeout } from '../../enums/enums';
import { ActionMeta, MultiValue, Select } from 'chakra-react-select';
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from '../../app/store';
import { editBook, fetchBookById, setBookData } from '../../app/features/book/bookSlice';
import { Book, GenreData } from '../../interfaces/interfaces';
import { genres } from '../../utils/genres';
import { validateBook } from '../../utils/validations';
import { useEffect } from 'react';
import { AlertWithStatus } from '../notifications/Alert';
import { useNavigate, useParams } from 'react-router-dom';

export interface EditBookProps {
	book: Book;
}

export const EditBook = () => {
	const dispatch = useDispatch<AppDispatch>();
	const status = useSelector((state: RootState) => state.book.status);
	const message = useSelector((state: RootState) => state.book.message);
	const bookData = useSelector((state: RootState) => state.book.bookData);
	const book = useSelector((state: RootState) => state.book.book);
	const params = useParams();
	const navigate = useNavigate();
	const toast = useToast();

	useEffect(() => {
		const id = parseInt(params.id ?? '');
		if (!isNaN(id)) {
			dispatch(fetchBookById(id)).then(() => {
				if (book) {
					dispatch(setBookData(book));
				}
			});
		}
	}, [dispatch, params.id]);

	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>
	) => {
		const { name, value } = e.target;
		dispatch(
			setBookData({
				...bookData,
				[name]: value,
			})
		);
	};

	const handleRatingChange = (value: number) => {
		dispatch(setBookData({ ...bookData, rating: value }));
	};

	const handleGenreChange = (
		newValue: MultiValue<GenreData>,
		actionMeta: ActionMeta<GenreData>
	) => {
		const genre = [...bookData.genre];
		if (actionMeta.action === 'select-option') {
			genre.push(newValue[newValue.length - 1].value);
		}
		if (actionMeta.action === 'remove-value') {
			genre.splice(genre.indexOf(newValue[newValue.length - 1].value), 1);
		}
		if (actionMeta.action === 'clear') {
			genre.splice(0, genre.length);
		}
		dispatch(setBookData({ ...bookData, genre }));
	};

	const handleEditBook = () => {
		dispatch(editBook({ id: parseInt(params.id ?? ''), bookData: bookData })).then(() => {
			toast({
				title: 'Book updated successfully',
				status: 'success',
				duration: Timeout.Medium,
				isClosable: true,
			});
			navigate('/books');
		});
	};

	return (
		<>
			<Box maxW='600px' mx='auto' mt={8}>
				<ScaleFade
					style={{ padding: '10px' }}
					hidden={status !== Status.Failed}
					initialScale={0.1}
					in={true}
				>
					<AlertWithStatus status={status} message={message} />
				</ScaleFade>
				<VStack spacing={4}>
					<FormControl id='title'>
						<FormLabel>Title</FormLabel>
						<Input
							name='title'
							onChange={handleChange}
							value={bookData.title}
							type='text'
						/>
					</FormControl>
					<FormControl id='author'>
						<FormLabel>Author</FormLabel>
						<Input
							onChange={handleChange}
							name='author'
							value={bookData.author}
							type='text'
						/>
					</FormControl>
					<FormControl id='genres'>
						<FormLabel>Genres</FormLabel>
						<Select
							onChange={handleGenreChange}
							isMulti
							focusBorderColor='blue.500'
							size='md'
							selectedOptionStyle='check'
							options={[...genres]}
						/>
					</FormControl>
					<FormControl id='rating'>
						<FormLabel>Rating</FormLabel>
						<NumberInput
							name='rating'
							value={bookData.rating}
							onChange={(_valueAsString, valueAsNumber) =>
								handleRatingChange(valueAsNumber)
							}
							defaultValue={0}
							min={0}
							max={5}
							allowMouseWheel
						>
							<NumberInputField />
							<NumberInputStepper>
								<NumberIncrementStepper />
								<NumberDecrementStepper />
							</NumberInputStepper>
						</NumberInput>
					</FormControl>
					<FormControl id='year'>
						<FormLabel>Year</FormLabel>
						<Input
							onChange={handleChange}
							name='year'
							value={bookData.year}
							type='number'
						/>
					</FormControl>
					<FormControl id='cover'>
						<FormLabel>Cover</FormLabel>
						<Input
							onChange={handleChange}
							name='cover'
							value={bookData.cover}
							type='text'
						/>
					</FormControl>
					<FormControl id='description'>
						<FormLabel>Description</FormLabel>
						<Textarea
							onChange={handleChange}
							name='description'
							value={bookData.description}
						/>
					</FormControl>
					<Button
						isLoading={status === Status.Loading}
						isDisabled={validateBook(bookData)}
						colorScheme='teal'
						onClick={handleEditBook}
					>
						update book
					</Button>
				</VStack>
			</Box>
		</>
	);
};
