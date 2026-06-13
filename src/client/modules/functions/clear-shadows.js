import { tableElement } from '#client/modules/settings.js';
import { state } from '#client/modules/state.js';

/** Очистка теней */
export function clearShadows() {
	for (let i = 0; i < state.dropTargets.length; i++) {
		const slotElements = tableElement.querySelectorAll(`.card--${state.dropTargets[i]}`);
		for (let j = 0; j < slotElements.length; j++) {
			slotElements[j].classList.remove('card--acceptable');
		}
	}
}
