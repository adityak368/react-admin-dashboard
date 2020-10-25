import intl from 'framework/localization/intl';
import React from 'react';
import { When } from 'react-if';
import { Link } from 'react-router-dom';

interface Props {
	previewHeight: string;
	isInitallyExpanded?: boolean;
	showExpandCollpaseButton?: boolean;
}

interface State {
	isExpanded: boolean;
}

export default class ExpandCollapse extends React.Component<Props, State> {
	state = {
		isExpanded: this.props.isInitallyExpanded || false,
	};

	onExpand = () => {
		const { isExpanded } = this.state;
		this.setState({
			isExpanded: !isExpanded,
		});
	};

	render() {
		const { children, previewHeight, showExpandCollpaseButton } = this.props;
		const { isExpanded } = this.state;
		const hiddenStyle = {
			height: previewHeight,
			overflow: 'hidden',
		};
		return (
			<React.Fragment>
				<div style={isExpanded ? {} : hiddenStyle}>{children}</div>
				<When condition={showExpandCollpaseButton === undefined || showExpandCollpaseButton === true}>
					<Link to={'#'} className="link-underline" onClick={this.onExpand}>
						{isExpanded ? intl.get('Less') : intl.get('More')}
					</Link>
				</When>
			</React.Fragment>
		);
	}
}
