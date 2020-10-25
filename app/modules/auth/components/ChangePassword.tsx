import React, { useEffect } from 'react';
import intl from 'framework/localization/intl';

import { Formik, Form, Field, FormikHelpers } from 'formik';
import { changePasswordSchema, ChangePasswordForm } from 'modules/auth/form';
import { AntInput } from 'framework/components/formik';

import { Row, Col, Typography, Card } from 'antd';
import { KeyOutlined } from '@ant-design/icons';

import { IAuthState } from 'modules/auth/reducers';
import authActions from 'modules/auth/actions';
import { SubmitButton, LogoWrappedForAccounts } from './AccountStyles';

const { Title } = Typography;

interface Props {
	onChangePassword: (values: ChangePasswordForm, actions: FormikHelpers<ChangePasswordForm>) => void;
	auth: IAuthState;
	authActions: typeof authActions;
}

const ChangePassword: React.FC<Props> = ({ onChangePassword }: Props) => {
	useEffect(() => {
		document.title = intl.get('ChangePassword');
	}, []);
	return (
		<React.Fragment>
			<Row
				style={{
					width: '100%',
					margin: 'auto',
				}}
				gutter={16}
				align="middle"
				justify="space-around"
			>
				<Col xs={{ span: 18 }} md={{ span: 12 }} lg={{ span: 10 }} style={{ textAlign: 'center' }}>
					<Card>
						<LogoWrappedForAccounts />
						<Title level={4}>{intl.get('ChangePassword')}</Title>
						<Row>
							<Formik
								initialValues={{
									oldpassword: '',
									newpassword: '',
									confirmnewpassword: '',
								}}
								validationSchema={changePasswordSchema}
								onSubmit={onChangePassword}
							>
								{({ isSubmitting }) => (
									<Form style={{ width: '100%' }}>
										<Field
											required
											name="oldpassword"
											type="password"
											prefix={
												<KeyOutlined
													style={{
														color: 'rgba(0,0,0,.25)',
													}}
												/>
											}
											placeholder={intl.get('OldPassword')}
											component={AntInput}
										/>
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
											{intl.get('ChangePassword')}
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

export default ChangePassword;
