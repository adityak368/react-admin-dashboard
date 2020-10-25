import { AppState } from 'app/modules';
import { FormikHelpers } from 'formik';
import intl from 'framework/localization/intl';
import networkRun from 'framework/net/requester';
import authActions from 'modules/auth/actions';
import ResetPassword from 'modules/auth/components/ResetPassword';
import { ResetPasswordForm } from 'modules/auth/form';
import { IAuthState } from 'modules/auth/reducers';
import notification from 'modules/notification/notification';
import queryString from 'query-string';
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

class ResetPasswordContainer extends Component<RouteComponentProps<Props>, {}> {
	onSubmit = (values: ResetPasswordForm, actions: FormikHelpers<ResetPasswordForm>) => {
		const { history, location } = this.props;
		const parsed = queryString.parse(location.search);
		actions.setSubmitting(true);
		values.token = parsed.t as string;
		networkRun<'ResetPassword'>('ResetPassword', values)
			.then(async (res) => {
				actions.setSubmitting(false);
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
		return <ResetPassword onSubmit={this.onSubmit} auth={auth} authActions={authActions} />;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ResetPasswordContainer));
