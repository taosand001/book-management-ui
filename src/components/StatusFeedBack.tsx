import { ScaleFade } from '@chakra-ui/react';
import { Status } from '../enums/enums';
import { AlertWithStatus } from './notifications/Alert';

export interface StatusFeedBackProps {
	status: 'idle' | 'loading' | 'failed' | 'success' | boolean;
	message: string;
}

export const StatusFeedBack = ({ status, message }: StatusFeedBackProps) => {
	if (status === Status.Failed) {
		return (
			<ScaleFade initialScale={0.1} in={true}>
				<AlertWithStatus status={status} message={message} />
			</ScaleFade>
		);
	}
};
