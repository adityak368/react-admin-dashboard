import intl from 'framework/localization/intl';
import * as Yup from 'yup';

export interface RegistrationForm {
	email: string;
	password: string;
	confirmpassword: string;
	name: string;
}

export interface LoginForm {
	email: string;
	password: string;
	rememberMe: boolean;
}

export interface ProfileForm {
	name: string;
	contact?: string;
	headline?: string;
}

export interface ChangePasswordForm {
	oldpassword: string;
	newpassword: string;
	confirmnewpassword: string;
}

export interface ResetPasswordForm {
	token: string;
	newpassword: string;
	confirmnewpassword: string;
}

export interface ForgotPasswordForm {
	email: string;
}

const equalTo = (ref: any, msg: string) => {
	return Yup.mixed().test({
		name: 'equalTo',
		exclusive: false,
		message: msg || '${path} must be the same as ${reference}',
		params: {
			reference: ref.path,
		},
		test: function (value: any) {
			return value === this.resolve(ref);
		},
	});
};

Yup.addMethod(Yup.string, 'equalTo', equalTo);

export const registrationFormSchema = Yup.object().shape({
	email: Yup.string().email(intl.get('ErrorInvalidEmailId')).required(intl.get('ErrorEnterEmailId')),
	password: Yup.string().required(intl.get('ErrorEnterPassword')),
	confirmpassword: Yup.string()
		.equalTo(Yup.ref('password'), intl.get('ErrorInconsistentPasswords'))
		.required(intl.get('ErrorConfirmPassword')),
	name: Yup.string().required(intl.get('NameIsRequired')),
});

export const loginSchema = Yup.object().shape({
	email: Yup.string().email(intl.get('ErrorInvalidEmailId')).required(intl.get('ErrorEnterEmailId')),
	password: Yup.string().required(intl.get('ErrorEnterPassword')),
	rememberMe: Yup.boolean(),
});

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const profileSchema = Yup.object().shape({
	name: Yup.string().required(),
	contact: Yup.string().matches(phoneRegExp, intl.get('ErrorInvalidPhoneNumber')),
	headline: Yup.string(),
});

export const changePasswordSchema = Yup.object().shape({
	oldpassword: Yup.string().required(intl.get('ErrorEnterPassword')),
	newpassword: Yup.string().required(intl.get('ErrorEnterPassword')),
	confirmnewpassword: Yup.string()
		.equalTo(Yup.ref('newpassword'), intl.get('ErrorInconsistentPasswords'))
		.required(intl.get('ErrorConfirmPassword')),
});

export const resetPasswordSchema = Yup.object().shape({
	newpassword: Yup.string().required(intl.get('ErrorEnterPassword')),
	confirmnewpassword: Yup.string()
		.equalTo(Yup.ref('newpassword'), intl.get('ErrorInconsistentPasswords'))
		.required(intl.get('ErrorConfirmPassword')),
});

export const forgotPasswordSchema = Yup.object().shape({
	email: Yup.string().email(intl.get('ErrorInvalidEmailId')).required(intl.get('ErrorEnterEmailId')),
});
