import '#common/configure-site.js';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { describe, test } from 'node:test';
import { getSiteConfig } from '#core/common/lib/site-config.js';
import { renderPage } from '#server/lib/app.js';

describe('Server/Page', () => {
	test('Renders complete html document for home page', async () => {
		const { baseUrl } = getSiteConfig();
		const html = await renderPage({
			description: 'Карточная игра для настольных и мобильных браузеров',
			headTemplate: '<meta name="yandex-verification" content="6891d630ad9271e6">',
			pageTemplate: '<div class="table"></div>',
			pathname: '/',
		});

		assert.match(html, /<!DOCTYPE html>/);
		assert.match(html, /<html lang="ru"/);
		assert.match(html, /<title>Пасьянс «Колодец»<\/title>/);
		assert.match(html, /<style>/);
		assert.match(html, /<script type="module">/);
		assert.match(html, new RegExp(`property="og:url" content="${baseUrl}/"`));
		assert.match(html, new RegExp(`rel="canonical" href="${baseUrl}/"`));
		assert.match(html, /<div hidden>/);
		assert.match(html, /yandex-verification/);
	});

	test('Includes cookie consent banner with inline privacy link', async () => {
		const html = await renderPage({
			pageTemplate: '',
			pathname: '/',
		});

		assert.match(html, /class="cookie-consent"/);
		assert.match(html, /href="\/#privacy"/);
		assert.match(html, /data-cookie-consent-accept/);
		assert.match(html, /data-cookie-consent-reject/);
		assert.match(html, /hasSiteCoreConsentCookie/);

		const bannerIndex = html.indexOf('<div class="cookie-consent"');
		const scriptIndex = html.indexOf('<script>', bannerIndex);
		assert.ok(bannerIndex > -1 && scriptIndex > bannerIndex, 'banner идёт перед reveal-скриптом');
	});

	test('Production inline bundle includes cookie consent client logic', async () => {
		const html = await renderPage({
			pageTemplate: '',
			pathname: '/',
		});

		assert.match(html, /site-core-cookie-consent/);
		assert.match(html, /mc\.yandex\.ru/);
	});

	test('main.js does not init Metrika directly', async () => {
		const source = await readFile(new URL('../../src/client/entries/main.js', import.meta.url), 'utf8');

		assert.doesNotMatch(source, /initYandexMetrika/);
	});
});
