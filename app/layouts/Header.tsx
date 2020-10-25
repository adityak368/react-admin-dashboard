import { KeyOutlined, LogoutOutlined, UserOutlined } from '@ant-design/icons';
import { Avatar, Menu } from 'antd';
import intl from 'framework/localization/intl';
import { getUserName } from 'framework/utils';
import { IAuthState } from 'modules/auth/reducers';
import Notifications from 'modules/notification/components/Notifications';
import React from 'react';
import ReactCountryFlag from 'react-country-flag';
import { Else, If, Then } from 'react-if';
import { Link, withRouter } from 'react-router-dom';
import userPlaceHolder from 'res/img/user-placeholder.png';
import {
	HeaderContainer,
	LoginButton,
	MenuFoldOutlinedIcon,
	MenuUnfoldOutlinedIcon,
	RightNav,
	RightNavItem
} from './Header.styles';

const { SubMenu } = Menu;

interface Props {
	auth: IAuthState;
	changeSideBarState: (isSideBarOpen: boolean) => void;
	changeDrawerState: (drawerIsOpen: boolean) => void;
	isSideBarOpen: boolean;
	left: number;
	drawerIsOpen: boolean;
	isMobile: boolean;
	notifications: Array<Notification>;
	clearNotifications: () => void;
	onLogout: () => void;
	onLogin: () => void;
	changeLanguage: (language: string) => void;
}

const Header: React.FC<Props> = ({
	auth,
	isSideBarOpen,
	left,
	drawerIsOpen,
	changeDrawerState,
	changeSideBarState,
	isMobile,
	notifications,
	clearNotifications,
	onLogout,
	changeLanguage,
	onLogin,
}) => {
	const currentLanguage = intl.getCurrentLanguage();
	const languages = intl.getLanguages();
	return (
		<React.Fragment>
			<HeaderContainer id="header" style={{ left }}>
				<If condition={isMobile}>
					<Then>
						<If condition={drawerIsOpen}>
							<Then>
								<MenuFoldOutlinedIcon
									onClick={() => {
										if (isMobile) {
											changeDrawerState(!drawerIsOpen);
										} else {
											changeSideBarState(!isSideBarOpen);
										}
									}}
								/>
							</Then>
							<Else>
								<MenuUnfoldOutlinedIcon
									onClick={() => {
										if (isMobile) {
											changeDrawerState(!drawerIsOpen);
										} else {
											changeSideBarState(!isSideBarOpen);
										}
									}}
								/>
							</Else>
						</If>
					</Then>
					<Else>
						<If condition={isSideBarOpen}>
							<Then>
								<MenuFoldOutlinedIcon
									onClick={() => {
										if (isMobile) {
											changeDrawerState(!drawerIsOpen);
										} else {
											changeSideBarState(!isSideBarOpen);
										}
									}}
								/>
							</Then>
							<Else>
								<MenuUnfoldOutlinedIcon
									onClick={() => {
										if (isMobile) {
											changeDrawerState(!drawerIsOpen);
										} else {
											changeSideBarState(!isSideBarOpen);
										}
									}}
								/>
							</Else>
						</If>
					</Else>
				</If>
				<RightNav>
					<Notifications onClearNotifications={clearNotifications} notifications={notifications} />
					<RightNavItem selectable={false} mode="horizontal">
						<SubMenu
							title={
								<ReactCountryFlag
									svg
									countryCode={languages[currentLanguage].countryCode}
									title={languages[currentLanguage].nativeName}
								/>
							}
							popupClassName="languagePopup"
						>
							{Object.keys(languages).map((language) => (
								<Menu.Item key={language} onClick={() => changeLanguage(language)}>
									<ReactCountryFlag
										style={{ marginRight: 10 }}
										svg
										countryCode={languages[language].countryCode}
										title={languages[language].nativeName}
									/>
									{languages[language].nativeName}
								</Menu.Item>
							))}
						</SubMenu>
					</RightNavItem>
					<If condition={auth.isLoggedIn}>
						<Then>
							<RightNavItem selectable={false} mode="horizontal">
								<SubMenu
									key="user"
									title={
										<React.Fragment>
											<span>{getUserName(auth.user)}</span>
											<Avatar
												style={{ marginLeft: 8 }}
												src={auth.user?.avatarUrl ? auth.user?.avatarUrl : userPlaceHolder}
											/>
										</React.Fragment>
									}
								>
									<Menu.Item>
										<Link to={'/profile'}>
											<span>
												<UserOutlined />
												<span>{intl.get('Profile')}</span>
											</span>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link to={'/changepassword'}>
											<span>
												<KeyOutlined />
												<span>{intl.get('ChangePassword')}</span>
											</span>
										</Link>
									</Menu.Item>
									<Menu.Item>
										<Link to="#" onClick={onLogout}>
											{
												<span>
													<LogoutOutlined />
													<span>{intl.get('Logout')}</span>
												</span>
											}
										</Link>
									</Menu.Item>
								</SubMenu>
							</RightNavItem>
						</Then>
						<Else>
							<LoginButton onClick={onLogin}>{intl.get('Login')}</LoginButton>
						</Else>
					</If>
				</RightNav>
			</HeaderContainer>
		</React.Fragment>
	);
};

export default withRouter(Header);
