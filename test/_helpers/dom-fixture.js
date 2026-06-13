// @ts-nocheck
import { Window } from 'happy-dom';
import { RULES_TEMPLATE } from '#common/templates/rules.js';
import { TABLE_TEMPLATE } from '#common/templates/table.js';

const CARDS_IN_KEYS = 14;

/** @type {unknown} */
let previousDocument;

/** @type {unknown} */
let previousWindow;

/** @type {Window | undefined} */
let windowInstance;

/** @type {() => Promise<{ deckComponents: string[]; state: typeof import('#client/modules/state.js').state }>} */
export async function loadClientModules() {
	const { deckComponents, dropTargetOptions } = await import('#client/modules/settings.js');
	const { state } = await import('#client/modules/state.js');

	deckComponents.length = 0;

	const suitKeys = Object.keys(state.suits);
	for (let i = 0; i < suitKeys.length; i++) {
		for (let j = 1; j < CARDS_IN_KEYS; j++) {
			deckComponents.push(`${suitKeys[i]}-${j}`);
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

/** @type {(options?: { url?: string }) => Window} */
export function setupDomFixture(options = {}) {
	if (windowInstance) {
		windowInstance.close();
	}

	windowInstance = new Window({
		height: 768,
		url: options.url ?? 'http://localhost/',
		width: 1024,
	});

	previousWindow = globalThis.window;
	previousDocument = globalThis.document;

	globalThis.window = windowInstance;
	globalThis.document = windowInstance.document;
	globalThis.HTMLElement = windowInstance.HTMLElement;
	globalThis.MouseEvent = windowInstance.MouseEvent;
	globalThis.TouchEvent = windowInstance.TouchEvent;
	globalThis.PointerEvent = windowInstance.PointerEvent;
	globalThis.history = windowInstance.history;
	globalThis.location = windowInstance.location;

	document.body.innerHTML = /* html */ `<main>${RULES_TEMPLATE}${TABLE_TEMPLATE}</main>`;

	return windowInstance;
}

export function teardownDomFixture() {
	if (!windowInstance) {
		return;
	}

	windowInstance.close();
	windowInstance = undefined;

	if (previousWindow) {
		globalThis.window = previousWindow;
	}
	if (previousDocument) {
		globalThis.document = previousDocument;
	}
}
