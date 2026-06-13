/** @type {(overrides?: Partial<RouteParams>) => RouteParams} */
export function createRouteParams(overrides = {}) {
	return {
		req: /** @type {RouteRequest} */ ({}),
		res: /** @type {RouteResponse} */ ({}),
		...overrides,
	};
}
