import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { BASE_URL, YANDEX_METRIKA_ID } from '#common/constants.js';
import { renderPage } from '#server/lib/page.js';

describe('Server/Page', () => {
	test('Renders complete html document for home page', async () => {
		const html = await renderPage({
			headTemplate: '<meta name="yandex-verification" content="6891d630ad9271e6">',
			pageTemplate: '<div class="table"></div>',
		});

		assert.match(html, /<!DOCTYPE html>/);
		assert.match(html, /<html lang="ru"/);
		assert.match(html, /<title>Пасьянс «Колодец»<\/title>/);
		assert.match(html, /<style>/);
		assert.match(html, /<script type="module">/);
		assert.match(html, new RegExp(`property="og:url" content="${BASE_URL}"`));
		assert.match(html, new RegExp(`rel="canonical" href="${BASE_URL}"`));
		assert.match(html, /<div hidden>/);
		assert.match(html, /yandex-verification/);
	});

	test('Includes Yandex Metrika in production mode', async () => {
		const html = await renderPage({ pageTemplate: '' });

		assert.match(html, new RegExp(String(YANDEX_METRIKA_ID)));
		assert.match(html, /Yandex\.Metrika/);
	});
});
