import { ArrowUpOutlined, LikeOutlined, MessageOutlined, StarOutlined } from '@ant-design/icons';
import { Avatar, Card, Col, List, Row, Space, Statistic } from 'antd';
import Countdown from 'antd/lib/statistic/Countdown';
import { History } from 'history';
import authActions from 'modules/auth/actions';
import { IAuthState } from 'modules/auth/reducers';
import React from 'react';
import styled from 'styled-components';

interface Props {
	auth: IAuthState;
	authActions: typeof authActions;
	history: History;
}

const deadline = Date.now() + 1000 * 60 * 60 * 24 * 2 + 1000 * 30;

const listData = [];
for (let i = 0; i < 23; i++) {
	listData.push({
		href: 'https://ant.design',
		title: `Header ${i}`,
		avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
		description: 'Some item description.',
		content: (
			<p>
				This template is created using antd framework. Have a look{' '}
				<a target="_blank" href={'https://ant.design'}>
					here
				</a>
			</p>
		),
	});
}

const IconText = ({ icon, text }) => (
	<Space>
		{React.createElement(icon)}
		{text}
	</Space>
);

const CardStyled = styled(Card.Grid)`
	width: 25%;
	textalign: center;
`;

class Dashboard extends React.PureComponent<Props> {
	render() {
		return (
			<React.Fragment>
				<Row gutter={[16, 16]} justify="space-around">
					<Col xs={24} md={6}>
						<Card>
							<Statistic title="Feedback" value={2020} prefix={<LikeOutlined />} />
						</Card>
					</Col>
					<Col xs={24} md={6}>
						<Card>
							<Statistic title="Account Balance ($)" value={125000} precision={2} />
						</Card>
					</Col>
					<Col xs={24} md={6}>
						<Card>
							<Statistic
								title="Active"
								value={11.28}
								precision={2}
								valueStyle={{ color: '#3f8600' }}
								prefix={<ArrowUpOutlined />}
								suffix="%"
							/>
						</Card>
					</Col>
					<Col xs={24} md={6}>
						<Card>
							<Countdown title="Countdown" value={deadline} />
						</Card>
					</Col>
				</Row>
				<Row>
					<Col xs={24}>
						<Card bodyStyle={{ padding: 0 }}>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
							<CardStyled>
								Sunt in culpa qui officia deserunt mollit anim id est laborum consectetur adipiscing elit, sed do
								eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
								exercitation ullamco.
							</CardStyled>
						</Card>
					</Col>
				</Row>
				<Row style={{ marginTop: 20 }}>
					<Col xs={24}>
						<Card>
							<List
								itemLayout="vertical"
								size="large"
								pagination={{
									onChange: (page) => {
										console.log(page);
									},
									pageSize: 3,
								}}
								dataSource={listData}
								footer={
									<div>
										<b>Footer:</b> Admin dashboard
									</div>
								}
								renderItem={(item) => (
									<List.Item
										key={item.title}
										actions={[
											<IconText icon={StarOutlined} text="156" key="list-vertical-star-o" />,
											<IconText icon={LikeOutlined} text="156" key="list-vertical-like-o" />,
											<IconText icon={MessageOutlined} text="2" key="list-vertical-message" />,
										]}
										extra={
											<img
												width={272}
												alt="logo"
												src="https://gw.alipayobjects.com/zos/rmsportal/mqaQswcyDLcXyDKnZfES.png"
											/>
										}
									>
										<List.Item.Meta
											avatar={<Avatar src={item.avatar} />}
											title={<a href={item.href}>{item.title}</a>}
											description={item.description}
										/>
										{item.content}
									</List.Item>
								)}
							/>
						</Card>
					</Col>
				</Row>
			</React.Fragment>
		);
	}
}
export default Dashboard;
