import { EditIcon, DeleteIcon } from '@chakra-ui/icons';
import { Flex, Button, Box, Text, Image, Spacer } from '@chakra-ui/react';
import { Review, User } from '../../interfaces/interfaces';
import { Role } from '../../enums/enums';
import { Ratings } from '../Ratings';
import { useNavigate } from 'react-router-dom';

export interface BookCardProps {
	title: string;
	coverPage: string;
	author: string;
	onEdit: () => void;
	onDelete: (id: number) => void;
	reviews: Review[];
	user: User;
	id: number;
	rating: number;
}

export const BookCard = ({
	title,
	coverPage,
	author,
	onEdit,
	onDelete,
	user,
	id,
	rating,
}: BookCardProps) => {
	const navigate = useNavigate();

	const handleBookClick = () => {
		navigate(`/book/${id}/${title}`);
	};
	return (
		<Box
			cursor='pointer'
			key={title}
			borderWidth='1px'
			borderRadius='lg'
			overflow='hidden'
			boxShadow='md'
			bg='white'
			p={4}
			mb={4}
		>
			<Image
				width={400}
				height={400}
				objectFit='cover'
				cursor='pointer'
				onClick={handleBookClick}
				src={coverPage}
				alt={title}
			/>
			<Flex direction='column' mt={4}>
				<Text fontWeight='bold'>{title}</Text>
				<Text>{author}</Text>
				<Flex align='center'>
					<Text fontSize='sm' color='gray.500'>
						<Ratings rating={rating} />
					</Text>
					{user.role === Role.Admin && (
						<>
							<Spacer />
							<Button
								size='sm'
								variant='ghost'
								colorScheme='blue'
								onClick={onEdit}
								mr={2}
							>
								<EditIcon />
							</Button>
							<Button
								size='sm'
								variant='ghost'
								colorScheme='red'
								onClick={() => onDelete(id)}
							>
								<DeleteIcon />
							</Button>
						</>
					)}
				</Flex>
			</Flex>
		</Box>
	);
};
