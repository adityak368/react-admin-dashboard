import { AppState } from 'app/modules';
import { FormikHelpers } from 'formik';
import intl from 'framework/localization/intl';
import networkRun from 'framework/net/requester';
import authActions from 'modules/auth/actions';
import Registration from 'modules/auth/components/Registration';
import { RegistrationForm } from 'modules/auth/form';
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

class RegistrationContainer extends Component<RouteComponentProps<Props>, {}> {
	onSubmit = (values: RegistrationForm, actions: FormikHelpers<RegistrationForm>) => {
		const { history } = this.props;
		actions.setSubmitting(true);
		networkRun<'SignUp'>('SignUp', values)
			.then((res) => {
				actions.setSubmitting(false);
				notification.success({
					message: intl.getf('CreatedNewUser', values.email),
				});
				history.push('/login');
			})
			.catch((error) => {
				actions.setSubmitting(false);
				notification.error({ message: error.message });
			});
	};

	render() {
		const { auth, authActions } = this.props;
		return <Registration onSubmit={this.onSubmit} auth={auth} authActions={authActions} />;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(RegistrationContainer));
