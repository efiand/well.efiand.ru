import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/On-rules-open', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Opens rules modal on click', async () => {
		const { onRulesOpen } = await import('#client/modules/functions/on-rules-open.js');
		const { rulesElement, rulesOpenerElement } = await import('#client/modules/settings.js');

		rulesElement.hidden = true;

		rulesOpenerElement.addEventListener('click', onRulesOpen);
		rulesOpenerElement.dispatchEvent(new PointerEvent('click', { bubbles: true, cancelable: true }));

		assert.strictEqual(rulesElement.hidden, false);
	});
});
