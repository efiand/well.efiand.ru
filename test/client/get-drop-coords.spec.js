import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/Get-drop-coords', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Populates dropTargetOptions for all drop targets', async () => {
		const { getDropCoords } = await import('#client/modules/functions/get-drop-coords.js');
		const { dropTargetOptions } = await import('#client/modules/settings.js');
		const { state } = await import('#client/modules/state.js');

		getDropCoords();

		for (const target of state.dropTargets) {
			assert.ok(dropTargetOptions[target]);
			assert.strictEqual(typeof dropTargetOptions[target].left, 'number');
			assert.strictEqual(typeof dropTargetOptions[target].top, 'number');
		}
	});
});
