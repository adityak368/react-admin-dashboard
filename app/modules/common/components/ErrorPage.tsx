import { Button, Layout, Result } from 'antd';
import intl from 'framework/localization/intl';
import React, { useEffect } from 'react';
import styled from 'styled-components';


const Container = styled.div`
	display: flex;
	justify-content: space-evenly;
`;

interface Props {
	retry: () => void;
	report: () => void;
}

const ErrorPage: React.FC<Props> = ({ retry, report }) => {
	useEffect(() => {
		document.title = intl.get('UnknownError');
	}, []);
	return (
		<Layout
			style={{
				height: '100vh',
			}}
		>
			<Result
				style={{
					margin: 'auto',
				}}
				status="500"
				title={intl.get('Error')}
				subTitle={intl.get('SomethingWentWrong')}
				extra={
					<Container>
						<Button type="primary" onClick={retry}>
							{intl.get('Restart')}
						</Button>
						<Button type="primary" onClick={report}>
							{intl.get('Report')}
						</Button>
					</Container>
				}
			/>
		</Layout>
	);
};

export default ErrorPage;
