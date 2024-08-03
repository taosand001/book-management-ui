/* eslint-disable @typescript-eslint/no-explicit-any */
import App from '../App';
import '@testing-library/jest-dom/vitest';
import { render, screen, fireEvent, waitFor, cleanup } from './utils/testUtil';
import { test, expect, describe, beforeEach, vi, afterEach } from 'vitest';
import { loginUserRequest } from '../utils/apiCalls';

vi.mock('../utils/apiCalls');

test('renders the homepage', () => {
	render(<App />);

	expect(screen.getAllByText(/Login/i)[0]).toBeInTheDocument();
});

describe('Display the Admin Page', () => {
	beforeEach(() => {
		vi.mocked(loginUserRequest).mockResolvedValue('testToken');
		vi.mock('jwt-decode', () => ({
			jwtDecode: () => ({
				'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'ejslallslss',
				'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'ejlalal',
				'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Admin',
				exp: 2722720325606,
			}),
		}));
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.resetAllMocks();
		vi.resetModules();
		cleanup();
	});

	test('Go through steps to admin page', async () => {
		render(<App />);

		fireEvent.change(screen.getAllByPlaceholderText('Username')[0], {
			target: { value: 'valid' },
		});

		fireEvent.change(screen.getAllByPlaceholderText('Enter your password')[0], {
			target: { value: 'valid' },
		});

		fireEvent.click(screen.getByText('Sign In'));

		await waitFor(() => {
			expect(screen.getAllByText(/Login Successful/i)[0]).toBeInTheDocument();
		});

		render(<App />);

		await waitFor(
			() => {
				expect(screen.getByText(/Open Admin Menu/i)).toBeInTheDocument();
			},
			{ timeout: 10000 }
		);
	});
});

describe('Try to login with invalid credentials', () => {
	beforeEach(() => {
		vi.mocked(loginUserRequest).mockImplementation(
			(_, { rejectWithValue }: { rejectWithValue: any }) => {
				return rejectWithValue({ message: 'Username or password is incorrect' });
			}
		);
	});

	afterEach(() => {
		cleanup();
	});

	test('Enter invalid credentials', async () => {
		render(<App />);

		fireEvent.change(screen.getAllByPlaceholderText('Username')[0], {
			target: { value: 'invalid' },
		});

		fireEvent.change(screen.getAllByPlaceholderText('Enter your password')[0], {
			target: { value: 'invalid' },
		});

		fireEvent.click(screen.getByText('Sign In'));

		await waitFor(() => {
			expect(screen.getAllByText('Username or password is incorrect')[0]).toBeInTheDocument();
		});
	});
});

describe('Try to login with valid credentials', () => {
	beforeEach(() => {
		vi.mocked(loginUserRequest).mockResolvedValue('testToken');
		vi.mock('jwt-decode', () => ({
			jwtDecode: () => ({
				'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress': 'ejslallslss',
				'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name': 'ejlalal',
				'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Admin',
				exp: 1234567890,
			}),
		}));
	});

	afterEach(() => {
		vi.clearAllMocks();
		vi.resetAllMocks();
		vi.resetModules();
		cleanup();
	});

	test('Enter valid credentials', async () => {
		render(<App />);

		fireEvent.change(screen.getAllByPlaceholderText('Username')[0], {
			target: { value: 'valid' },
		});

		fireEvent.change(screen.getAllByPlaceholderText('Enter your password')[0], {
			target: { value: 'valid' },
		});

		fireEvent.click(screen.getByText('Sign In'));

		await waitFor(() => {
			expect(screen.getAllByText(/Login Successful/i)[0]).toBeInTheDocument();
		});
	});
});
