// @ts-nocheck
import '#common/configure-site.js';
import assert from 'node:assert/strict';
import { afterEach, beforeEach, describe, test } from 'node:test';
import { Window } from 'happy-dom';
import { initCookieConsent } from '#core/client/lib/init-cookie-consent.js';
import {
	COOKIE_CONSENT_COOKIE_NAME,
	COOKIE_CONSENT_VALUE_ACCEPTED,
	COOKIE_CONSENT_VALUE_REJECTED,
} from '#core/common/lib/cookie-consent-constants.js';
import { renderPage } from '#server/lib/app.js';

/** @type {(html: string) => string} */
function extractCookieConsentMarkup(html) {
	const start = html.lastIndexOf('<div class="cookie-consent"');
	const scriptEnd = html.indexOf('</script>', start);

	assert.ok(start > -1, 'cookie-consent banner missing');
	assert.ok(scriptEnd > -1, 'reveal script missing');

	return html.slice(start, scriptEnd + '</script>'.length);
}

/** @type {(markup: string) => void} */
function runRevealScript(markup) {
	const scriptMatch = markup.match(/<script>([\s\S]*?)<\/script>/);
	assert.ok(scriptMatch, 'reveal script missing');

	new Function(scriptMatch[1])();
}

describe('Client/cookie-consent-reload', () => {
	beforeEach(() => {
		const window = new Window({
			settings: {
				disableJavaScriptFileLoading: true,
				handleDisabledFileLoadingAsSuccess: true,
			},
		});
		globalThis.window = window;
		globalThis.document = window.document;
	});

	afterEach(() => {
		delete globalThis.window;
		delete globalThis.document;
	});

	test('repeat visit: reveal и initCookieConsent оставляют баннер скрытым при accepted', async () => {
		const html = await renderPage({ pageTemplate: '', pathname: '/' });
		const markup = extractCookieConsentMarkup(html);

		document.body.innerHTML = markup;
		Object.defineProperty(document, 'cookie', {
			configurable: true,
			value: `other=1;${COOKIE_CONSENT_COOKIE_NAME}=${COOKIE_CONSENT_VALUE_ACCEPTED}`,
			writable: true,
		});

		runRevealScript(markup);
		assert.ok(document.querySelector('.cookie-consent')?.hasAttribute('hidden'));

		initCookieConsent();
		await new Promise((resolve) => setTimeout(resolve, 0));

		assert.ok(document.querySelector('.cookie-consent')?.hasAttribute('hidden'));
	});

	test('repeat visit: reveal и initCookieConsent оставляют баннер скрытым при rejected', async () => {
		const html = await renderPage({ pageTemplate: '', pathname: '/' });
		const markup = extractCookieConsentMarkup(html);

		document.body.innerHTML = markup;
		Object.defineProperty(document, 'cookie', {
			configurable: true,
			value: `${COOKIE_CONSENT_COOKIE_NAME}=${COOKIE_CONSENT_VALUE_REJECTED}`,
			writable: true,
		});

		runRevealScript(markup);
		initCookieConsent();

		assert.ok(document.querySelector('.cookie-consent')?.hasAttribute('hidden'));
	});
});
