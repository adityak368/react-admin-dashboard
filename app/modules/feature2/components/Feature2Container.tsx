import { AppState } from 'app/modules';
import { IAuthState } from 'modules/auth/reducers';
import Feature2 from 'modules/feature2/components/Feature2';
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

class Feature2Container extends Component<Props> {
	render() {
		return (
			<Feature2 />
		);
	}
}

export default withRouter(connect<StateProps, DispatchProps, OwnProps>(mapStateToProps, mapDispatchToProps)(Feature2Container));
