import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../app/features/Auth/AuthSlice';
import { removeToken } from '../utils/storage';

export const Logout = () => {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		removeToken();
		navigate('/login');
		dispatch(logoutUser());
	}, [navigate, dispatch]);

	return null;
};
