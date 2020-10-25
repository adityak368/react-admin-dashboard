import { CheckOutlined } from '@ant-design/icons';
import { Button, Card, Descriptions, Form, Result } from 'antd';
import { Field, Formik, FormikHelpers } from 'formik';
import { AntInput, AntSelect } from 'framework/components/formik';
import intl from 'framework/localization/intl';
import React, { useEffect } from 'react';
import { feature1form, Feature1Form } from '../form';

const formItemLayout = {
	labelCol: {
		xs: { span: 24 },
		sm: { span: 8 },
	},
	wrapperCol: {
		xs: { span: 24 },
		sm: { span: 12 },
	},
};

const Feature1: React.FC = () => {
	useEffect(() => {
		document.title = intl.get('Feature1');
	}, []);

	return (
		<React.Fragment>
			<Card>
				<Result
					status="success"
					title="Successfully Purchased Cloud Server ECS!"
					subTitle="Order number: 2017182818828182881 Cloud server configuration takes 1-5 minutes, please wait."
					extra={[
						<Button type="primary" key="console">
							Go Console
						</Button>,
						<Button key="buy">Buy Again</Button>,
					]}
				/>
				<Card>
					<Descriptions style={{ marginTop: 20 }} title="User Info">
						<Descriptions.Item label="UserName">Aditya K</Descriptions.Item>
						<Descriptions.Item label="Telephone">9876543210</Descriptions.Item>
						<Descriptions.Item label="Live">United Kingdom</Descriptions.Item>
						<Descriptions.Item label="Remark">No Remarks</Descriptions.Item>
						<Descriptions.Item label="Address">WestMinster 10, London, England</Descriptions.Item>
					</Descriptions>
				</Card>
				<div style={{ marginTop: 20 }}>
					<Formik
						initialValues={{
							id: '',
							password: '',
							name: '',
							description: '',
						}}
						validationSchema={feature1form}
						onSubmit={(values: Feature1Form, actions: FormikHelpers<Feature1Form>) => {}}
					>
						{({ isSubmitting }) => (
							<Form style={{ width: '100%' }}>
								<Field
									disabled={true}
									formItemProps={{ ...formItemLayout }}
									name="id"
									type="text"
									placeholder={intl.get('User')}
									label={intl.get('User')}
									component={AntInput}
								/>
								<Field
									formItemProps={{ ...formItemLayout }}
									name="password"
									type="text"
									placeholder={intl.get('Password')}
									label={intl.get('Password')}
									component={AntInput}
								/>
								<Field
									formItemProps={{ ...formItemLayout }}
									name="name"
									type="text"
									placeholder={intl.get('Name')}
									label={intl.get('Name')}
									component={AntInput}
								/>
								<Field
									formItemProps={{ ...formItemLayout }}
									name="description"
									type="text"
									placeholder={intl.get('Description')}
									label={intl.get('Description')}
									selectOptions={['Option1', 'Option2', 'Option3', 'Option4'].map((item) => ({
										key: item,
										value: item,
									}))}
									component={AntSelect}
								/>
								<Button
									loading={isSubmitting}
									htmlType="submit"
									disabled={isSubmitting}
									type="primary"
									style={{ float: 'right', margin: 5 }}
								>
									<CheckOutlined />
									{intl.get('Save')}
								</Button>
							</Form>
						)}
					</Formik>
				</div>
			</Card>
		</React.Fragment>
	);
};

export default Feature1;
