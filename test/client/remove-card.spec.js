import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/Remove-card', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Removes card element from table', async () => {
		const { removeCard } = await import('#client/modules/functions/remove-card.js');
		const { tableElement } = await import('#client/modules/settings.js');

		const cardElement = document.createElement('div');
		cardElement.setAttribute('data-card', 'clubs-1');
		cardElement.className = 'card card--run';
		tableElement.append(cardElement);

		removeCard(cardElement);

		assert.strictEqual(tableElement.querySelector('[data-card="clubs-1"]'), null);
	});
});
