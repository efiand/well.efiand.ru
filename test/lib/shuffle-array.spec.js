import assert from 'node:assert/strict';
import { after, describe, mock, test } from 'node:test';
import { shuffleArray } from '#common/lib/shuffle-array.js';

describe('Lib/Shuffle-array', () => {
	after(() => {
		mock.restoreAll();
	});

	test('Shuffles array in place preserving length and elements', () => {
		mock.method(Math, 'random', () => 0);

		const items = ['a', 'b', 'c', 'd'];
		const originalItems = [...items];

		shuffleArray(items);

		assert.strictEqual(items.length, originalItems.length);
		assert.deepEqual([...items].sort(), [...originalItems].sort());
	});

	test('Can change order when random returns different values', () => {
		let call = 0;
		mock.method(Math, 'random', () => {
			call++;
			return call === 1 ? 0.99 : 0;
		});

		const items = [1, 2, 3, 4, 5];
		shuffleArray(items);

		assert.notDeepEqual(items, [1, 2, 3, 4, 5]);
	});

	test('Handles empty array', () => {
		/** @type {number[]} */
		const items = [];
		shuffleArray(items);
		assert.deepEqual(items, []);
	});
});
