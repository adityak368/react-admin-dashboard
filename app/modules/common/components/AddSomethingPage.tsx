import { Button, Col, Result, Row } from 'antd';
import intl from 'framework/localization/intl';
import React, { useEffect } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface Props {
}

const AddSomethingPage: React.FC<RouteComponentProps<Props>> = ({ history }) => {
	useEffect(() => {
		document.title = intl.get('AddSomething');
	}, []);
	return (
		<Row gutter={16} align="middle" justify="space-around" style={{ width: '100%', margin: 'auto' }}>
			<Col xs={{ span: 18 }} md={{ span: 12 }} lg={{ span: 8 }} style={{ textAlign: 'center' }}>
				<Result
					style={{
						margin: 'auto',
					}}
					status="404"
					title={intl.get('AddSomethingHere')}
					subTitle={intl.get('AddSomethingHereMsg')}
					extra={
						<Button type="primary" onClick={() => history.goBack()}>
							{intl.get('GoBack')}
						</Button>
					}
				/>
			</Col>
		</Row>
	);
};

export default withRouter(AddSomethingPage);
