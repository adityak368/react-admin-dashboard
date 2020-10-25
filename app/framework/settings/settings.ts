import store from 'store2';

class Settings {
	set = (key: string, value: any) => {
		store(key, value);
	};

	get = (key: string, defaultValue?: any) => {
		return defaultValue ? store.get(key, defaultValue) : store.get(key);
	};

	remove = (key: string) => {
		return store.remove(key);
	};

	getAll = () => store.getAll();
}

const settings = new Settings();

export default settings;
