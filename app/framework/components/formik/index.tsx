import React, { ReactChildren, ReactChild } from 'react';
import intl from 'framework/localization/intl';

import { DatePicker, Form, Input, TimePicker, Select, Tag, Tooltip, Radio, Upload, Button, Checkbox } from 'antd';

import { FieldInputProps, FormikProps } from 'formik';

import notification from 'modules/notification/notification';
import { PlusOutlined, UploadOutlined } from '@ant-design/icons';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

const CreateAntField = (AntComponent) => ({
	field,
	form,
	hasFeedback,
	label,
	submitCount,
	type,
	formWrapperClassName,
	formItemProps,
	...props
}) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onInputChange = ({ target: { value } }) => form.setFieldValue(field.name, value);
	const onChange = (value) => form.setFieldValue(field.name, value);
	const onBlur = () => form.setFieldTouched(field.name, true);
	return (
		<FormItem
			className={formWrapperClassName}
			label={label}
			hasFeedback={(hasFeedback && submitted) || (hasFeedback && touched) ? true : false}
			help={submittedError || touchedError ? hasError : false}
			validateStatus={submittedError || touchedError ? 'error' : 'success'}
			{...formItemProps}
		>
			<AntComponent {...field} {...props} type={type} onBlur={onBlur} onChange={type ? onInputChange : onChange}></AntComponent>
		</FormItem>
	);
};

// AntSelect
interface IAntSelect {
	[key: string]: any;
	submitCount: number;
	label?: string;
	selectOptions?: Array<{ key: any; value: string }>;
	field: FieldInputProps<any>;
	form: FormikProps<any>;
	showSearch?: boolean;
}

export const AntSelect: React.FC<IAntSelect> = ({
	field,
	form,
	label,
	selectOptions,
	submitCount,
	showSearch,
	formItemProps,
	...rest
}) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;

	const onChange = (value) => {
		form.setFieldValue(field.name, value);
	};

	return (
		<FormItem
			label={label || ''}
			help={submittedError || touchedError ? hasError : false}
			validateStatus={submittedError || touchedError ? 'error' : 'success'}
			{...formItemProps}
		>
			<Select showSearch={showSearch} {...rest} onChange={onChange}>
				{selectOptions &&
					selectOptions.map((option) => (
						<Option value={option.key} key={option.key}>
							{option.value}
						</Option>
					))}
			</Select>
		</FormItem>
	);
};

// AntRadioGroup
interface IAntRadioGroup {
	[key: string]: any;
	submitCount: number;
	label?: string;
	radioOptions?: Array<{ key: any; value: string }>;
	field: FieldInputProps<any>;
	form: FormikProps<any>;
}

export const AntRadioGroup: React.FC<IAntRadioGroup> = ({ field, form, label, radioOptions, submitCount, ...rest }) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;

	const onChange = ({ target: { value } }: any) => {
		form.setFieldValue(field.name, value);
	};

	return (
		<FormItem
			label={label || ''}
			help={submittedError || touchedError ? hasError : false}
			validateStatus={submittedError || touchedError ? 'error' : 'success'}
		>
			<Radio.Group {...rest} onChange={onChange}>
				{radioOptions &&
					radioOptions.map((option) => (
						<Radio.Button value={option.key} key={option.key}>
							{option.value}
						</Radio.Button>
					))}
			</Radio.Group>
		</FormItem>
	);
};

// AntInputWithTags
export class AntInputWithTags extends React.Component<any, { inputVisible: boolean; inputValue: string }> {
	state = {
		inputVisible: false,
		inputValue: '',
	};

	input = null;

	handleClose = (removedTag) => {
		const { field, form } = this.props;
		const tags = field.value.filter((tag) => tag !== removedTag);
		form.setFieldValue(field.name, tags);
	};

	showInput = () => {
		this.setState({ inputVisible: true }, () => this.input.focus());
	};

	handleInputChange = (e) => {
		this.setState({ inputValue: e.target.value });
	};

	handleInputConfirm = () => {
		const { inputValue } = this.state;
		const { field, form } = this.props;
		let tags = field.value;
		if (inputValue && tags.indexOf(inputValue) === -1) {
			tags = [...tags, inputValue];
		}
		this.setState({
			inputVisible: false,
			inputValue: '',
		});
		form.setFieldValue(field.name, tags);
	};

	saveInputRef = (input) => (this.input = input);

	render() {
		const { inputVisible, inputValue } = this.state;
		const { field, placeholder } = this.props;
		return (
			<div style={{ textAlign: 'left' }}>
				{field.value.map((tag, index) => {
					const isLongTag = tag.length > 20;
					const tagElem = (
						<Tag key={tag} closable onClose={() => this.handleClose(tag)}>
							{isLongTag ? `${tag.slice(0, 20)}...` : tag}
						</Tag>
					);
					return isLongTag ? (
						<Tooltip title={tag} key={tag}>
							{tagElem}
						</Tooltip>
					) : (
						tagElem
					);
				})}
				{inputVisible && (
					<Input
						ref={this.saveInputRef}
						style={{ width: 78 }}
						value={inputValue}
						onChange={this.handleInputChange}
						onBlur={this.handleInputConfirm}
						onPressEnter={this.handleInputConfirm}
					/>
				)}
				{!inputVisible && (
					<Tag onClick={this.showInput} style={{ background: '#fff', borderStyle: 'dashed' }}>
						<PlusOutlined /> {placeholder}
					</Tag>
				)}
			</div>
		);
	}
}

