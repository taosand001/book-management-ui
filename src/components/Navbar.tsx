import { Flex, Box, Text, Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { ChevronRightIcon } from '@chakra-ui/icons';
import type { RootState } from '../app/store';
import { useSelector } from 'react-redux';

export const Navbar = () => {
	const user = useSelector((state: RootState) => state.auth.user);
	return (
		<Box bg='green.500' py={4}>
			<Flex justifyContent='space-between' alignItems='center' px={8} maxW='1200px' mx='auto'>
				{/* Logo */}
				<Link to='/' color='white'>
					<Image
						width={10}
						height={10}
						src='https://bingw.jasonzeng.dev/?index=random'
						alt='Logo'
					/>
				</Link>

				{user && (
					<Flex align='center'>
						<Link to='/' color='white' style={{ marginRight: '2px', color: 'white' }}>
							Home
						</Link>
						<ChevronRightIcon color='white' />
						<Link to='/books' style={{ color: 'white' }}>
							Books
						</Link>
						<ChevronRightIcon color='white' />
						<Text color='white' fontWeight='bold'>
							Current Page
						</Text>
					</Flex>
				)}
				{/* Links */}
				{!user && (
					<Flex>
						<Link
							to='/login'
							color='white'
							style={{ marginRight: '8px', color: 'white' }}
						>
							Login
						</Link>
						<Link to='/signup' style={{ color: 'white' }}>
							Sign Up
						</Link>
					</Flex>
				)}
				{user && (
					<Flex>
						<Text color='white' fontWeight='bold' mr={10}>
							hello, {user.username}
						</Text>
						<Link to='/logout' style={{ color: 'white', marginRight: '15px' }}>
							Logout
						</Link>
					</Flex>
				)}
			</Flex>
		</Box>
	);
};
