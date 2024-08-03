export const calculateMillisecondsUntilExpiry = (expiryUnixTime: number) => {
	const currentUnixTime = Math.floor(Date.now() / 1000);
	const millisecondsUntilExpiry = (expiryUnixTime - currentUnixTime) * 1000;
	return millisecondsUntilExpiry;
};
