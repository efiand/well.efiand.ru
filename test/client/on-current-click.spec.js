import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/On-current-click', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Deals run cards into work slots', async () => {
		const { onCurrentClick } = await import('#client/modules/functions/on-current-click.js');
		const { tableElement } = await import('#client/modules/settings.js');
		const { state } = await import('#client/modules/state.js');

		for (let i = 0; i < 6; i++) {
			const cardElement = document.createElement('div');
			cardElement.className = 'card card--run card--shirt';
			cardElement.setAttribute('data-card', `spades-${i + 1}`);
			tableElement.append(cardElement);
		}

		onCurrentClick();

		assert.strictEqual(tableElement.querySelectorAll('.card--work-1').length, 1);
		assert.strictEqual(tableElement.querySelectorAll(`.card--work-${state.numberOfSlots}`).length, 1);
	});
});
