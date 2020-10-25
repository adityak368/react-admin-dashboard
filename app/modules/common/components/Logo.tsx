import React from 'react';
import logoShort from 'res/img/favicon.png';
import logoFull from 'res/img/logo.png';
import styled from 'styled-components';

const LogoContainer = styled.div`
	height: 40px;
	margin: 16px;
`;

interface LogoProps {
	isLinkActive?: boolean;
	isSideBarOpen?: boolean;
	openLinkInNewWindow?: boolean;
	url?: string;
	onClick?: () => void;
}

const Logo: React.FC<LogoProps> = ({
	isLinkActive = true,
	isSideBarOpen = true,
	url = '/',
	openLinkInNewWindow,
	onClick,
	...rest
}: LogoProps) => (
	<LogoContainer {...rest} id="logo">
		<a
			href={isLinkActive ? url : '#'}
			onClick={(e) => {
				e.preventDefault();
				onClick?.();
			}}
			target={openLinkInNewWindow ? '_blank' : '_self'}
		>
			<img style={{ width: '100%', height: '100%' }} src={!isSideBarOpen ? logoShort : logoFull} />
		</a>
	</LogoContainer>
);

export default Logo;
