import { Menu } from 'antd';
import { SiderTheme } from 'antd/lib/layout/Sider';
import settings from 'framework/settings/settings';
import theme from 'framework/styles/theme';
import { LogoContainer, SideBarContainer } from 'layouts/Sidebar.styles';
import { IAuthState } from 'modules/auth/reducers';
import React, { Component } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import ROUTES_ITEMS from 'routing/routedefs';

interface Props {
	auth: IAuthState;
	isSideBarOpen: boolean;
}

class SideBar extends Component<RouteComponentProps<Props>, {}> {
	onMenuItemClicked = (path: string, item: string) => {
		settings.set('lastSelectedMenu', item);
		const { history } = this.props;
		history.push(path);
	};

	render() {
		const { isSideBarOpen, auth } = this.props;
		const selectedItem = settings.get('lastSelectedMenu') || window.location.pathname;

		const menuItems = [];
		ROUTES_ITEMS.forEach((item) => {
			if (item.isInSideMenu || (auth.isLoggedIn && item.isInSideMenuWhenLoggedIn)) {
				//handle submenus
				if (Array.isArray(item.subMenus)) {
					menuItems.push(
						<Menu.SubMenu key={item.path} icon={item.icon} title={item.text}>
							{item.subMenus.reduce((acc, subMenuItem) => {
								const subPath = item.path + subMenuItem.path;
								acc.push(
									<Menu.Item key={subPath} onClick={() => this.onMenuItemClicked(subPath, subPath)}>
										{subMenuItem.icon}
										<span>{subMenuItem.text}</span>
									</Menu.Item>
								);
								return acc;
							}, [])}
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
			<SideBarContainer width={theme.sideBarWidth} breakpoint="lg" trigger={null} collapsible collapsed={!isSideBarOpen}>
				<LogoContainer isSideBarOpen={isSideBarOpen} />
				<Menu
					theme={theme.name as SiderTheme}
					selectable
					selectedKeys={[selectedItem]}
					mode="inline"
					style={{ height: '100%', borderRight: 0 }}
				>
					{menuItems}
				</Menu>
			</SideBarContainer>
		);
	}
}

export default withRouter(SideBar);
