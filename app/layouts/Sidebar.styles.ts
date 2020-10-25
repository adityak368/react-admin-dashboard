import styled from 'styled-components';
import { Layout } from 'antd';
import Logo from 'modules/common/components/Logo';

export const SideBarContainer = styled(Layout.Sider)`
	top: 0;
	left: 0;
	overflow: hidden;
	height: 100vh;
	transition: 0.2s;
	position: fixed;
`;

export const LogoContainer = styled(Logo)`
	height: 40px;
	//background: 'rgba(255,255,255,0.2)',
	margin: 16px;
`;
