import * as jwt from 'jsonwebtoken';

export const decodeToken = (authToken: string): User => {
	try {
		return jwt.decode(authToken).info;
	} catch (err) {
		return null;
	}
};

export const isTokenExpired = (authToken: string): boolean => {
	try {
		const exp = jwt.decode(authToken).exp;
		if (Date.now() < exp * 1000) {
			return false;
		}
		return true;
	} catch (err) {
		return true;
	}
};

export const getUserName = (user: User) => {
	if (!user) {
		return '';
	}

	return user.name || '';
};

export const getUserEmail = (user: User) => {
	if (!user) {
		return '';
	}

	return user.email || '';
};
