export interface LoginState {
	username: string;
	password: string;
}

export interface CustomError {
	message: string;
	status: number | undefined;
	statusText: string | undefined;
	data: string | undefined;
}

export interface SignupState {
	username: string;
	email: string;
	password: string;
	confirmPassword: string;
	role: 'User' | 'Admin';
}

export interface AuthState {
	loginState: boolean;
	signupState: boolean;
	login: LoginState;
	signup: SignupState;
	status: 'idle' | 'loading' | 'failed' | 'success' | boolean;
	message: string;
	user: User | null;
	isTokenExpired: boolean;
	tokenExpiryTime: number | null;
}

export interface User {
	username: string;
	email: string;
	role: 'User' | 'Admin';
	exp: number;
}

export interface Review {
	id: number;
	bookId: number;
	userId: number;
	rating: number;
	comment: string;
	user: User;
}

export interface Book {
	id: number;
	title: string;
	author: string;
	cover: string;
	rating: number;
	genre: string[];
	year: number;
	description: string;
	reviews: Review[];
}

export interface BookData {
	title: string;
	author: string;
	cover: string;
	rating: number;
	genre: string[];
	year: number;
	description: string;
}

export interface BookState {
	books: Book[];
	status: 'idle' | 'loading' | 'failed' | 'success' | boolean;
	message: string;
	book: Book | null;
	bookData: BookData;
	isEditModelOpen: boolean;
	bookId: number;
}

export interface ReviewData {
	comment: string;
	rating: number;
	username: string;
	bookId: number;
}

export interface ReviewState {
	status: 'idle' | 'loading' | 'failed' | 'success' | boolean;
	message: string;
	reviewData: ReviewData;
}

export interface ReviewRequestData {
	bookId: number;
	rating: number;
	comment: string;
	user: {
		username: string;
	};
}

export interface GenreData {
	label: string;
	value: string;
	colorScheme: string;
}
