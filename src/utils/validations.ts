import { BookData, LoginState, SignupState } from '../interfaces/interfaces';

export const validateLogin = (login: LoginState) => {
	return login.username === '' || login.password === '';
};

export const validateSignup = (signup: SignupState) => {
	return (
		signup.username === '' ||
		signup.email === '' ||
		signup.password === '' ||
		signup.confirmPassword === '' ||
		signup.password !== signup.confirmPassword
	);
};

export const validateBook = (book: BookData) => {
	return (
		book.author === '' ||
		book.cover === '' ||
		book.description === '' ||
		book.genre.length === 0 ||
		book.rating === 0 ||
		book.title === '' ||
		book.year === Number('' || 0)
	);
};
