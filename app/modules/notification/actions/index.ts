import { Action, PayloadedAction, createAction, createPayloadedAction } from 'framework/actions';

export enum NotificationActionConstants {
	ADD_NOTIFICATION = 'ADD_NOTIFICATION',
	CLEAR_ALL_NOTIFICATION = 'CLEAR_ALL_NOTIFICATION',
}

// Action<type> type => used in reducer switch
export interface IAddNotification extends PayloadedAction<NotificationActionConstants.ADD_NOTIFICATION, Array<Notification>> {}

export interface IClearAllNotification extends PayloadedAction<NotificationActionConstants.CLEAR_ALL_NOTIFICATION, any> {}

export type NotificationActions = IAddNotification | IClearAllNotification;

const addNotifications = createPayloadedAction<IAddNotification>(NotificationActionConstants.ADD_NOTIFICATION);
const clearAll = createPayloadedAction<IClearAllNotification>(NotificationActionConstants.CLEAR_ALL_NOTIFICATION);

export default {
	addNotifications,
	clearAll,
};
