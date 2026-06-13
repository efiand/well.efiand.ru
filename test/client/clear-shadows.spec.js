import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/Clear-shadows', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Removes acceptable class from all drop targets', async () => {
		const { clearShadows } = await import('#client/modules/functions/clear-shadows.js');
		const { tableElement } = await import('#client/modules/settings.js');

		const cornerElement = tableElement.querySelector('.card--corner-top-left');
		cornerElement?.classList.add('card--acceptable');

		clearShadows();

		assert.strictEqual(cornerElement?.classList.contains('card--acceptable'), false);
	});
});
