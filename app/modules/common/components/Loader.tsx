import React, { memo } from 'react';
import { Spin } from 'antd';
import styled from 'styled-components';

const Container = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 0;
	right: 0;
	margin: auto;
	text-align: center;
	display: flex;
	flex-direction: column;
	justify-content: center;
	width: 100%;
	height: 100px;
`;

interface Props {
	message: string;
}

const Loader: React.FC<Props> = ({ message }: Props) => (
	<Container>
		<Spin tip={message} />
	</Container>
);

export default memo(Loader);
