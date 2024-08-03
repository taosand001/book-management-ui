import React from 'react';
import { Flex, Heading, Button, Text, useDisclosure } from '@chakra-ui/react';
import { DrawerModal } from './DrawerModal';
import type { RootState } from '../app/store';
import { useSelector } from 'react-redux';
import { Role } from '../enums/enums';
import { Link } from 'react-router-dom';

export const Homepage = () => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const user = useSelector((state: RootState) => state.auth.user);
	const btnRef = React.useRef<HTMLButtonElement>(null);

	const showButton = () => {
		if (user?.role === Role.Admin) {
			return (
				<Button ref={btnRef} colorScheme='teal' onClick={onOpen} size='lg' mt={4}>
					Open Admin Menu
				</Button>
			);
		} else {
			return (
				<Button colorScheme='teal' size='lg' mt={4}>
					<Link to='/books'>Access Book resources</Link>
				</Button>
			);
		}
	};

	return (
		<Flex
			backgroundImage="url('https://bingw.jasonzeng.dev/?index=random')"
			backgroundSize='cover'
			backgroundPosition='center'
			height='100vh'
			alignItems='center'
			justifyContent='center'
			color='white'
			textAlign='center'
			flexDirection='column'
		>
			<Heading as='h1' size='2xl' mb={4}>
				Welcome to Book Management UI
			</Heading>
			<Text fontSize='xl' mb={8}>
				Manage your books with ease
			</Text>
			{showButton()}
			<DrawerModal isOpen={isOpen} onClose={onClose} btnRef={btnRef} />
		</Flex>
	);
};
