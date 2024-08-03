import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Login } from './components/Login';
import { Homepage } from './components/Homepage';
import { Navbar } from './components/Navbar';
import { Logout } from './components/Logout';
import { Books } from './components/Books/Books';
import { ProtectedRoute } from './components/Auth/ProtectedRoute';
import { BookDetail } from './components/Books/BookDetail';
import { CreatBook } from './components/Books/CreateBook';
import { useEffect } from 'react';
import type { AppDispatch, RootState } from './app/store';
import { useDispatch, useSelector } from 'react-redux';
import { setTokenExpired, setTokenValid } from './app/features/Auth/AuthSlice';
import {
	AlertDialog,
	AlertDialogOverlay,
	AlertDialogContent,
	AlertDialogHeader,
	AlertDialogBody,
	AlertDialogFooter,
	Button,
	useDisclosure,
} from '@chakra-ui/react';
import { removeToken } from './utils/storage';
import { EditBook } from './components/Books/EditBook';

function App() {
	const dispatch = useDispatch<AppDispatch>();
	const isTokenExpired = useSelector((state: RootState) => state.auth.isTokenExpired);
	const tokenExpiryTime = useSelector((state: RootState) => state.auth.tokenExpiryTime);
	const { onClose } = useDisclosure();
	const cancelRef = React.useRef<HTMLButtonElement>(null);

	useEffect(() => {
		if (tokenExpiryTime !== null) {
			const timeId = setTimeout(() => {
				dispatch(setTokenExpired());
			}, tokenExpiryTime);
			return () => clearTimeout(timeId);
		}
	}, [dispatch, tokenExpiryTime]);

	const showExpireNotification = () => {
		if (isTokenExpired) {
			return (
				<AlertDialog
					isCentered
					isOpen={true}
					leastDestructiveRef={cancelRef}
					onClose={onClose}
				>
					<AlertDialogOverlay>
						<AlertDialogContent>
							<AlertDialogHeader fontSize='lg' fontWeight='bold'>
								Session Expired
							</AlertDialogHeader>

							<AlertDialogBody>
								Your session has expired. Please login again.
							</AlertDialogBody>

							<AlertDialogFooter>
								<Button
									colorScheme='red'
									onClick={() => {
										dispatch(setTokenValid());
										removeToken();
									}}
									ml={3}
								>
									login
								</Button>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialogOverlay>
				</AlertDialog>
			);
		}
	};

	return (
		<>
			{showExpireNotification()}
			<Navbar />
			<Routes>
				<Route index path='/login' element={<Login />} />
				<Route
					path='/'
					element={
						<ProtectedRoute>
							<Homepage />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/logout'
					element={
						<ProtectedRoute>
							<Logout />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/books'
					element={
						<ProtectedRoute>
							<Books />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/book/:id/:title'
					element={
						<ProtectedRoute>
							<BookDetail />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/create-book'
					element={
						<ProtectedRoute>
							<CreatBook />
						</ProtectedRoute>
					}
				/>
				<Route
					path='/edit-book/:id'
					element={
						<ProtectedRoute>
							<EditBook />
						</ProtectedRoute>
					}
				/>
			</Routes>
		</>
	);
}

export default App;
