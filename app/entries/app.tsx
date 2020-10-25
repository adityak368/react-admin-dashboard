import Modules from 'app/modules';
import intl from 'framework/localization/intl';
import Logger from 'framework/logger';
import settings from 'framework/settings/settings';
import AppStore from 'framework/store';
import { createBrowserHistory, History } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import LANGUAGES from 'res/locales/languages.json';

const initApp = async () => {
	try {
		const languages = {};

		Object.keys(LANGUAGES).forEach((language) => {
			let translations = {};
			try {
				translations = require(`res/locales/${language}`);
			} catch (e) {
				if (e.code !== 'MODULE_NOT_FOUND') {
					throw e;
				}
			}
			languages[language] = {
				...LANGUAGES[language],
				translations: translations,
			};
		});

		intl.init({
			currentLanguage: settings.get('language', 'en-US'),
			languages,
		});

		window.modals = {};

		if (module.hot && process.env.NODE_ENV === 'development') {
			module.hot.accept();
		}

		const store = AppStore.configureStore();
		const history: History = createBrowserHistory();

		const modules = Modules('APP');
		Object.keys(modules).forEach((key) => {
			const Module = modules[key];
			const module = new Module();
			module.onInit();
		});

		const App = require('./root/App').default;
		ReactDOM.render(<App store={store} history={history} />, document.getElementById('root'));
	} catch (err) {
		Logger.error(err);
	}
};

Logger.info('Starting App...');
initApp();