// AntUpload
interface IAntUpload {
	[key: string]: any;
	submitCount: number;
	label?: string;
	field: FieldInputProps<any>;
	form: FormikProps<any>;
	uploadButtonLabel?: string;
	fileFilter?: string;
	uploadUrl: string;
	maxFileSize: number;
	fileSizeError?: string;
	canSelectMultiple?: boolean;
}

interface IAntUploadState {
	fileList: Array<any>;
}

export class AntUpload extends React.Component<IAntUpload, IAntUploadState> {
	state = {
		fileList: [],
	};

	beforeUpload = (file) => {
		const { maxFileSize, fileSizeError, canSelectMultiple, form, field } = this.props;
		if (file.size > maxFileSize) {
			notification.error({ message: fileSizeError || intl.get('UnknownError') });
			return false;
		}
		let { fileList } = this.state;
		if (canSelectMultiple) {
			fileList = [...fileList, file];
		} else {
			fileList = [file];
		}
		this.setState({
			fileList,
		});
		form.setFieldValue(field.name, fileList);
		return false;
	};

	onRemove = (file) => {
		const { form, field } = this.props;
		let { fileList } = this.state;
		const index = fileList.indexOf(file);
		const newFileList = fileList.slice();
		newFileList.splice(index, 1);
		this.setState({
			fileList: newFileList,
		});

		form.setFieldValue(field.name, newFileList);
	};

	render() {
		const {
			form,
			field,
			uploadUrl,
			fileFilter,
			submitCount,
			label,
			uploadButtonLabel,
			formItemProps,
			canSelectMultiple,
			...rest
		}: IAntUpload = this.props;
		const { fileList } = this.state;

		const touched = form.touched[field.name];
		const submitted = submitCount > 0;
		const hasError = form.errors[field.name];
		const submittedError = hasError && submitted;
		const touchedError = hasError && touched;
		return (
			<FormItem
				label={label}
				help={submittedError || touchedError ? hasError : false}
				validateStatus={submittedError || touchedError ? 'error' : 'success'}
				{...formItemProps}
			>
				<Upload
					accept={fileFilter || '*/*'}
					action={uploadUrl}
					beforeUpload={this.beforeUpload}
					fileList={fileList}
					name={field.name}
					onRemove={this.onRemove}
					multiple={canSelectMultiple}
					{...rest}
				>
					<Button>
						<UploadOutlined />
						{uploadButtonLabel}
					</Button>
				</Upload>
			</FormItem>
		);
	}
}

// AntCheckbox
interface IAntCheckbox {
	[key: string]: any;
	submitCount: number;
	label?: string;
	field: FieldInputProps<any>;
	form: FormikProps<any>;
	children: ReactChild | ReactChildren;
	onCheckChanged?: (e: boolean) => void;
}

export const AntCheckbox: React.FC<IAntCheckbox> = ({
	field,
	form,
	label,
	submitCount,
	formItemProps,
	children,
	onCheckChanged,
	...rest
}) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onChange = ({ target: { checked } }) => {
		form.setFieldValue(field.name, checked);
		onCheckChanged?.(checked);
	};
	return (
		<FormItem
			label={label}
			help={submittedError || touchedError ? hasError : false}
			validateStatus={submittedError || touchedError ? 'error' : 'success'}
			{...formItemProps}
		>
			<Checkbox checked={field.value} {...rest} onChange={onChange}>
				{children}
			</Checkbox>
		</FormItem>
	);
};

// AntDateRangePicker
interface IAntDateRangePicker {
	[key: string]: any;
	submitCount: number;
	label?: string;
	field: FieldInputProps<any>;
	form: FormikProps<any>;
}

export const AntDateRangePicker: React.FC<IAntDateRangePicker> = ({ field, form, label, submitCount, formItemProps, ...rest }) => {
	const touched = form.touched[field.name];
	const submitted = submitCount > 0;
	const hasError = form.errors[field.name];
	const submittedError = hasError && submitted;
	const touchedError = hasError && touched;
	const onChange = (dates) => {
		form.setFieldValue(field.name, dates);
	};
	return (
		<FormItem
			label={label}
			help={submittedError || touchedError ? hasError : false}
			validateStatus={submittedError || touchedError ? 'error' : 'success'}
			{...formItemProps}
		>
			<DatePicker.RangePicker {...rest} onChange={onChange} />
		</FormItem>
	);
};

export const AntDatePicker = CreateAntField(DatePicker);
export const AntInput = CreateAntField(Input);
export const AntTimePicker = CreateAntField(TimePicker);
export const AntTextArea = CreateAntField(TextArea);
