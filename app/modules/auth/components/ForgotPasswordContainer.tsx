import { AppState } from 'app/modules';
import { FormikHelpers } from 'formik';
import networkRun from 'framework/net/requester';
import authActions from 'modules/auth/actions';
import ForgotPassword from 'modules/auth/components/ForgotPassword';
import { ForgotPasswordForm } from 'modules/auth/form';
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

class ForgotPasswordContainer extends Component<RouteComponentProps<Props>, {}> {
	onSubmit = (values: ForgotPasswordForm, actions: FormikHelpers<ForgotPasswordForm>) => {
		const { history } = this.props;
		actions.setSubmitting(true);
		networkRun<'ForgotPassword'>('ForgotPassword', values)
			.then(async (res: ApiResult) => {
				actions.setSubmitting(false);
				notification.info({ message: res.message });
				history.push('/login');
			})
			.catch((error) => {
				actions.setSubmitting(false);
				notification.error({ message: error.message });
			});
	};

	render() {
		const { auth, authActions } = this.props;
		return <ForgotPassword onSubmit={this.onSubmit} auth={auth} authActions={authActions} />;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ForgotPasswordContainer));
