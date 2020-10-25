import styled from 'styled-components';
import { Button } from 'antd';
import { MailOutlined, PhoneOutlined } from '@ant-design/icons';

export const SubmitButton = styled(Button)`
	float: right;
	margin-top: ${(props) => props.theme.spacing}px;
`;

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: space-between;
`;

export const ProfileItem = styled.div``;

export const MailOutlinedIcon = styled(MailOutlined)`
	margin: ${(props) => props.theme.spacing};
`;

export const PhoneOutlinedIcon = styled(PhoneOutlined)`
	margin: ${(props) => props.theme.spacing};
`;
