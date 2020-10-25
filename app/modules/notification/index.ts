import Module from 'framework/module';
import AppStore from 'framework/store';
import notificationReducer from 'modules/notification/reducers';

export default class Notification extends Module {
	onInit = (): boolean => {
		AppStore.injectReducer('notifications', notificationReducer);
		return true;
	};

	onCleanUp = () => {};
}
