import React, { useEffect } from 'react';
import intl from 'framework/localization/intl';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import { resetPasswordSchema, ResetPasswordForm } from 'modules/auth/form';
import { AntInput } from 'framework/components/formik';

import { Row, Col, Typography, Card } from 'antd';
import { KeyOutlined } from '@ant-design/icons';
import { SubmitButton, LogoWrappedForAccounts } from './AccountStyles';

import { IAuthState } from 'modules/auth/reducers';
import authActions from 'modules/auth/actions';

const { Title } = Typography;

interface Props {
	onSubmit: (values: ResetPasswordForm, actions: FormikHelpers<ResetPasswordForm>) => void;
	auth: IAuthState;
	authActions: typeof authActions;
}

const ResetPassword: React.FC<Props> = ({ onSubmit }: Props) => {
	useEffect(() => {
		document.title = intl.get('ResetPassword');
	}, []);
	return (
		<React.Fragment>
			<Row gutter={16} align="middle" justify="space-around" style={{ width: '100%', margin: 'auto' }}>
				<Col xs={{ span: 18 }} md={{ span: 12 }} lg={{ span: 8 }} style={{ textAlign: 'center' }}>
					<Card>
						<LogoWrappedForAccounts />
						<Title level={4}>{intl.get('ResetPassword')}</Title>
						<Row>
							<Formik
								initialValues={{
									newpassword: '',
									confirmnewpassword: '',
									token: '',
								}}
								validationSchema={resetPasswordSchema}
								onSubmit={onSubmit}
							>
								{({ isSubmitting }) => (
									<Form>
										<Field
											required
											placeholder={intl.get('NewPassword')}
											name="newpassword"
											prefix={
												<KeyOutlined
													style={{
														color: 'rgba(0,0,0,.25)',
													}}
												/>
											}
											type="password"
											component={AntInput}
										/>
										<Field
											required
											placeholder={intl.get('ConfirmNewPassword')}
											name="confirmnewpassword"
											prefix={
												<KeyOutlined
													style={{
														color: 'rgba(0,0,0,.25)',
													}}
												/>
											}
											type="password"
											component={AntInput}
										/>
										<SubmitButton loading={isSubmitting} type="primary" htmlType="submit" disabled={isSubmitting}>
											{intl.get('Reset')}
										</SubmitButton>
									</Form>
								)}
							</Formik>
						</Row>
					</Card>
				</Col>
			</Row>
		</React.Fragment>
	);
};

export default ResetPassword;
