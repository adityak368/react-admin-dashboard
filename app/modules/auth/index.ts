import Module from 'framework/module';
export default class Auth extends Module {
	onInit = (): boolean => {
		return true;
	};

	onCleanUp = () => {};
}
