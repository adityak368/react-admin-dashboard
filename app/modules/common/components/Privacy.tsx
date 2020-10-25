import React, { useEffect } from 'react';
import intl from 'framework/localization/intl';

import { Row, Col, Typography } from 'antd';

import { IAuthState } from 'modules/auth/reducers';
import authActions from 'modules/auth/actions';

interface Props {
	auth: IAuthState;
	authActions: typeof authActions;
}

const Privacy: React.FC<Props> = ({ auth, authActions }) => {
	useEffect(() => {
		document.title = intl.get('Privacy');
	}, []);
	return (
		<React.Fragment>
			<Row justify="space-around">
				<Col span={20} offset={2}>
					<div>
						<Typography.Title level={4}>Privacy Policy – Your Privacy, Our Concern.</Typography.Title>
						In order to provide our full range of services, we may collect the following types of information:
						<Typography.Title level={4}>What information do we collect?</Typography.Title>
						We collect information from you when you register on our site, fill out a form or use our service.
						<Typography.Title level={4}>Your Personal Information</Typography.Title>
						When registering on our site, as appropriate, you may be asked to enter your name and e-mail address, mobile
						phone number and for some services address etc.
						<Typography.Title level={4}>What do we use your information for?</Typography.Title>
						Any of the information we collect from you may be used in one of the following ways:
						<Typography.Title level={4}>To send periodic emails and SMS</Typography.Title>
						The email address you provide may be used to send you information, respond to inquiries, and/or other requests
						or questions. We may also send you emails to tell you about customized offers and or newer offerings which may
						help you save money. We may also send you emails to apprise you of problems with our systems which negatively
						impacted you.
						<Typography.Title level={4}>Market Research Participation</Typography.Title>
						From time to time, we may also use your information to contact you for market research purposes. We may contact
						you by email, phone, fax or mail. We may use the information to customize the website according to your
						interests.
						<Typography.Title level={4}>How do we protect your information?</Typography.Title>
						We implement a variety of security measures to maintain the safety of your personal information when you enter,
						submit or access your personal information. However we are not legally responsible for the accidental leakage
						of this information.
						<Typography.Title level={4}>Do we use cookies?</Typography.Title>
						Yes. Cookies are small files that a site or its service provider transfers to your computer’s hard drive
						through your Web browser (if you allow) that enables the sites or service providers systems to recognize your
						browser and capture and remember certain information. We use cookies to understand and save your preferences
						for future visits and compile aggregate data about site traffic and site interaction so that we can offer
						better site experiences and tools in the future.
						<Typography.Title level={4}>Do we disclose any information to outside parties?</Typography.Title>
						We do not sell, trade, or otherwise transfer to outside parties your personally identifiable information. This
						does not include trusted third parties who assist us in operating our website, conducting our business, or
						servicing you, so long as those parties agree to keep this information confidential. We may also release your
						information when we believe that such release is appropriate to comply with the law, enforce our site policies
						or protect others or ours rights, property, or safety. However, non-personally identifiable visitor information
						may be provided to other parties for marketing, advertising, or other uses.
						<Typography.Title level={4}>Online Privacy Policy Only</Typography.Title>
						This online privacy policy applies only to information collected through our website and not to information
						collected offline.
						<Typography.Title level={4}>Changes to our Privacy Policy</Typography.Title>
						If we decide to change our privacy policy, we will post those changes on this page, send an email notifying you
						of any changes and/or update the Privacy Policy modification date. Our site contains links to other sites and
						we are not responsible for the privacy practices or the content of such other sites. We do not monitor or
						control the content of such linked sites. Those sites may have their own privacy statements in place, which we
						recommend you to review if you visit any linked web sites.
						<Typography.Title level={4}>Disclaimer for Links to our site</Typography.Title>
						We are not responsible for the content of links to our site and their accuracy. We welcome links to our site
						from external sites but are in no way responsible for their accuracy. Links on this website may also change
						without prior notice.
						<Typography.Title level={4}>You’re Consent</Typography.Title>
						By using our site, you’re consent to our privacy policy.
					</div>
				</Col>
			</Row>
		</React.Fragment>
	);
};
export default Privacy;
