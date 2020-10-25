import { Card, Col, Row, Typography } from 'antd';
import config from 'app/config';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { AntInput } from 'framework/components/formik';
import intl from 'framework/localization/intl';
import settings from 'framework/settings/settings';
import { getUserEmail, getUserName } from 'framework/utils';
import authActions from 'modules/auth/actions';
import { Container, MailOutlinedIcon, PhoneOutlinedIcon, ProfileItem, SubmitButton } from 'modules/auth/components/ProfileStyles';
import { ProfileForm, profileSchema } from 'modules/auth/form';
import { IAuthState } from 'modules/auth/reducers';
import AvatarUpload from 'modules/common/components/AvatarUpload';
import React, { useEffect } from 'react';

interface Props {
	authActions: typeof authActions;
	auth: IAuthState;
	onSubmit: (values: ProfileForm, actions: FormikHelpers<ProfileForm>) => void;
}

const Profile: React.FC<Props> = ({ auth, onSubmit, authActions }) => {
	useEffect(() => {
		document.title = intl.get('Profile');
	}, []);
	return (
		<Row gutter={16} justify="space-around" style={{ width: '100%' }}>
			<Col xs={24} sm={8}>
				<Card style={{ minHeight: '80vh' }}>
					<Container>
						<AvatarUpload
							defaultImageUrl={auth.user.avatarUrl}
							onSuccess={(response) => authActions.editProfile(response)}
							headers={{ 'x-auth-token': `Bearer ${settings.get('authToken')}` }}
							name="avatar"
							action="/auth/profile/upload"
							maxAvatarSize={config.maxAvatarFileSize}
						/>
						<Typography.Title level={4}>{getUserName(auth.user)}</Typography.Title>
						<ProfileItem>
							<MailOutlinedIcon style={{ marginRight: 5 }} />
							<Typography.Text type="secondary">{getUserEmail(auth.user)}</Typography.Text>
						</ProfileItem>
						<ProfileItem>
							<PhoneOutlinedIcon style={{ marginRight: 5 }} />
							<Typography.Text type="secondary">{auth.user.contact}</Typography.Text>
						</ProfileItem>
					</Container>
				</Card>
			</Col>
			<Col xs={24} sm={16}>
				<Card>
					<Typography.Title level={4}>{intl.get('EditProfile')}</Typography.Title>
					<Formik
						initialValues={{
							name: auth.user?.name || '',
							contact: auth.user?.contact || '',
							headline: auth.user?.headline || '',
						}}
						validationSchema={profileSchema}
						onSubmit={onSubmit}
					>
						{({ isSubmitting }) => (
							<Form>
								<Row gutter={16} justify="space-around">
									<Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ textAlign: 'center' }}>
										<Field type="text" required placeholder={intl.get('Name')} name="name" component={AntInput} />
										<Field
											style={{
												flex: 1,
											}}
											type="text"
											placeholder={intl.get('Contact')}
											name="contact"
											component={AntInput}
										/>
									</Col>
									<Col xs={{ span: 24 }} md={{ span: 12 }} lg={{ span: 12 }} style={{ textAlign: 'center' }}>
										<Field
											type="text"
											placeholder={intl.get('ProfileSummary')}
											name="headline"
											component={AntInput}
										/>
									</Col>
								</Row>
								<SubmitButton loading={isSubmitting} type="primary" htmlType="submit" disabled={isSubmitting}>
									{intl.get('Save')}
								</SubmitButton>
							</Form>
						)}
					</Formik>
				</Card>
			</Col>
		</Row>
	);
};

export default Profile;
