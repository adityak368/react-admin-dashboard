import { AppState } from 'app/modules';
import { FormikHelpers } from 'formik';
import networkRun from 'framework/net/requester';
import authActions from 'modules/auth/actions';
import Profile from 'modules/auth/components/Profile';
import { ProfileForm } from 'modules/auth/form';
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

class ProfileContainer extends Component<RouteComponentProps<Props>, {}> {
	onSubmit = (values: ProfileForm, actions: FormikHelpers<ProfileForm>) => {
		const { authActions } = this.props;
		actions.setSubmitting(true);
		networkRun<'UpdateProfile'>('UpdateProfile', values)
			.then(async (res) => {
				authActions.editProfile(res);
				actions.setSubmitting(false);
			})
			.catch((error) => {
				actions.setSubmitting(false);
				notification.error({ message: error.message });
			});
	};

	render() {
		const { auth, authActions } = this.props;
		return <Profile authActions={authActions} onSubmit={this.onSubmit} auth={auth} />;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(ProfileContainer));
