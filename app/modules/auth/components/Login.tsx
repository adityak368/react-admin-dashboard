import React, { useEffect } from 'react';
import intl from 'framework/localization/intl';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import { LoginForm, loginSchema } from 'modules/auth/form';
import { AntInput } from 'framework/components/formik';

import { Row, Col, Typography, Card } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import { SubmitButton, LogoWrappedForAccounts, ForgotPasswordLink, SignUpLink } from './AccountStyles';

import { IAuthState } from 'modules/auth/reducers';
import authActions from 'modules/auth/actions';

const { Title, Text } = Typography;

interface Props {
	onSubmit: (values: LoginForm, actions: FormikHelpers<LoginForm>) => void;
	auth: IAuthState;
	authActions: typeof authActions;
}

const Login: React.FC<Props> = ({ onSubmit }: Props) => {
	useEffect(() => {
		document.title = intl.get('Login');
	}, []);
	return (
		<React.Fragment>
			<Row gutter={16} align="middle" justify="space-around" style={{ width: '100%', margin: 'auto' }}>
				<Col xs={{ span: 18 }} md={{ span: 12 }} lg={{ span: 8 }} style={{ textAlign: 'center' }}>
					<Card>
						<LogoWrappedForAccounts />
						<Title level={4}>{intl.get('Login')}</Title>
						<Row>
							<Formik
								initialValues={{
									email: '',
									password: '',
									rememberMe: false,
								}}
								validationSchema={loginSchema}
								onSubmit={onSubmit}
							>
								{({ isSubmitting }) => (
									<Form style={{ width: '100%' }}>
										<Field
											required
											name="email"
											type="text"
											prefix={
												<UserOutlined
													style={{
														color: 'rgba(0,0,0,.25)',
													}}
												/>
											}
											placeholder={intl.get('EmailId')}
											component={AntInput}
										/>
										<Field
											required
											placeholder={intl.get('Password')}
											name="password"
											prefix={
												<LockOutlined
													style={{
														color: 'rgba(0,0,0,.25)',
													}}
												/>
											}
											type="password"
											component={AntInput}
										/>
										<SubmitButton loading={isSubmitting} type="primary" htmlType="submit" disabled={isSubmitting}>
											{intl.get('Login')}
										</SubmitButton>
									</Form>
								)}
							</Formik>
						</Row>
						<SignUpLink to="/signup" className="link-underline">
							<Text type="secondary">{intl.get('SignUp')}</Text>
						</SignUpLink>
						<ForgotPasswordLink to="/forgotpassword" className="link-underline">
							<Text type="secondary">{intl.get('ForgotPassword')}</Text>
						</ForgotPasswordLink>
					</Card>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default Login;
