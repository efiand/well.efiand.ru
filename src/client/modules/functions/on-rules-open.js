import { rulesElement } from '#client/modules/settings.js';

/**
 * Открытие модального окна с правилами
 *
 * @type {(event: PointerEvent) => void}
 */
export function onRulesOpen(event) {
	event.preventDefault();

	rulesElement.hidden = false;

	if (event.target instanceof HTMLElement) {
		event.target.blur();
	}
}
