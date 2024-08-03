import { useDispatch, useSelector } from 'react-redux';
import React, { useState } from 'react';
import {
	handleLoginChange,
	loginUser,
	updateStatus,
	handleSignupChange,
	signupUser,
} from '../app/features/Auth/AuthSlice';
import type { RootState } from '../app/store';
import {
	Tab,
	TabList,
	TabPanel,
	TabPanels,
	Tabs,
	Flex,
	Box,
	Button,
	FormControl,
	FormLabel,
	Heading,
	Input,
	Fade,
} from '@chakra-ui/react';
import { UnknownAction } from '@reduxjs/toolkit';
import { LoginState, SignupState } from '../interfaces/interfaces';
import { AlertWithStatus } from './notifications/Alert';
import { useNavigate } from 'react-router-dom';
import { Status, Timeout } from '../enums/enums';
import { validateLogin, validateSignup } from '../utils/validations';

export const Login = () => {
	document.title = 'Login';
	const [passwordError, setPasswordError] = useState<string | null>(null);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const login = useSelector((state: RootState) => state.auth.login);
	const register = useSelector((state: RootState) => state.auth.signup);
	const status = useSelector((state: RootState) => state.auth.status);
	const message = useSelector((state: RootState) => state.auth.message);

	const handleLogin = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newLogin = { ...login } as LoginState;
		newLogin[name as keyof LoginState] = value;
		dispatch(handleLoginChange(newLogin));
	};

	const handleRegister = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		const newRegister = { ...register } as SignupState;
		newRegister[name as keyof SignupState] = value as 'User' | 'Admin';
		if (name === 'confirmPassword' && value !== register.password) {
			setPasswordError('Passwords do not match');
		} else {
			setPasswordError(null);
		}
		dispatch(handleSignupChange(newRegister));
	};

	const submitLogin = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(loginUser(login) as unknown as UnknownAction);
	};

	const submitRegister = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		dispatch(signupUser(register) as unknown as UnknownAction);
	};

	if (status === Status.Success) {
		setTimeout(() => {
			navigate('/');
			dispatch(updateStatus());
		}, Timeout.Short);
	}

	return (
		<Flex minHeight='100vh' w='100vw' alignItems='center' justifyContent='center'>
			<Box p={8} w='500px' borderWidth={1} borderRadius={8} boxShadow='lg'>
				<Tabs onChange={() => dispatch(updateStatus())} variant='unstyled'>
					<TabList>
						<Tab _selected={{ color: 'white', bg: 'blue.500' }}>Login</Tab>
						<Tab _selected={{ color: 'white', bg: 'green.400' }}>Sign Up</Tab>
					</TabList>
					<TabPanels>
						<TabPanel>
							<AlertWithStatus status={status} message={message} />
							<Fade in={true}>
								<Box my={4} textAlign='left'>
									<Heading>Login</Heading>
								</Box>
								<form onSubmit={submitLogin}>
									<FormControl>
										<FormLabel>Username</FormLabel>
										<Input
											name='username'
											onChange={handleLogin}
											value={login.username}
											type='text'
											placeholder='Username'
										/>
									</FormControl>
									<FormControl mt={4}>
										<FormLabel>Password</FormLabel>
										<Input
											name='password'
											onChange={handleLogin}
											value={login.password}
											type='password'
											placeholder='Enter your password'
										/>
									</FormControl>
									<Button
										isDisabled={validateLogin(login)}
										isLoading={status === 'loading'}
										spinnerPlacement='start'
										width={'full'}
										mt={4}
										colorScheme='blue'
										type='submit'
									>
										Sign In
									</Button>
								</form>
							</Fade>
						</TabPanel>
						<TabPanel>
							<AlertWithStatus status={status} message={message} />
							<Fade in={true}>
								<Box my={4} textAlign='left'>
									<Heading>Sign Up</Heading>
								</Box>
								<form onSubmit={submitRegister}>
									<FormControl>
										<FormLabel>Username</FormLabel>
										<Input
											name='username'
											value={register.username}
											onChange={handleRegister}
											type='text'
											placeholder='Username'
										/>
									</FormControl>
									<FormControl mt={4}>
										<FormLabel>Email</FormLabel>
										<Input
											name='email'
											value={register.email}
											onChange={handleRegister}
											type='email'
											placeholder='Email'
										/>
									</FormControl>
									<FormControl mt={4}>
										<FormLabel>Password</FormLabel>
										<Input
											name='password'
											value={register.password}
											onChange={handleRegister}
											type='password'
											placeholder='Enter your password'
										/>
									</FormControl>
									<FormControl mt={4}>
										<FormLabel>Confirm Password</FormLabel>
										<Input
											isInvalid={passwordError !== null}
											name='confirmPassword'
											value={register.confirmPassword}
											onChange={handleRegister}
											type='password'
											placeholder='Confirm your password'
										/>
									</FormControl>
									<Button
										isLoading={status === Status.Loading}
										spinnerPlacement='start'
										isDisabled={validateSignup(register)}
										width={'full'}
										colorScheme='green'
										mt={4}
										type='submit'
									>
										Register
									</Button>
								</form>
							</Fade>
						</TabPanel>
					</TabPanels>
				</Tabs>
			</Box>
		</Flex>
	);
};
