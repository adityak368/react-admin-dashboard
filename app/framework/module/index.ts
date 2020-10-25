import React from 'react';

export default abstract class Module extends React.Component {
	abstract onInit(): boolean;
	abstract onCleanUp();
}
