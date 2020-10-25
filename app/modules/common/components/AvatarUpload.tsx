import React from 'react';
import { Upload } from 'antd';
import intl from 'framework/localization/intl';
import notification from 'modules/notification/notification';
import { PlusOutlined, LoadingOutlined } from '@ant-design/icons';

interface State {
	loading: boolean;
	imageUrl: string;
}

interface Props {
	maxAvatarSize: number;
	fileFilter?: string;
	action: string;
	name: string;
	headers?: { [key: string]: string };
	onSuccess?: (response: any) => void;
	isImageUrl?: string;
	defaultImageUrl: string;
}

export default class Avatar extends React.Component<Props, State> {
	state = {
		loading: false,
		imageUrl: '',
	};

	static getDerivedStateFromProps(nextProps, currState) {
		return { ...currState, imageUrl: nextProps.defaultImageUrl };
	}

	beforeUpload = (file) => {
		const { maxAvatarSize } = this.props;
		const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
		if (!isJpgOrPng) {
			notification.error({ message: intl.get('ErrorPhotoFormat') });
		}
		const isExceededMaxFileSize = file.size > maxAvatarSize;
		if (isExceededMaxFileSize) {
			notification.error({ message: intl.getf('FileSizeError', (maxAvatarSize / 1000).toString()) });
		}

		return isJpgOrPng && !isExceededMaxFileSize;
	};

	getBase64 = (img, callback) => {
		const reader = new FileReader();
		reader.addEventListener('load', () => callback(reader.result));
		reader.readAsDataURL(img);
	};

	handleChange = (info) => {
		const { onSuccess } = this.props;
		if (info.file.status === 'uploading') {
			this.setState({ loading: true });
			return;
		}
		if (info.file.status === 'done') {
			// Get this url from response in real world.
			this.getBase64(info.file.originFileObj, (imageUrl) =>
				this.setState({
					imageUrl,
					loading: false,
				})
			);
			if (onSuccess) {
				onSuccess(info.file.response);
			}
		}
		if (info.file.status === 'error') {
			notification.error({ message: info.file?.response?.message });
			this.setState({
				loading: false,
			});
			return;
		}
	};

	render() {
		const { imageUrl, loading } = this.state;
		const { fileFilter, action, name, headers } = this.props;
		return (
			<Upload
				accept={fileFilter || 'image/jpeg, image/png'}
				name={name}
				className="avatar-upload"
				listType="picture-card"
				showUploadList={false}
				action={action}
				beforeUpload={this.beforeUpload}
				onChange={this.handleChange}
				headers={headers ?? {}}
			>
				{imageUrl && !loading ? (
					<img src={imageUrl + `?${new Date().getTime()}`} alt="avatar" style={{ height: 100, width: 100 }} />
				) : (
					<div>
						{loading ? <LoadingOutlined /> : <PlusOutlined />}
						<div className="ant-upload-text">{intl.get('ProfilePhoto')}</div>
					</div>
				)}
			</Upload>
		);
	}
}
