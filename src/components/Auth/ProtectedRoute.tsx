/* eslint-disable @typescript-eslint/no-explicit-any */
import { Navigate } from 'react-router-dom';
import { getToken } from '../../utils/storage';
import React from 'react';

export interface ProtectRouteProps {
	element: React.ReactNode;
	path: string;
}

export const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
	if (getToken()) {
		return children;
	}
	return <Navigate to='/login' />;
};
