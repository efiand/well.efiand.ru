import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/On-reload', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Decrements slot count and restores run cards to shirt state', async () => {
		const { onReload } = await import('#client/modules/functions/on-reload.js');
		const { reloadButtonElement, tableElement } = await import('#client/modules/settings.js');
		const { state } = await import('#client/modules/state.js');

		for (let i = 1; i <= state.numberOfSlots; i++) {
			const cardElement = document.createElement('div');
			cardElement.className = `card card--control card--work-${i}`;
			cardElement.setAttribute('data-card', `clubs-${i}`);
			tableElement.append(cardElement);
		}

		const initialSlots = state.numberOfSlots;
		onReload();

		assert.strictEqual(state.numberOfSlots, initialSlots - 1);
		assert.ok(reloadButtonElement.title.includes(String(initialSlots - 2)));
		assert.strictEqual(tableElement.querySelectorAll('.card--run.card--shirt').length, initialSlots);
	});
});
