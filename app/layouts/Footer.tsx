import intl from 'framework/localization/intl';
import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const FooterContainer = styled.footer`
	background-color: ${(props) => props.theme.headerColor};
	padding: 10px;
	box-shadow: 0px -2px 0px rgba(229, 229, 229, 0.5);
	height: ${(props) => props.theme.footerHeight}px;
	color: rgba(0, 0, 0, 0.45);
	display: flex;
	justify-content: flex-start;
	width: 100%;
`;

const FooterItem = styled.span`
	align-items: center;
	margin: auto 20px;
	justify-content: center;
`;

interface Props {}

const Footer: React.FC<Props> = () => (
	<FooterContainer id="footer">
		<FooterItem>
			<Link to="/privacy" className="link">
				{intl.get('Privacy')}
			</Link>
		</FooterItem>
		<FooterItem>
			{`${intl.get('ContactUs')}: `}&nbsp;
			<a href="mailto:support@admin.com" className="link">
				support@admin.com
			</a>
		</FooterItem>
		<FooterItem style={{ marginLeft: 'auto' }}>Copyright © {intl.get('AppName')}</FooterItem>
	</FooterContainer>
);

export default Footer;
