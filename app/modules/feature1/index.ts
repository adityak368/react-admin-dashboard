import Module from 'framework/module';
//import AppStore from 'framework/store';
//import contactsReducer from 'modules/contacts/reducers';

export default class Contacts extends Module {
	onInit = (): boolean => {
		//AppStore.injectReducer('contacts', contactsReducer);
		return true;
	};

	onCleanUp = () => {};
}
