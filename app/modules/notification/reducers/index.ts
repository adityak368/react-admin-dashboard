import update from 'immutability-helper';
import { NotificationActions, NotificationActionConstants } from 'modules/notification/actions';

export interface INotificationState extends Array<Notification> {}

export const initialNotificationState: INotificationState = [];

const notificationReducer = (state = initialNotificationState, action: NotificationActions): INotificationState => {
	switch (action.type) {
		case NotificationActionConstants.ADD_NOTIFICATION: {
			const { payload } = action;
			return update(state, { $push: payload });
		}
		case NotificationActionConstants.CLEAR_ALL_NOTIFICATION: {
			return [];
		}
		default:
			return state;
	}
};

export default notificationReducer;
