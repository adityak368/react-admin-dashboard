import { AppState } from 'app/modules';
import { IAuthState } from 'modules/auth/reducers';
import Feature1 from 'modules/feature1/components/Feature1';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { Dispatch } from 'redux';

const mapDispatchToProps = (dispatch: Dispatch) => ({
});

const mapStateToProps = (state: AppState) => ({
	auth: state.auth,
});

interface StateProps {
	auth: IAuthState;
}

interface DispatchProps {
}

interface OwnProps {}

type Props = StateProps & DispatchProps & OwnProps;

class Feature1Container extends Component<Props> {
	render() {
		return (
			<Feature1 />
		);
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Feature1Container));
