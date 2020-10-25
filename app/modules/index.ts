import auth from 'modules/auth';
import { IAuthState } from 'modules/auth/reducers';
import dashboard from 'modules/dashboard';
import feature1 from 'modules/feature1';
import feature2 from 'modules/feature2';
import notifications from 'modules/notification';
import { INotificationState } from 'modules/notification/reducers';
import { Reducer } from 'redux';

export default (ENTRY) => {
	switch (ENTRY) {
		case 'APP':
		default: {
			return {
				auth,
				dashboard,
				feature1,
				feature2,
				notifications,
			};
		}
	}
};

type FullStoreShape = {
	auth: IAuthState;
	notifications: INotificationState;
};

export type AppState = Partial<FullStoreShape>;
export type NamespaceKey = keyof AppState;
export type ReducerMap = Partial<{ [k in NamespaceKey]: Reducer<FullStoreShape[k]> }>;
