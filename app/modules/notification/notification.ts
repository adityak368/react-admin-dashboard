import { message } from 'antd';

class Notification {
	success = (options: any) => {
		message.success(options.message);
	};

	info = (options: any) => {
		message.info(options.message);
	};

	warning = (options: any) => {
		message.warning(options.message);
	};

	error = (options: any) => {
		message.error(options.message);
	};
}

const notificationObj: Notification = new Notification();

export default notificationObj;
