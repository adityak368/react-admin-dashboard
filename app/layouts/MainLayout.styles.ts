import styled from 'styled-components';
import { Layout } from 'antd';

export const Content = styled(Layout.Content)`
	flex: 1;
	transition: 0.2s;
	margin-top: ${(props) => props.theme.headerHeight + 8}px;
	padding: 0;
	display: flex;
	flex-direction: column;
	height: calc(100vh - ${(props) => props.theme.headerHeight}px);
`;

export const ContentWrapper = styled.div`
	padding: 16px 24px;
	display: flex;
	flex-direction: column;
	flex: 1;
`;
