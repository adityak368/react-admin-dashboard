import { BellOutlined } from '@ant-design/icons';
import { Badge, Button, List, Popover } from 'antd';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import intl from 'framework/localization/intl';
import React from 'react';
import styled from 'styled-components';

dayjs.extend(relativeTime);


const ListItem = styled(List.Item)`
	cursor: pointer;
	:hover {
		background-color: #fafafa;
	}
`;

export const Img = styled.img`
	width: 50px;
	object-fit: cover;
	height: 50px;
`;

const NotifcationButton = styled.button`
    fontSize: ${(props) => props.theme.fontSize},
    cursor: pointer;
    transition: color 0.3s;
    padding: 0 24px;
    height: 100%;
    background-color: transparent;
    border: none;
	:hover { cursor: pointer; color: ${(props) => props.theme.hoverColor}; }
    :focus { outline: 0; color: ${(props) => props.theme.hoverColor}; }
`;

interface Props {
	onClearNotifications: () => void;
	notifications: Array<Notification>;
}

const Notifications: React.FC<Props> = ({ notifications, onClearNotifications }) => (
	<Popover
		placement="bottom"
		trigger="click"
		key="notifications"
		getPopupContainer={() => document.querySelector('#header')}
		content={
			<React.Fragment>
				<List
					itemLayout="horizontal"
					dataSource={notifications}
					renderItem={(item: Notification) => (
						<ListItem onClick={() => {}}>
							<List.Item.Meta
								avatar={item.avatarUrl ? <Img src={item.avatarUrl} /> : null}
								title={item.title}
								description={dayjs(item.timestamp).fromNow()}
							/>
							{item.message}
						</ListItem>
					)}
				/>
				{notifications.length ? (
					<Button style={{ width: '100%' }} onClick={onClearNotifications}>
						{intl.get('ClearNotifications')}
					</Button>
				) : null}
			</React.Fragment>
		}
	>
		<Badge count={notifications.length} offset={[-20, 20]}>
			<NotifcationButton>
				<BellOutlined />
			</NotifcationButton>
		</Badge>
	</Popover>
);

export default Notifications;
