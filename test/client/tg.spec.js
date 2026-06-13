import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/Tg', () => {
	test('Loads Telegram script when tg query param is present', async () => {
		setupDomFixture({ url: 'http://localhost/?tg=1' });

		await import('#client/modules/tg.js');

		const scriptElement = document.head.querySelector('script[src="https://telegram.org/js/telegram-web-app.js"]');
		assert.ok(scriptElement);
	});

	test('Does not load Telegram script without tg query param', async () => {
		setupDomFixture({ url: 'http://localhost/' });

		await import('#client/modules/tg.js');

		const scriptElement = document.head.querySelector('script[src="https://telegram.org/js/telegram-web-app.js"]');
		assert.strictEqual(scriptElement, null);
	});
});
