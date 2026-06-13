import { BASE_URL } from '#common/constants.js';

/** @type {SitemapPage[]} */
const pages = ['/'].map((page) => ({ loc: `${BASE_URL}${page}`, priority: '0.8' }));

/** @type {(data: SitemapPage) => string} */
function renderPage({ loc, priority }) {
	return /* xml */ `
		<url>
			<loc>${loc}</loc>
			${priority ? /* xml */ `<priority>${priority}</priority>` : ''}
		</url>
	`;
}

export const sitemapXmlRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			contentType: 'application/xml',
			template: /* xml */ `<?xml version="1.0" encoding="UTF-8" ?>
				<urlset xmlns="https://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="https://www.w3.org/1999/xhtml">
					${pages.map(renderPage).join('')}
				</urlset>`,
		};
	},
};
