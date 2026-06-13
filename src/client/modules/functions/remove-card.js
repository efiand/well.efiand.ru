import { onCurrentClick } from './on-current-click.js';
import { onDonorClick } from './on-donor-click.js';
import { unbindOnDragDrop } from './on-drag-drop.js';

/**
 * Удаление карты с обработчиками
 *
 * @type {(cardElement: HTMLElement) => void}
 */
export function removeCard(cardElement) {
	cardElement.removeEventListener('click', onCurrentClick);
	cardElement.removeEventListener('click', onDonorClick);
	unbindOnDragDrop(cardElement);
	cardElement.remove();
}
