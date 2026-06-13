import { bindOnDragDrop } from '#client/modules/functions/on-drag-drop.js';

/**
 * Открытие перевёрнутой карты на стенке колодца
 *
 * @type {(event: MouseEvent) => void}
 */
export function onDonorClick(event) {
	if (event.currentTarget instanceof HTMLElement) {
		event.currentTarget.classList.remove('card--shirt');
		event.currentTarget.removeEventListener('click', onDonorClick);
		bindOnDragDrop(event.currentTarget);
	}
}
