import settings from 'framework/settings/settings';
import { decodeToken } from 'framework/utils';
import { AuthActionConstants, AuthActions } from 'modules/auth/actions';

export interface IAuthState {
	isLoggedIn: boolean;
	user: User | null;
}

export const initialAuthState: IAuthState = {
	isLoggedIn: false,
	user: null,
};

const authReducer = (state: IAuthState = initialAuthState, action: AuthActions): IAuthState => {
	switch (action.type) {
		case AuthActionConstants.LOGIN:
		case AuthActionConstants.EDIT_PROFILE: {
			const { authToken } = action.payload;
			const newState = { ...state };
			const user: User = decodeToken(authToken) as User;
			if (user) {
				newState.isLoggedIn = true;
				newState.user = user;
				// Change to cookie for security
				settings.set('authToken', authToken);
			}
			return newState;
		}
		case AuthActionConstants.LOGOUT: {
			const newState = { ...state };
			newState.isLoggedIn = false;
			newState.user = null;
			// Change to cookie for security
			settings.remove('authToken');
			return newState;
		}
		default:
			return state;
	}
};

export default authReducer;
