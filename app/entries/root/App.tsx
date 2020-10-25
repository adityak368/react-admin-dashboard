import Root from 'app/entries/root/RootApp';
import { AppState } from 'app/modules';
import 'framework/styles';
import AppTheme from 'framework/styles/theme';
import { History } from 'history';
import ErrorBoundary from 'modules/common/components/ErrorBoundary';
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { Store } from 'redux';
import { ThemeProvider } from 'styled-components';

interface Props {
	store: Store<AppState>;
	history: History;
}

export default class App extends Component<Props, {}> {
	render() {
		const { store, history } = this.props;
		return (
			<React.StrictMode>
				<ErrorBoundary>
					<Provider store={store}>
						<Router history={history}>
							<ThemeProvider theme={AppTheme}>
								<Root />
							</ThemeProvider>
						</Router>
					</Provider>
				</ErrorBoundary>
			</React.StrictMode>
		);
	}
}
