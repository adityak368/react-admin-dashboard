import { AppState } from 'app/modules';
import authActions from 'modules/auth/actions';
import { IAuthState } from 'modules/auth/reducers';
import Dashboard from 'modules/dashboard/components/Dashboard';
import React from 'react';
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

class DashboardContainer extends React.Component<RouteComponentProps<Props>, {}> {
	render() {
		const { auth, authActions, history } = this.props;
		return <Dashboard auth={auth} authActions={authActions} history={history} />;
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(DashboardContainer));
