import type { IncomingMessage, ServerResponse } from 'node:http';

declare global {
	type CreateAppOptions = {
		isQuiet?: boolean;
		middleware?: ServerMiddleware;
		port?: number;
	};

	type Route = Record<string, RouteMethod>;

	type RouteData = {
		contentType?: string;
		page?: LayoutData;
		template?: string;
	};

	type RouteMethod = (params: RouteParams) => Promise<RouteData>;

	type RouteParams = {
		req: RouteRequest;
		res: RouteResponse;
	};

	type RouteRequest = IncomingMessage;

	type RouteResponse = ServerResponse<IncomingMessage> & { req: IncomingMessage };

	type ServerMiddleware = (req: IncomingMessage, res: RouteResponse, next?: ServerMiddleware) => Promise<void>;
}
