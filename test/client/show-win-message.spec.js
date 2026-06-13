import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { loadClientModules, setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/Show-win-message', () => {
	before(async () => {
		setupDomFixture();
		await loadClientModules();
	});

	test('Shows win message and opens rules modal', async () => {
		const { showWinMessage } = await import('#client/modules/functions/show-win-message.js');
		const { onRulesOpen } = await import('#client/modules/functions/on-rules-open.js');
		const { closeButtonElement, rulesElement, rulesOpenerElement, winMessageElement } = await import(
			'#client/modules/settings.js'
		);

		rulesElement.hidden = true;
		winMessageElement.hidden = true;
		closeButtonElement.hidden = false;
		rulesOpenerElement.addEventListener('click', onRulesOpen);

		showWinMessage();

		assert.strictEqual(winMessageElement.hidden, false);
		assert.strictEqual(closeButtonElement.hidden, true);
		assert.strictEqual(rulesElement.hidden, false);
	});
});
