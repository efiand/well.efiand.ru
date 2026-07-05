import { getSiteConfig } from '#core/common/lib/site-config.js';
import { renderClientEntryScript } from '#core/common/templates/client-entry-script.js';
import { renderPageAssets } from '#core/common/templates/page-assets.js';
import { createRenderInlinePageAssets } from '#core/common/templates/render-inline-page-assets.js';

const renderInlinePageAssetsProd = createRenderInlinePageAssets({
	cssEntry: 'main.css',
	jsEntry: 'entries/main.js',
});

/** @type {RenderPageAssetsFn} */
function renderInlinePageAssets(pageAssetsOptions = {}) {
	if (getSiteConfig().isDev) {
		return /* html */ `
			${renderPageAssets(pageAssetsOptions)}
			${renderClientEntryScript(pageAssetsOptions)}
		`;
	}

	return renderInlinePageAssetsProd(pageAssetsOptions);
}

export { renderInlinePageAssets };
