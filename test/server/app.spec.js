import assert from 'node:assert/strict';
import { afterEach, describe, test } from 'node:test';
import { closeApp, createApp, waitForApp } from '#server/lib/app.js';

/** @type {import("node:http").Server | undefined} */
let server;

describe('Server/App', () => {
	afterEach(async () => {
		await closeApp(server);
		server = undefined;
	});

	test('waitForApp resolves when server starts listening', async () => {
		server = createApp({ isQuiet: true, port: 0 });

		await waitForApp(server);

		assert.strictEqual(server.listening, true);
	});

	test('waitForApp resolves immediately when server is already listening', async () => {
		server = createApp({ isQuiet: true, port: 0 });
		await waitForApp(server);

		await waitForApp(server);

		assert.strictEqual(server.listening, true);
	});
});
