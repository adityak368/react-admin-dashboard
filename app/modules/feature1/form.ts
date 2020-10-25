import * as Yup from 'yup';

export interface Feature1Form {
	id: string;
	password: string;
	name: string;
	description: string;
}

export const feature1form = Yup.object().shape({
	id: Yup.string().required(),
	password: Yup.string().required(),
	description: Yup.string().required(),
	name: Yup.string().required(),
});
