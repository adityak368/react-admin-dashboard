import { Action, createAction, createPayloadedAction, PayloadedAction } from 'framework/actions';

export enum AuthActionConstants {
	LOGIN = 'LOGIN',
	LOGOUT = 'LOGOUT',
	EDIT_PROFILE = 'EDIT_PROFILE',
}

// Action<type> type => used in reducer switch
export interface ILogin extends PayloadedAction<AuthActionConstants.LOGIN, { authToken: string }> {}

export interface ILogout extends Action<AuthActionConstants.LOGOUT> {}

export interface IEditProfile extends PayloadedAction<AuthActionConstants.EDIT_PROFILE, { authToken: string }> {}

export type AuthActions = ILogin | ILogout | IEditProfile;

const login = createPayloadedAction<ILogin>(AuthActionConstants.LOGIN);
const logout = createAction<ILogout>(AuthActionConstants.LOGOUT);
const editProfile = createPayloadedAction<IEditProfile>(AuthActionConstants.EDIT_PROFILE);

export default {
	login,
	logout,
	editProfile,
};
