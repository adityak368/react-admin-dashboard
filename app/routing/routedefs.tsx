import {
	AlertOutlined,
	CoffeeOutlined,
	DashboardOutlined,
	DeploymentUnitOutlined,
	FormOutlined,
	KeyOutlined,
	LockOutlined,
	OrderedListOutlined,
	QuestionOutlined,
	RadarChartOutlined,
	UserAddOutlined,
	UserOutlined,
} from '@ant-design/icons';
import intl from 'framework/localization/intl';
import ChangePassword from 'modules/auth/components/ChangePasswordContainer';
import ForgotPassword from 'modules/auth/components/ForgotPasswordContainer';
import LoginContainer from 'modules/auth/components/LoginContainer';
import ProfileContainer from 'modules/auth/components/ProfileContainer';
import RegistrationContainer from 'modules/auth/components/RegistrationContainer';
import ResetPassword from 'modules/auth/components/ResetPasswordContainer';
import AddSomethingPage from 'modules/common/components/AddSomethingPage';
import NotFoundPage from 'modules/common/components/NotFoundPage';
import Privacy from 'modules/common/components/Privacy';
import DashboardContainer from 'modules/dashboard/components/DashboardContainer';
import Feature1Container from 'modules/feature1/components/Feature1Container';
import Feature2Container from 'modules/feature2/components/Feature2Container';
import React from 'react';

const routeDefs: Array<RouteDefinition> = [
	{
		path: '/',
		text: intl.get('Dashboard'),
		icon: <DashboardOutlined />,
		exact: true,
		componentToRender: DashboardContainer,
		isProtected: false,
		isInSideMenu: true,
	},
	{
		path: '/feature1',
		text: intl.get('Feature1'),
		icon: <FormOutlined />,
		exact: true,
		isProtected: true,
		isInSideMenu: true,
		componentToRender: null,
		subMenus: [
			{
				path: '/subfeature1',
				text: intl.get('SubFeature1'),
				icon: <RadarChartOutlined />,
				exact: true,
				componentToRender: Feature1Container,
				isProtected: false,
				isInSideMenu: true,
			},
			{
				path: '/subfeature2',
				text: intl.get('SubFeature2'),
				icon: <AlertOutlined />,
				exact: true,
				componentToRender: Feature2Container,
				isProtected: false,
				isInSideMenu: true,
			},
		],
	},
	{
		path: '/feature2',
		text: intl.get('Feature2'),
		icon: <OrderedListOutlined />,
		exact: true,
		componentToRender: null,
		isProtected: true,
		isInSideMenu: true,
		subMenus: [
			{
				path: '/subfeature3',
				text: intl.get('SubFeature3'),
				icon: <CoffeeOutlined />,
				exact: true,
				componentToRender: AddSomethingPage,
				isProtected: false,
				isInSideMenu: true,
			},
			{
				path: '/subfeature4',
				text: intl.get('SubFeature4'),
				icon: <DeploymentUnitOutlined />,
				exact: true,
				componentToRender: AddSomethingPage,
				isProtected: true,
				isInSideMenu: true,
			},
		],
	},
	{
		path: '/profile',
		text: intl.get('Profile'),
		icon: <UserOutlined />,
		exact: true,
		componentToRender: ProfileContainer,
		isProtected: true,
		isInSideMenu: false,
	},
	{
		path: '/login',
		text: intl.get('Login'),
		icon: <UserOutlined />,
		exact: true,
		componentToRender: LoginContainer,
		isProtected: false,
		isInSideMenu: false,
		isRouteHiddenWhenLoggedIn: true,
	},
	{
		path: '/signup',
		text: intl.get('Register'),
		icon: <UserAddOutlined />,
		exact: true,
		componentToRender: RegistrationContainer,
		isProtected: false,
		isInSideMenu: false,
		isRouteHiddenWhenLoggedIn: true,
	},
	{
		path: '/forgotpassword',
		text: intl.get('ForgotPassword'),
		icon: <LockOutlined />,
		exact: true,
		componentToRender: ForgotPassword,
		isProtected: false,
		isInSideMenu: false,
		isNewPage: false,
		isRouteHiddenWhenLoggedIn: true,
	},
	{
		path: '/changepassword',
		text: intl.get('ChangePassword'),
		icon: <KeyOutlined />,
		exact: true,
		componentToRender: ChangePassword,
		isProtected: true,
		isInSideMenu: false,
		isNewPage: false,
	},
	{
		path: '/reset',
		text: intl.get('ResetPassword'),
		icon: <LockOutlined />,
		exact: true,
		componentToRender: ResetPassword,
		isProtected: false,
		isInSideMenu: false,
		isNewPage: true,
		isRouteHiddenWhenLoggedIn: true,
	},
	{
		path: '/privacy',
		text: intl.get('Privacy'),
		icon: <QuestionOutlined />,
		exact: true,
		componentToRender: Privacy,
		isProtected: false,
		isInSideMenu: false,
		isNewPage: false,
	},
	{
		path: '/*',
		text: intl.get('NotFoundPage'),
		icon: null,
		exact: false,
		componentToRender: NotFoundPage,
		isProtected: false,
		isInSideMenu: false,
	},
];

export default routeDefs;
