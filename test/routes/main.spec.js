import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { RULES_TEMPLATE } from '#common/templates/rules.js';
import { TABLE_TEMPLATE } from '#common/templates/table.js';
import { mainRoute } from '#server/routes/main.js';
import { createRouteParams } from '../_helpers/route-params.js';

describe('Routes/Main', () => {
	test('Returns rules and table templates with yandex verification meta', async () => {
		const { page } = await mainRoute.GET(createRouteParams());

		assert.strictEqual(page?.pageTemplate, `${RULES_TEMPLATE}${TABLE_TEMPLATE}`);
		assert.match(page?.headTemplate ?? '', /yandex-verification/);
		assert.match(page?.headTemplate ?? '', /6891d630ad9271e6/);
	});
});
