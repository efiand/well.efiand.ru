import { baseLeft, dropTargetOptions, tableElement } from '#client/modules/settings.js';
import { state } from '#client/modules/state.js';

/** Вычисление координат дропзон */
export function getDropCoords() {
	for (let i = 0; i < state.dropTargets.length; i++) {
		const dropTarget = state.dropTargets[i];
		const dropTargetElement = /** @type {HTMLElement} */ (tableElement.querySelector(`.card--${dropTarget}`));

		dropTargetOptions[dropTarget] = {
			left: baseLeft + dropTargetElement.offsetLeft,
			top: dropTargetElement.offsetTop,
		};
	}
}
