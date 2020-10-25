import Logger from 'framework/logger';
import networkRun from 'framework/net/requester';
import ErrorPage from 'modules/common/components/ErrorPage';
import React from 'react';

interface State {
	hasError: boolean;
	error: any;
	info: any;
}

export default class ErrorBoundary extends React.Component<{}, State> {
	state = {
		hasError: false,
		error: null,
		info: null,
	};

	componentDidCatch(error, info) {
		// Display fallback UI
		this.setState({ hasError: true, error, info });
		Logger.error({ error, info });
	}

	retry = () => {
		this.setState({
			hasError: false,
		});
	};

	report = () => {
		const { error, info } = this.state;
		networkRun<'ReportCrash'>('ReportCrash', {
			error,
			info,
		}).catch((err) => Logger.error({ message: err.message }));
	};

	render() {
		const { hasError } = this.state;
		if (hasError) {
			return <ErrorPage retry={this.retry} report={this.report} />;
		}
		return this.props.children;
	}
}
