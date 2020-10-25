import Logger from 'framework/logger';
import intl from 'framework/localization/intl';
import settings from 'framework/settings/settings';

type Headers = {
	[key: string]: string;
};

export class Request {
	url: string = '';

	constructor(url: string) {
		this.url = url;
	}

	upload = (params: any, headers?: Headers) => {
		const data = new FormData();
		Object.keys(params).forEach((key) => data.append(key, params[key]));

		return new Promise((resolve, reject) => {
			fetch(this.url, {
				method: 'POST',
				headers,
				body: data,
			})
				.then((response) => {
					if (!response.ok) {
						throw response;
					}
					return response.json();
				})
				.then((json) => resolve(json))
				.catch((err) => {
					if (typeof err.json === 'function') {
						err.json()
							.then((jsonErr) => reject(jsonErr))
							.catch((err) => {
								Logger.error(err);
								reject(new Error(intl.get('CouldNotFetchData')));
							});
						return;
					}
					Logger.error(err);
					reject(new Error(intl.get('CouldNotFetchData')));
				});
		});
	};

	run = (method: string, data: any, headers?: Headers) => {
		headers = { 'Content-Type': 'application/json', ...headers };

		return new Promise((resolve, reject) => {
			fetch(this.url, {
				method: method,
				headers,
				body: JSON.stringify(data),
			})
				.then((response) => {
					if (!response.ok) {
						throw response;
					}
					return response.json();
				})
				.then((json) => resolve(json))
				.catch(async (err) => {
					// check if there is some problem with token. If so then remove the tokens
					if (err.status === 401) {
						settings.remove('authToken');
						settings.remove('machineAuthToken');
						window.location.reload();
					}
					try {
						const errDesc = await err.json();
						reject(errDesc);
					} catch (error) {
						reject(new Error(intl.get('CouldNotFetchData')));
						Logger.error(error);
					}
				});
		});
	};
}
