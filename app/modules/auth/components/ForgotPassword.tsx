import React, { useEffect } from 'react';
import intl from 'framework/localization/intl';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import { ForgotPasswordForm, forgotPasswordSchema } from 'modules/auth/form';
import { AntInput } from 'framework/components/formik';

import { Row, Col, Typography, Card } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { SubmitButton, LogoWrappedForAccounts, LoginLink, SignUpLink } from './AccountStyles';

import { IAuthState } from 'modules/auth/reducers';
import authActions from 'modules/auth/actions';

const { Title, Text } = Typography;

interface Props {
	onSubmit: (values: ForgotPasswordForm, actions: FormikHelpers<ForgotPasswordForm>) => void;
	auth: IAuthState;
	authActions: typeof authActions;
}

const ForgotPassword: React.FC<Props> = ({ onSubmit }) => {
	useEffect(() => {
		document.title = intl.get('ForgotPassword');
	}, []);
	return (
		<React.Fragment>
			<Row gutter={16} align="middle" justify="space-around" style={{ width: '100%', margin: 'auto' }}>
				<Col xs={{ span: 18 }} md={{ span: 12 }} lg={{ span: 8 }} style={{ textAlign: 'center' }}>
					<Card>
						<LogoWrappedForAccounts />
						<Title level={4}>{intl.get('ForgotPassword')}</Title>
						<Row>
							<Formik
								initialValues={{
									email: '',
								}}
								validationSchema={forgotPasswordSchema}
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
										<SubmitButton loading={isSubmitting} type="primary" htmlType="submit" disabled={isSubmitting}>
											{intl.get('Reset')}
										</SubmitButton>
									</Form>
								)}
							</Formik>
						</Row>
						<LoginLink to="/login" className="link-underline">
							<Text type="secondary">{intl.get('Login')}</Text>
						</LoginLink>
						<SignUpLink to="/signup" className="link-underline" style={{ float: 'right' }}>
							<Text type="secondary">{intl.get('SignUp')}</Text>
						</SignUpLink>
					</Card>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default ForgotPassword;
