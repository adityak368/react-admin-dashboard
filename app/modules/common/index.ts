import Module from 'framework/module';

export default class Common extends Module {
	onInit = (): boolean => {
		return true;
	};

	onCleanUp = () => {};
}
