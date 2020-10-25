import { AppState } from 'app/modules';
import { FormikHelpers } from 'formik';
import networkRun from 'framework/net/requester';
import authActions from 'modules/auth/actions';
import Login from 'modules/auth/components/Login';
import { LoginForm } from 'modules/auth/form';
import { IAuthState } from 'modules/auth/reducers';
import notification from 'modules/notification/notification';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { bindActionCreators, Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
	authActions: bindActionCreators(authActions, dispatch),
});

const mapStateToProps = (state: AppState) => ({
	auth: state.auth,
});

interface StateProps {
	auth: IAuthState;
}

interface DispatchProps {
	authActions: typeof authActions;
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class LoginContainer extends Component<RouteComponentProps<Props>, {}> {
	onSubmit = (values: LoginForm, actions: FormikHelpers<LoginForm>) => {
		const { authActions, location, history } = this.props;

		actions.setSubmitting(true);
		networkRun<'Login'>('Login', values)
			.then(async (res) => {
				actions.setSubmitting(false);
				authActions.login(res);
				const { state } = location;
				if (!state) {
					history.push('/');
					return;
				}
				const { from } = state;
				history.push(from || '/');
			})
			.catch((error) => {
				actions.setSubmitting(false);
				notification.error({ message: error.message });
			});
	};

	render() {
		const { auth, authActions } = this.props;
		return <Login onSubmit={this.onSubmit} auth={auth} authActions={authActions} />;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(LoginContainer));
