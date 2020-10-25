import { Drawer, Menu } from 'antd';
import settings from 'framework/settings/settings';
import { IAuthState } from 'modules/auth/reducers';
import Logo from 'modules/common/components/Logo';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ROUTES_ITEMS from 'routing/routedefs';
import styled from 'styled-components';

export const LogoContainer = styled(Logo)`
	height: 40px;
	margin: 16px;
`;

interface Props {
	auth: IAuthState;
	drawerIsOpen: boolean;
	changeDrawerState: (drawerIsOpen: boolean) => void;
}

class DrawerWrapper extends Component<RouteComponentProps<Props>, {}> {
	onMenuItemClicked = (path: string, item: string) => {
		settings.set('lastSelectedMenu', item);
		const { history } = this.props;
		history.push(path);
	};

	render() {
		const { drawerIsOpen, auth, changeDrawerState } = this.props;
		const selectedItem = settings.get('lastSelectedMenu') || window.location.pathname;

		const menuItems = [];
		ROUTES_ITEMS.forEach((item) => {
			if (item.isInSideMenu || (auth.isLoggedIn && item.isInSideMenuWhenLoggedIn)) {
				//handle submenus
				if (Array.isArray(item.subMenus)) {
					menuItems.push(
						<Menu.SubMenu key={item.path} icon={item.icon} title={item.text}>
							{item.subMenus.map((subMenuItem) => {
								const subPath = item.path + subMenuItem.path;
								return (
									<Menu.Item key={subPath} onClick={() => this.onMenuItemClicked(subPath, subPath)}>
										{subMenuItem.icon}
										<span>{subMenuItem.text}</span>
									</Menu.Item>
								);
							})}
						</Menu.SubMenu>
					);
					return;
				}
				//nosubmenus
				menuItems.push(
					<Menu.Item key={item.path} onClick={() => this.onMenuItemClicked(item.path, item.path)}>
						{item.icon}
						<span>{item.text}</span>
					</Menu.Item>
				);
			}
		});

		return (
			<Drawer
				title={<LogoContainer />}
				placement="right"
				closable={true}
				onClose={() => changeDrawerState(false)}
				visible={drawerIsOpen}
				bodyStyle={{
					top: 0,
					left: 0,
					overflow: 'auto',
					height: '100vh',
					transition: '0.2s',
					padding: 0,
				}}
			>
				<Menu mode="inline" selectedKeys={[selectedItem]} style={{ height: '100%', borderRight: 0 }}>
					{menuItems}
				</Menu>
			</Drawer>
		);
	}
}

export default withRouter(DrawerWrapper);
