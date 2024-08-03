export const getToken = () => {
	return sessionStorage.getItem('token');
};

export const setToken = (token: string) => {
	sessionStorage.setItem('token', token);
};

export const removeToken = () => {
	sessionStorage.removeItem('token');
};
