import { tableElement } from '#client/modules/settings.js';

const COEFF = 75;

/**
 * Настройка параметров слота при раскладке
 *
 * @type {(runCardElements: NodeListOf<HTMLElement>, index: number, slotNumber: number) => void}
 */
export function manageSlot(runCardElements, index, slotNumber) {
	window.setTimeout(() => {
		runCardElements[index].classList.remove('card--run');
		runCardElements[index].classList.remove('card--shirt');
		runCardElements[index].classList.add(`card--work-${slotNumber}`);
		tableElement.append(runCardElements[index]);
	}, slotNumber * COEFF);
}
