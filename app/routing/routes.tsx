import React from 'react';
import { Route, Redirect } from 'react-router';
import { Breadcrumb } from 'react-breadcrumbs';
import MainLayout from 'layouts/MainLayout';
import NotFoundPage from 'modules/common/components/NotFoundPage';

const CrumbRoute = ({ component: Component, includeSearch = false, render, ...props }: any) => (
	<Route
		{...props}
		render={(routeProps) => (
			<Breadcrumb
				data={{
					title: (
						<span className="link-underline">
							<span style={{ margin: 5 }}>{props.icon}</span>
							{props.text}
						</span>
					),
					pathname: routeProps.match.url,
					search: includeSearch ? routeProps.location.search : null,
				}}
			>
				{Component ? <Component {...routeProps} /> : render(routeProps)}
			</Breadcrumb>
		)}
	/>
);

export const renderMergedProps = (props) => {
	const { componentToRender, ...rest } = props;
	if (!componentToRender) {
		return <NotFoundPage />;
	}
	if (props.isNewPage) {
		const finalProps = Object.assign({}, rest);
		return React.createElement(componentToRender, finalProps);
	}
	return React.createElement(MainLayout, props);
};

export const PrivateRoute = ({ path, exact, ...rest }) => {
	return (
		<CrumbRoute
			{...rest}
			path={path}
			exact={exact}
			render={(routeProps) =>
				rest.auth.isLoggedIn ? (
					renderMergedProps({ ...rest, ...routeProps })
				) : (
					<Redirect
						to={{
							pathname: '/login',
							state: { from: routeProps.location },
						}}
					/>
				)
			}
		/>
	);
};

export const PropsRoute = ({ path, exact, ...rest }) => {
	return <CrumbRoute {...rest} path={path} exact={exact} render={(routeProps) => renderMergedProps({ ...rest, ...routeProps })} />;
};

export const RedirectRoute = ({ path, exact, ...rest }) => {
	return (
		<Route
			{...rest}
			path={path}
			exact={exact}
			render={(routeProps) => {
				return routeProps.location.pathname === path ? <Redirect to="/" /> : null;
			}}
		/>
	);
};
