import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { log } from '#common/lib/log.js';

/** @type {unknown[][]} */
const calls = [];

/** @type {Record<string, (...args: unknown[]) => void>} */
const original = {
	error: console.error,
	info: console.info,
	warn: console.warn,
};

function mockConsole() {
	console.error = (...args) => {
		calls.push(['error', ...args]);
	};
	console.info = (...args) => {
		calls.push(['info', ...args]);
	};
	console.warn = (...args) => {
		calls.push(['warn', ...args]);
	};
}

function restoreConsole() {
	console.error = original.error;
	console.info = original.info;
	console.warn = original.warn;
}

describe('Lib/Log', () => {
	test('Error logs Error stack', () => {
		calls.length = 0;
		mockConsole();

		const error = new Error('boom');
		log.error(error);

		restoreConsole();

		assert.match(String(calls[1][1]), /boom/);
	});

	test('Info wraps messages with level and separator', () => {
		calls.length = 0;
		mockConsole();

		log.info('hello');

		restoreConsole();

		assert.strictEqual(calls.length, 3);
		assert.match(String(calls[0][1]), /^─{10} \[INFO \|/);
		assert.match(String(calls[0][1]), /─{10}$/);
		assert.strictEqual(calls[1][1], 'hello');
		assert.strictEqual(String(calls[2][1]).length, String(calls[0][1]).length);
		assert.match(String(calls[2][1]), /^─+$/);
	});
});
