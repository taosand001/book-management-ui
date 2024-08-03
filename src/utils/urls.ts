export const urls = {
	login: 'User/login',
	signup: 'User/register',
	getBooks: 'Book/GetAllBooks',
	getBookById: (id: number) => `Book/${id}`,
	review: 'Review',
	book: 'Book',
	deleteBookById: (id: number) => `Book/${id}`,
};
