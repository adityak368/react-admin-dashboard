import { Button } from 'antd';
import Logo from 'modules/common/components/Logo';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const SubmitButton = styled(Button)`
	float: right;
	margin-top: ${(props) => props.theme.spacing}px;
`;

export const SignUpLink = styled(Link)`
	float: left;
	margin-top: ${(props) => props.theme.spacing}px;
`;

export const LoginLink = styled(Link)`
	float: left;
	margin-top: ${(props) => props.theme.spacing}px;
`;

export const ForgotPasswordLink = styled(Link)`
	float: right;
	margin-top: ${(props) => props.theme.spacing}px;
`;

export const LogoWrappedForAccounts = styled(Logo)`
	display: inline-block;
	width: 200px;
	height: ${(props) => props.theme.headerHeight}px;
`;
