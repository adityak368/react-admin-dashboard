// required reducer imports
import authReducer, { initialAuthState } from 'modules/auth/reducers';
import { applyMiddleware, combineReducers, createStore, Reducer, Store } from 'redux';
import { createLogger } from 'redux-logger';

class AppStore {
	// Define the Reducers that will always be present in the application
	private staticReducers = {
		auth: authReducer,
	};

	private asyncReducers = {};

	private store: Store = null;

	rootReducer: Reducer;

	configureStore = () => {
		const middleware = [];

		if (process.env.NODE_ENV === 'development') {
			// Logging Middleware
			const logger = createLogger({
				level: 'info',
				collapsed: true,
			});
			middleware.push(logger);
		}

		const enhancer = applyMiddleware(...middleware);

		const initialState = {
			auth: initialAuthState,
		};

		this.store = createStore(
			combineReducers({
				...this.staticReducers,
				...this.asyncReducers,
			}),
			initialState,
			enhancer
		);

		return this.store;
	};

	getStore = () => {
		return this.store;
	};

	injectReducer = (key, asyncReducer) => {
		const { asyncReducers, store } = this;
		asyncReducers[key] = asyncReducer;
		this.rootReducer = combineReducers({
			...this.staticReducers,
			...this.asyncReducers,
		});
		store.replaceReducer(this.rootReducer);
	};
}

const appStore = new AppStore();

export default appStore;
