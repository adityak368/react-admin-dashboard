import React, { useEffect } from 'react';

import intl from 'framework/localization/intl';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import { RegistrationForm, registrationFormSchema } from 'modules/auth/form';

import { AntInput } from 'framework/components/formik';

import { Row, Col, Typography, Card } from 'antd';
import { LogoWrappedForAccounts, SubmitButton, SignUpLink } from './AccountStyles';

import { IAuthState } from 'modules/auth/reducers';
import authActions from 'modules/auth/actions';

const { Title, Text } = Typography;

interface Props {
	onSubmit: (values: RegistrationForm, actions: FormikHelpers<RegistrationForm>) => void;
	auth: IAuthState;
	authActions: typeof authActions;
}

const Registration: React.FC<Props> = ({ onSubmit }: Props) => {
	useEffect(() => {
		document.title = intl.get('SignUpNow');
	}, []);
	return (
		<React.Fragment>
			<Row gutter={16} align="middle" justify="space-around" style={{ width: '100%', margin: 'auto' }}>
				<Col xs={{ span: 18 }} md={{ span: 12 }} lg={{ span: 8 }} style={{ textAlign: 'center' }}>
					<Card>
						<LogoWrappedForAccounts />
						<Title level={3}>{intl.get('CandidateSignUp')}</Title>
						<Formik
							initialValues={{
								email: '',
								password: '',
								confirmpassword: '',
								name: '',
							}}
							validationSchema={registrationFormSchema}
							onSubmit={onSubmit}
						>
							{({ isSubmitting }) => (
								<Form>
									<Field
										required
										placeholder={intl.get('EmailId')}
										name="email"
										type="text"
										autoComplete="email"
										component={AntInput}
									/>
									<Field
										required
										placeholder={intl.get('Password')}
										name="password"
										type="password"
										component={AntInput}
									/>
									<Field
										required
										placeholder={intl.get('ConfirmPassword')}
										name="confirmpassword"
										type="password"
										component={AntInput}
									/>
									<Field required placeholder={intl.get('Name')} name="name" type="text" component={AntInput} />
									<SubmitButton loading={isSubmitting} type="primary" htmlType="submit" disabled={isSubmitting}>
										{intl.get('SignUp')}
									</SubmitButton>
								</Form>
							)}
						</Formik>
						<SignUpLink to="/login" className="link-underline">
							<Text type="secondary">{intl.get('Login')}</Text>
						</SignUpLink>
					</Card>
				</Col>
			</Row>
		</React.Fragment>
	);
};
export default Registration;
