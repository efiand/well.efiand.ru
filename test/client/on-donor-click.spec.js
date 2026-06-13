import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/On-donor-click', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Removes shirt class and enables dragging', async () => {
		const { onDonorClick } = await import('#client/modules/functions/on-donor-click.js');
		const { tableElement } = await import('#client/modules/settings.js');

		const cardElement = document.createElement('div');
		cardElement.className = 'card card--donor-top card--shirt';
		cardElement.setAttribute('data-card', 'hearts-3');
		tableElement.append(cardElement);

		cardElement.addEventListener('click', onDonorClick);
		cardElement.dispatchEvent(new MouseEvent('click', { bubbles: true }));

		assert.strictEqual(cardElement.classList.contains('card--shirt'), false);
		assert.strictEqual(cardElement.classList.contains('card--draggable'), true);
	});
});
