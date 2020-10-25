import Module from 'framework/module';
//import AppStore from 'framework/store';
//import feature2Reducer from 'modules/feature2/reducers';

export default class Feature2 extends Module {
	onInit = (): boolean => {
		//AppStore.injectReducer('feature2', feature2Reducer);
		return true;
	};

	onCleanUp = () => {};
}
