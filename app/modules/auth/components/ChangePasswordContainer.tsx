import { AppState } from 'app/modules';
import { FormikHelpers } from 'formik';
import intl from 'framework/localization/intl';
import networkRun from 'framework/net/requester';
import authActions from 'modules/auth/actions';
import ChangePassword from 'modules/auth/components/ChangePassword';
import { ChangePasswordForm } from 'modules/auth/form';
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

class ChangePasswordContainer extends Component<RouteComponentProps<Props>, {}> {
	onChangePassword = (values: ChangePasswordForm, actions: FormikHelpers<ChangePasswordForm>) => {
		const { history, location, authActions } = this.props;
		actions.setSubmitting(true);
		networkRun<'ChangePassword'>('ChangePassword', values)
			.then(async (res) => {
				actions.setSubmitting(false);
				authActions.logout();
				notification.info({ message: intl.get('PasswordChanged') });
				history.push('/login');
			})
			.catch((error) => {
				actions.setSubmitting(false);
				notification.error({ message: error.message });
			});
	};

	render() {
		const { auth, authActions } = this.props;
		return <ChangePassword onChangePassword={this.onChangePassword} auth={auth} authActions={authActions} />;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ChangePasswordContainer));
