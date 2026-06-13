import assert from 'node:assert/strict';
import { after, before, describe, mock, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/Create-deck', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
		mock.method(Math, 'random', () => 0);
	});

	after(() => {
		mock.restoreAll();
	});

	test('Creates 104 cards with donor piles and control run cards', async () => {
		const { createDeck } = await import('#client/modules/functions/create-deck.js');
		const { tableElement } = await import('#client/modules/settings.js');

		createDeck();

		const cards = tableElement.querySelectorAll('[data-card]');
		assert.strictEqual(cards.length, 104);
		assert.strictEqual(tableElement.querySelectorAll('.card--donor-top[data-card]').length, 11);
		assert.strictEqual(tableElement.querySelectorAll('.card--donor-left[data-card]').length, 11);
		assert.strictEqual(tableElement.querySelectorAll('.card--donor-right[data-card]').length, 11);
		assert.strictEqual(tableElement.querySelectorAll('.card--donor-bottom[data-card]').length, 11);
		assert.ok(tableElement.querySelectorAll('.card--run[data-card]').length > 0);
	});
});
