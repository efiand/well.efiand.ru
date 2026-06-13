import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/On-drag-drop', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Adds draggable class and event listeners', async () => {
		const { bindOnDragDrop } = await import('#client/modules/functions/on-drag-drop.js');
		const { tableElement } = await import('#client/modules/settings.js');

		const cardElement = document.createElement('div');
		cardElement.setAttribute('data-card', 'clubs-5');
		cardElement.className = 'card card--run';
		tableElement.append(cardElement);

		bindOnDragDrop(cardElement);

		assert.strictEqual(cardElement.classList.contains('card--draggable'), true);
	});

	test('Increments attached count when card lands in corner slot', async () => {
		const { bindOnDragDrop } = await import('#client/modules/functions/on-drag-drop.js');
		const { baseLeft, dropTargetOptions, tableElement } = await import('#client/modules/settings.js');
		const { state } = await import('#client/modules/state.js');

		for (const target of state.dropTargets) {
			dropTargetOptions[target] = { left: 9999, top: 9999 };
		}
		dropTargetOptions['corner-top-left'] = { left: baseLeft, top: 0 };

		const cornerElement = /** @type {HTMLElement} */ (tableElement.querySelector('.card--corner-top-left'));
		cornerElement.setAttribute('data-accept', 'any-13');

		const cardElement = document.createElement('div');
		cardElement.setAttribute('data-card', 'clubs-13');
		cardElement.className = 'card card--run';
		cardElement.style.left = '0px';
		cardElement.style.top = '0px';
		Object.defineProperty(cardElement, 'offsetLeft', { configurable: true, value: 0 });
		Object.defineProperty(cardElement, 'offsetTop', { configurable: true, value: 0 });
		Object.defineProperty(cardElement, 'clientWidth', { configurable: true, value: 75 });
		Object.defineProperty(cardElement, 'clientHeight', { configurable: true, value: 100 });
		tableElement.append(cardElement);

		bindOnDragDrop(cardElement);

		const coords = { clientX: 0, clientY: 0 };
		cardElement.dispatchEvent(new MouseEvent('mousedown', { bubbles: true, cancelable: true, ...coords }));
		document.dispatchEvent(new MouseEvent('mousemove', { bubbles: true, cancelable: true, ...coords }));
		document.dispatchEvent(new MouseEvent('mouseup', { bubbles: true, cancelable: true, ...coords }));

		assert.strictEqual(state.numberOfAttached, 1);
		assert.strictEqual(state.cornerSuits.includes('clubs'), true);
	});
});
