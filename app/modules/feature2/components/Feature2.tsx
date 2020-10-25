import { TeamOutlined } from '@ant-design/icons';
import { Card, Carousel, Skeleton, Tabs, Timeline } from 'antd';
import intl from 'framework/localization/intl';
import React, { useEffect } from 'react';
import styled from 'styled-components';

const Page = styled.div`
	width: 100%;
	height: 1000px;
`;

const StyledImage = styled.img`
	width: 100%;
	height: 100%;
`;

const Feature2: React.FC = () => {
	useEffect(() => {
		document.title = intl.get('Feature2');
	}, []);

	const tabs = [];
	tabs.push(
		<Tabs.TabPane
			tab={
				<span>
					<TeamOutlined />
					{intl.get('Users')}
				</span>
			}
			key={'Users'}
		>
			<Card bordered={false}>
				<Carousel autoplay>
					<Page>
						<StyledImage src="https://miro.medium.com/max/10362/0*uJW7ltZfT_DKTXWD" />
					</Page>
					<Page>
						<StyledImage src="https://s3-eu-west-1.amazonaws.com/motorgeeks-v3/wp-content/uploads/2019/11/12133541/ford-mustang.jpg" />
					</Page>
					<Page>
						<StyledImage src="https://image.stirileprotv.ro/media/images/680xX/May2020/62127390.jpg" />
					</Page>
					<Page>
						<StyledImage src="https://sportshub.cbsistatic.com/i/r/2020/10/19/da622dfd-893b-44a7-bdf9-2a10e72488ae/thumbnail/1200x675/7b00b3c57c12c12812f00ab1b0f03861/khabib.jpg" />
					</Page>
				</Carousel>
				<Timeline style={{ margin: 'auto', width: 500, padding: '20px 50px' }}>
					<Timeline.Item>Create a services site 2015-09-01</Timeline.Item>
					<Timeline.Item>Solve initial network problems 2015-09-01</Timeline.Item>
					<Timeline.Item>Technical testing 2015-09-01</Timeline.Item>
					<Timeline.Item>Network problems being solved 2015-09-01</Timeline.Item>
				</Timeline>
				<Skeleton active avatar paragraph={{ rows: 4 }} />
			</Card>
		</Tabs.TabPane>
	);

	return (
		<React.Fragment>
			<Tabs tabBarStyle={{ margin: 0, borderBottom: 'none' }} type="card">
				{tabs}
			</Tabs>
		</React.Fragment>
	);
};

export default Feature2;
