import {
	Button,
	DrawerBody,
	DrawerCloseButton,
	DrawerContent,
	DrawerFooter,
	DrawerHeader,
	DrawerOverlay,
	SimpleGrid,
	Drawer,
	Box,
	Icon,
} from '@chakra-ui/react';
import { FaHome } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export interface DrawerProps {
	isOpen: boolean;
	onClose: () => void;
	btnRef: React.RefObject<HTMLButtonElement>;
}

export const DrawerModal = ({ isOpen, onClose, btnRef }: DrawerProps) => {
	return (
		<>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} finalFocusRef={btnRef}>
				<DrawerOverlay />
				<DrawerContent>
					<DrawerCloseButton />
					<DrawerHeader>
						<Icon as={FaHome} mr={3} />
						Admin Menu
					</DrawerHeader>

					<DrawerBody>
						<SimpleGrid columns={1} spacing={2}>
							<Box p={2} height='40px' bg='yellowgreen' color='white'>
								<Link style={{ width: '100%' }} to='/create-book'>
									Create book
								</Link>
							</Box>
							<Box p={2} height='40px' bg='yellowgreen' color='white'>
								<Link to='/books'>View books</Link>
							</Box>
							<Box p={2} height='40px' bg='yellowgreen' color='white'>
								<Link to='/manage-users'>Manage users</Link>
							</Box>
							<Box p={2} height='40px' bg='yellowgreen' color='white'>
								<Link to='/manage-books'>Manage books</Link>
							</Box>
						</SimpleGrid>
					</DrawerBody>

					<DrawerFooter>
						<Button variant='outline' mr={3} onClick={onClose}>
							Cancel
						</Button>
					</DrawerFooter>
				</DrawerContent>
			</Drawer>
		</>
	);
};
