import { renderErrorPage } from '#common/templates/error-page.js';
import { createSitemapXmlRoute } from '#core/common/templates/sitemap-xml.js';
import { mainRoute } from '#server/routes/main.js';

const notFoundRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				description: 'Страница ошибок.',
				heading: 'Ошибка 404',
				pageTemplate: renderErrorPage(404, 'Страница не найдена.'),
				pathname: '/404.html',
				title: 'Страница не найдена',
			},
			statusCode: 404,
		};
	},
};

const sitemapXmlRoute = createSitemapXmlRoute();

/** @type {{ [name: string]: Route }} */
const routes = {
	'/': mainRoute,
	'/404.html': notFoundRoute,
	'/sitemap.xml': sitemapXmlRoute,
};

export { routes };
