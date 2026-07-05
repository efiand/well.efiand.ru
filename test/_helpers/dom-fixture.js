// @ts-nocheck
import { RULES_TEMPLATE } from '#common/templates/rules.js';
import { TABLE_TEMPLATE } from '#common/templates/table.js';
import { setupDomFixture as setupCoreDomFixture, teardownDomFixture } from '#core/test-helpers/dom-fixture.js';

const CARDS_IN_KEYS = 14;

/** @type {() => Promise<{ deckComponents: string[]; state: typeof import('#client/modules/state.js').state }>} */
async function loadClientModules() {
	const { deckComponents, dropTargetOptions } = await import('#client/modules/settings.js');
	const { state } = await import('#client/modules/state.js');

	deckComponents.length = 0;

	const suitKeys = Object.keys(state.suits);
	for (let index = 0; index < suitKeys.length; index++) {
		for (let rank = 1; rank < CARDS_IN_KEYS; rank++) {
			deckComponents.push(`${suitKeys[index]}-${rank}`);
		}
	}

	state.cornerSuits.length = 0;
	state.numberOfAttached = 0;
	state.numberOfSlots = 5;

	for (const key of Object.keys(dropTargetOptions)) {
		delete dropTargetOptions[key];
	}

	return { deckComponents, state };
}

/** @type {(options?: { url?: string }) => import('happy-dom').Window} */
function setupDomFixture(options = {}) {
	return setupCoreDomFixture({
		...options,
		html: /* html */ `<main>${RULES_TEMPLATE}${TABLE_TEMPLATE}</main>`,
	});
}

export { loadClientModules, setupDomFixture, teardownDomFixture };
