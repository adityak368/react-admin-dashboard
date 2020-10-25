import config from 'app/config';
import { Request } from 'framework/net/request';
import settings from 'framework/settings/settings';
import {
	ChangePasswordForm,
	ForgotPasswordForm,
	LoginForm,
	ProfileForm,
	RegistrationForm,
	ResetPasswordForm,
} from 'modules/auth/form';

const { HOST, API, CRASH_REPORT_HOST } = config;
const BASE_PATH = `${HOST}${API}`;

const formatUrl = (url: string, ...rest: Array<string>) => {
	try {
		rest.forEach((val, index) => {
			url = url.replace(`{${index}}`, val);
		});
		return url;
	} catch (err) {}
	return url;
};

interface IRequest {
	method: 'GET' | 'PUT' | 'POST' | 'DELETE' | 'UPLOAD';
	url: string;
	isAddUserAuthToken?: boolean;
	headers?: { [key: string]: string };
}

const RequestMap: { [key: string]: IRequest } = {
	//Auth
	Login: {
		method: 'POST',
		url: `${HOST}/auth/login`,
	},
	SignUp: {
		method: 'POST',
		url: `${HOST}/auth/signup`,
	},
	UpdateProfile: {
		method: 'PUT',
		url: `${HOST}/auth/profile`,
		isAddUserAuthToken: true,
	},
	ChangePassword: {
		method: 'POST',
		url: `${HOST}/auth/changepassword`,
		isAddUserAuthToken: true,
	},
	ForgotPassword: {
		method: 'POST',
		url: `${HOST}/auth/forgotpassword`,
	},
	ResetPassword: {
		method: 'POST',
		url: `${HOST}/auth/resetpassword`,
	},
	GetNotifications: {
		method: 'GET',
		url: `${BASE_PATH}/notifications`,
		isAddUserAuthToken: true,
	},

	//commons
	ReportCrash: {
		method: 'POST',
		url: CRASH_REPORT_HOST,
		isAddUserAuthToken: true,
	},
};

type TypeMap = {
	//Auth
	Login: LoginForm;
	SignUp: RegistrationForm;
	UpdateProfile: ProfileForm;
	ChangePassword: ChangePasswordForm;
	ForgotPassword: ForgotPasswordForm;
	ResetPassword: ResetPasswordForm;
	GetNotifications: undefined;

	// Commons
	ReportCrash: Crash;
};

const networkRun = <T extends keyof TypeMap>(
	requestKey: T,
	params?: TypeMap[T],
	headers?: { [key: string]: string },
	urlParams?: Array<string>
) => {
	const requestData: IRequest = RequestMap[requestKey];
	if (!requestData) {
		throw new Error(`Unknown Request ${requestKey}`);
	}

	const authToken: string = settings.get('authToken', '');
	if (requestData.isAddUserAuthToken && authToken) {
		headers = { ...headers, Authorization: `Bearer ${authToken}` };
	}

	// Add headers defined in request data overriden with function called headers
	headers = { ...requestData.headers, ...headers };

	let url = requestData.url;
	if (urlParams) {
		url = formatUrl(requestData.url, ...urlParams);
	}
	const req: Request = new Request(url);

	if (requestData.method === 'UPLOAD') {
		return req.upload(params, headers);
	} else {
		return req.run(requestData.method, params, headers);
	}
};

// Commons
type Crash = {
	error: any;
	info: any;
};

export default networkRun;
