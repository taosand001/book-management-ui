/* eslint-disable @typescript-eslint/no-explicit-any */
import { StarIcon } from '@chakra-ui/icons';

export interface RatingsProps {
	rating: number;
}

export const Ratings = ({ rating }: RatingsProps) => {
	const ratingArray = Array.from({ length: rating }, (_, index) => index + 1);
	return (
		<>
			{ratingArray.map((_: any, index: number) => (
				<StarIcon key={index} color='yellow.500' />
			))}
		</>
	);
};
