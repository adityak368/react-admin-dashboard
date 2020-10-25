interface Language {
	name: string;
	nativeName: string;
	countryCode: string;
	translations: {
		[key: string]: string;
	};
}

interface Options {
	languages: {
		[key: string]: Language;
	};
	currentLanguage: string;
}

class Intl {
	private options: Options;

	init(options: Options) {
		this.options = options;
		this.options.currentLanguage = options.currentLanguage;
	}

	get(key: string) {
		const { languages, currentLanguage } = this.options;
		if (languages.hasOwnProperty(currentLanguage)) {
			return languages[currentLanguage].translations[key] || languages['en-US'].translations[key] || '';
		}
		return '';
	}

	getf(key: string, ...rest: Array<string>) {
		const { languages, currentLanguage } = this.options;
		if (languages.hasOwnProperty(currentLanguage)) {
			try {
				let transString = languages[currentLanguage].translations[key] || languages['en-US'].translations[key] || '';
				if (transString) {
					rest.forEach((val, index) => {
						transString = transString.replace(`{${index}}`, val);
					});
					return transString;
				}
			} catch (err) {}
		}
		return '';
	}

	getCurrentLanguage() {
		return this.options.currentLanguage;
	}

	getLanguages() {
		return this.options.languages;
	}
}

const intl = new Intl();

export default intl;
