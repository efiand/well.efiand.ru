import htmlMinifier from 'html-minifier-terser';

/** @type {import("html-minifier-terser").Options} */
const MINIFIER_CONFIG = {
	caseSensitive: true,
	collapseWhitespace: true,
	conservativeCollapse: false,
	minifyJS: true,
	removeAttributeQuotes: true,
	removeComments: true,
	removeEmptyAttributes: true,
};

/**
 * Минификация HTML для production-сборки.
 *
 * После минификации принудительно добавляет кавычки вокруг шаблонных литералов.
 *
 * @type {(html: string, config?: import("html-minifier-terser").Options) => Promise<string>}
 */
export async function minifyHtml(html, config = {}) {
	const minifiedHtml = await htmlMinifier.minify(html, { ...MINIFIER_CONFIG, ...config });

	return minifiedHtml.replace(/=(\$\{.*?\})/g, '="$1"');
}
