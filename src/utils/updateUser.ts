import { jwtDecode } from 'jwt-decode';
import { getToken } from './storage';
import { User } from '../interfaces/interfaces';

export const updateUser = () => {
	const token = getToken();
	if (token) {
		// eslint-disable-next-line @typescript-eslint/no-explicit-any
		const decodedToken = jwtDecode(token) as any;
		const user = {} as User;
		user.email = decodedToken[
			'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
		] as string;
		user.username = decodedToken[
			'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/name'
		] as string;
		user.role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] as
			| 'User'
			| 'Admin';
		user.exp = decodedToken.exp as number;
		return user;
	}
	return null;
};
