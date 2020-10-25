var __VERSION__: string;

interface Window {
	modals: { [key: string]: any };
}

interface RouteDefinition {
	path: string;
	text: string;
	icon: any;
	exact: boolean;
	componentToRender: any;
	isProtected: boolean;
	isInSideMenu?: boolean;
	isNewPage?: boolean;
	isRouteHiddenWhenLoggedIn?: boolean;
	isInSideMenuWhenLoggedIn?: boolean;
	subMenus?: Array<RouteDefinition>;
}

interface ApiResult {
	message: string;
}
