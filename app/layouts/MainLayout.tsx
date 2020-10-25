import React from 'react';

import SideBar from 'layouts/SideBar';
import Header from 'layouts/HeaderContainer';
import Footer from 'layouts/Footer';
import Drawer from 'layouts/Drawer';

import theme from 'framework/styles/theme';
import { Content, ContentWrapper } from './MainLayout.styles';
import withSizes from 'react-sizes';
import { Breadcrumbs } from 'react-breadcrumbs';

import { IAuthState } from 'modules/auth/reducers';
import authActions from 'modules/auth/actions';

import { Layout } from 'antd';

import { If, Then, Else } from 'react-if';

interface Props {
	auth: IAuthState;
	authActions: typeof authActions;
	isMobile: boolean;
	isTablet: boolean;
	isDesktop: boolean;
	componentToRender: any;
}

interface State {
	isSideBarOpen: boolean;
	drawerIsOpen: boolean;
}

class MainLayout extends React.Component<Props, State> {
	state = {
		isSideBarOpen: false,
		drawerIsOpen: false,
	};

	changeSideBarState = (isSideBarOpen: boolean) => {
		this.setState({ isSideBarOpen });
	};

	changeDrawerState = (drawerIsOpen: boolean) => {
		this.setState({ drawerIsOpen });
	};

	render() {
		const { auth, authActions, isMobile, isTablet, componentToRender, ...rest } = this.props;
		const { isSideBarOpen, drawerIsOpen } = this.state;

		let left = isSideBarOpen ? theme.sideBarExpandedWidth : theme.sideBarCollapsedWidth;
		if (isMobile) {
			left = 0;
		}
		return (
			<Layout hasSider={true}>
				<If condition={!isMobile}>
					<Then>
						<SideBar isSideBarOpen={isSideBarOpen} auth={auth} />
					</Then>
					<Else>
						<Drawer drawerIsOpen={drawerIsOpen} auth={auth} changeDrawerState={this.changeDrawerState} />
					</Else>
				</If>
				<Layout style={{ height: '100vh' }}>
					<Header
						left={left}
						changeSideBarState={this.changeSideBarState}
						changeDrawerState={this.changeDrawerState}
						isSideBarOpen={isSideBarOpen}
						drawerIsOpen={drawerIsOpen}
						isMobile={isMobile}
					/>
					<Content
						style={{
							marginLeft: left,
						}}
					>
						<ContentWrapper>
							<div style={{ margin: 5 }}>
								<Breadcrumbs />
							</div>
							{React.createElement(componentToRender, {
								auth,
								authActions,
								...rest,
							})}
						</ContentWrapper>
						<Footer />
					</Content>
				</Layout>
			</Layout>
		);
	}
}
const mapSizesToProps = ({ width }) => ({
	isMobile: width < 576,
	isTablet: width >= 576 && width < 1024,
	isDesktop: width >= 1024,
});

export default withSizes(mapSizesToProps)(MainLayout);
