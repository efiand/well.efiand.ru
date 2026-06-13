import assert from 'node:assert/strict';
import { after, before, describe, mock, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/On-restart', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	after(() => {
		mock.restoreAll();
	});

	test('Resets state and removes existing cards', async () => {
		const { onRestart } = await import('#client/modules/functions/on-restart.js');
		const { reloadButtonElement, restartButtonElement, tableElement, winMessageElement } = await import(
			'#client/modules/settings.js'
		);
		const { NUMBER_OF_SLOTS, state } = await import('#client/modules/state.js');

		state.numberOfSlots = 2;
		state.numberOfAttached = 10;
		state.cornerSuits.push('clubs');
		winMessageElement.hidden = false;
		reloadButtonElement.setAttribute('disabled', 'disabled');

		const cardElement = document.createElement('div');
		cardElement.setAttribute('data-card', 'clubs-1');
		cardElement.className = 'card card--run';
		tableElement.append(cardElement);

		mock.method(Math, 'random', () => 0);

		onRestart();

		assert.strictEqual(state.numberOfSlots, NUMBER_OF_SLOTS);
		assert.strictEqual(state.numberOfAttached, 0);
		assert.strictEqual(state.cornerSuits.length, 0);
		assert.strictEqual(tableElement.querySelectorAll('[data-card]').length, 0);
		assert.strictEqual(winMessageElement.hidden, true);
		assert.strictEqual(reloadButtonElement.hasAttribute('disabled'), false);
		assert.strictEqual(restartButtonElement.textContent, state.restartText);
	});
});
