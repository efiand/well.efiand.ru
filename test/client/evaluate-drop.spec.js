import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { evaluateDrop } from '#client/modules/functions/evaluate-drop.js';

describe('Client/Evaluate-drop', () => {
	test('Accepts ace on central slot with any-1 rule', () => {
		const result = evaluateDrop({
			acceptIndex: 1,
			acceptType: 'any',
			cardIndex: 1,
			cardType: 'hearts',
			cornerSuits: [],
			isCorner: false,
		});

		assert.strictEqual(result.isAccepted, true);
		assert.strictEqual(result.newDataAccept, 'hearts-2');
	});

	test('Rejects wrong value on acceptor slot', () => {
		const result = evaluateDrop({
			acceptIndex: 5,
			acceptType: 'clubs',
			cardIndex: 7,
			cardType: 'clubs',
			cornerSuits: [],
			isCorner: false,
		});

		assert.strictEqual(result.isAccepted, false);
	});

	test('Accepts descending sequence on corner slot', () => {
		const result = evaluateDrop({
			acceptIndex: 13,
			acceptType: 'any',
			cardIndex: 13,
			cardType: 'spades',
			cornerSuits: [],
			isCorner: true,
		});

		assert.strictEqual(result.isAccepted, true);
		assert.strictEqual(result.newDataAccept, 'spades-12');
	});

	test('Blocks corner slot for suit already being collected elsewhere', () => {
		const result = evaluateDrop({
			acceptIndex: 13,
			acceptType: 'any',
			cardIndex: 12,
			cardType: 'hearts',
			cornerSuits: ['hearts'],
			isCorner: true,
		});

		assert.strictEqual(result.isAccepted, false);
	});

	test('Wraps corner sequence from ace to king', () => {
		const result = evaluateDrop({
			acceptIndex: 1,
			acceptType: 'diamonds',
			cardIndex: 1,
			cardType: 'diamonds',
			cornerSuits: [],
			isCorner: true,
		});

		assert.strictEqual(result.isAccepted, true);
		assert.strictEqual(result.newDataAccept, 'diamonds-13');
	});
});
