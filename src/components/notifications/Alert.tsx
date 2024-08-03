import { Fade, Alert, AlertIcon, AlertTitle, AlertDescription } from '@chakra-ui/react';
import { Status } from '../../enums/enums';

export interface AlertProps {
	status: 'idle' | 'loading' | 'failed' | 'success' | boolean;
	message: string;
}
export const AlertWithStatus = ({ status, message }: AlertProps) => {
	if (status === Status.Failed) {
		return (
			<Fade in={true}>
				<Alert status='error'>
					<AlertIcon />
					<AlertTitle mr={2}>Error!</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			</Fade>
		);
	}
	if (status === Status.Success) {
		return (
			<Fade in={true}>
				<Alert status='success'>
					<AlertIcon />
					<AlertTitle mr={2}>Success!</AlertTitle>
					<AlertDescription>{message}</AlertDescription>
				</Alert>
			</Fade>
		);
	}
	return null;
};
