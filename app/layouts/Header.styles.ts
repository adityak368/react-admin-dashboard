import styled from 'styled-components';
import { Layout, Menu, Button } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined, ApartmentOutlined, ExclamationCircleOutlined } from '@ant-design/icons';

export const HeaderContainer = styled(Layout.Header)`
	right: 0;
	top: 0;
	z-index: 10;
	background: ${(props) => props.theme.headerColor};
	position: fixed;
	line-height: ${(props) => props.theme.headerHeight}px;
	transition: 0.2s;
	left: 0;
	padding: 0;
	box-shadow: 0 2px 8px rgba(229, 229, 229, 0.5);
	display: flex;
	justify-content: flex-start;
`;

export const RightNav = styled.div`
	border: none;
	margin-left: auto;
	display: flex;
	top: 0;
	background: ${(props) => props.theme.headerColor};
	line-height: ${(props) => props.theme.headerHeight}px;
`;

export const LoginButton = styled(Button)`
	margin: auto 10px auto auto;
`;

export const RightNavItem = styled(Menu)`
	line-height: ${(props) => props.theme.headerHeight}px;
	border: none;
`;

export const MenuFoldOutlinedIcon = styled(MenuFoldOutlined)`
	cursor: pointer;
	transition: color 0.3s;
	:hover {
		color: ${(props) => props.theme.hoverColor};
	}
	line-height: ${(props) => props.theme.headerHeight}px;
	padding: 0 24px;
`;

export const MenuUnfoldOutlinedIcon = styled(MenuUnfoldOutlined)`
	cursor: pointer;
	transition: color 0.3s;
	:hover {
		color: ${(props) => props.theme.hoverColor};
	}
	line-height: ${(props) => props.theme.headerHeight}px;
	padding: 0 24px;
`;

export const ApartmentOutlinedIcon = styled(ApartmentOutlined)`
	cursor: pointer;
	transition: color 0.3s;
	line-height: ${(props) => props.theme.headerHeight}px;
	padding: 0 24px;
	color: green;
`;

export const ExclamationCircleOutlinedIcon = styled(ExclamationCircleOutlined)`
	cursor: pointer;
	transition: color 0.3s;
	line-height: ${(props) => props.theme.headerHeight}px;
	padding: 0 24px;
	color: red;
`;
