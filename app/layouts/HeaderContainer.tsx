import { AppState } from 'app/modules';
import settings from 'framework/settings/settings';
import Header from 'layouts/Header';
import authActions from 'modules/auth/actions';
import { IAuthState } from 'modules/auth/reducers';
import notificationActions from 'modules/notification/actions';
import { INotificationState } from 'modules/notification/reducers';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	notificationActions: bindActionCreators(notificationActions, dispatch),
	authActions: bindActionCreators(authActions, dispatch),
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

interface OwnProps {
	changeSideBarState: (isSideBarOpen: boolean) => void;
	changeDrawerState: (drawerIsOpen: boolean) => void;
	isSideBarOpen: boolean;
	left: Number;
	drawerIsOpen: boolean;
	isMobile: boolean;
}

type Props = StateProps & DispatchProps & OwnProps;

class HeaderContainer extends Component<RouteComponentProps<Props>, {}> {
	onLogout = () => {
		const { authActions, history } = this.props;
		authActions.logout();
		history.push('/login');
	};

	onLogin = () => {
		const { history } = this.props;
		history.push('/login');
	};

	changeLanguage = (language: string) => {
		settings.set('language', language);
		window.location.reload();
	};

	clearNotifications = () => {
		const { notificationActions } = this.props;
		notificationActions.clearAll();
	};

	render() {
		const { left, changeSideBarState, changeDrawerState, isSideBarOpen, drawerIsOpen, isMobile, auth, notifications } = this.props;

		return (
			<Header
				auth={auth}
				left={left}
				changeSideBarState={changeSideBarState}
				changeDrawerState={changeDrawerState}
				isSideBarOpen={isSideBarOpen}
				drawerIsOpen={drawerIsOpen}
				isMobile={isMobile}
				onLogin={this.onLogin}
				onLogout={this.onLogout}
				changeLanguage={this.changeLanguage}
				clearNotifications={this.clearNotifications}
				notifications={notifications}
			/>
		);
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(HeaderContainer));
