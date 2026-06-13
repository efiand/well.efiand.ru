import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { routes } from '#server/routes/index.js';

describe('Routes/Index', () => {
	test('Registers all public routes', () => {
		assert.ok(routes['/']?.GET);
		assert.ok(routes['/sitemap.xml']?.GET);
	});
});
