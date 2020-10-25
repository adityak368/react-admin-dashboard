import { AppState } from 'app/modules';
import intl from 'framework/localization/intl';
import networkRun from 'framework/net/requester';
import settings from 'framework/settings/settings';
import { isTokenExpired } from 'framework/utils';
import authActions from 'modules/auth/actions';
import { IAuthState } from 'modules/auth/reducers';
import Loader from 'modules/common/components/Loader';
import notificationActions from 'modules/notification/actions';
import notification from 'modules/notification/notification';
import { INotificationState } from 'modules/notification/reducers';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, Switch, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';
import ROUTES_ITEMS from 'routing/routedefs';
import { PrivateRoute, PropsRoute, RedirectRoute } from 'routing/routes';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	authActions: bindActionCreators(authActions, dispatch),
	notificationActions: bindActionCreators(notificationActions, dispatch),
});

const mapStateToProps = (state: AppState) => ({
	auth: state.auth,
	notifications: state.notifications,
});

interface StateProps {
	auth: IAuthState;
	notifications: INotificationState;
}

interface DispatchProps {
	authActions: typeof authActions;
	notificationActions: typeof notificationActions;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

interface State {
	isInitComplete: boolean;
}

class RootContainer extends Component<RouteComponentProps<Props>, State> {
	state = {
		isInitComplete: false,
	};

	modals = {};

	componentDidMount() {
		setTimeout(
			() =>
				this.setState({
					isInitComplete: true,
				}),
			1000
		);
		this.loginIfPossible();
	}

	componentDidUpdate(prevProps) {
		const { auth } = this.props;
		if (auth.isLoggedIn && auth.isLoggedIn !== prevProps.auth.isLoggedIn) {
			this.fetchAppData();
		}
	}

	removeModal = (modalId: string) => {
		if (window.modals.hasOwnProperty(modalId)) {
			window.modals[modalId].destroy();
		}
	};

	addModal = (modalId: string, modal: any) => {
		window.modals[modalId] = modal;
	};

	fetchAppData = () => {
		const { notificationActions } = this.props;
		// Load some data from server
		networkRun<'GetNotifications'>('GetNotifications')
			.then((res: Array<Notification>) => notificationActions.addNotifications(res))
			.catch((error) => notification.error({ message: error.message }));
	};

	loginIfPossible = () => {
		const { authActions } = this.props;
		const token: string = settings.get('authToken');
		if (token && !isTokenExpired(token)) {
			authActions.login({
				authToken: token,
			});
		}
	};

	getRouteComponent = (route: RouteDefinition) => {
		const { auth, authActions } = this.props;
		if (route.isRouteHiddenWhenLoggedIn && auth.isLoggedIn) {
			return <RedirectRoute key={route.path} auth={auth} authActions={authActions} {...route} />;
		}
		if (!route.isProtected) {
			return <PropsRoute key={route.path} auth={auth} authActions={authActions} {...route} />;
		}
		return <PrivateRoute key={route.path} auth={auth} authActions={authActions} {...route} />;
	};

	render() {
		const { isInitComplete } = this.state;

		if (!isInitComplete) {
			return <Loader message={intl.get('Loading')} />;
		}

		const routes = [];
		ROUTES_ITEMS.forEach((route: RouteDefinition) => {
			if (Array.isArray(route.subMenus)) {
				route.subMenus.forEach((subMenuItem: RouteDefinition) => {
					// generate subroute
					const subRoute = { ...subMenuItem };
					subRoute.path = route.path + subRoute.path;
					routes.push(this.getRouteComponent(subRoute));
				});
				return;
			}
			routes.push(this.getRouteComponent(route));
		});

		return <Switch>{routes}</Switch>;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(RootContainer));
