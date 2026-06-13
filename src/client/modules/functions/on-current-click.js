import { manageSlot } from '#client/modules/functions/manage-slot.js';
import { bindOnDragDrop, unbindOnDragDrop } from '#client/modules/functions/on-drag-drop.js';
import { tableElement } from '#client/modules/settings.js';
import { state } from '#client/modules/state.js';

const MORE_SLOTS = 2;

/** Раскидывание карт в слоты */
export function onCurrentClick() {
	/** @type {NodeListOf<HTMLElement>} */
	const runCardElements = tableElement.querySelectorAll('.card--run[data-card]');

	const count = runCardElements.length - 1;
	const clickedRunCardElement = runCardElements[count];

	clickedRunCardElement.removeEventListener('click', onCurrentClick);
	clickedRunCardElement.removeAttribute('title');
	bindOnDragDrop(clickedRunCardElement);

	const nextRunClickIndex = count > state.numberOfSlots - MORE_SLOTS ? count - state.numberOfSlots : -1;
	if (nextRunClickIndex !== -1) {
		const nextRunClickCardElement = runCardElements[nextRunClickIndex];
		nextRunClickCardElement.setAttribute('title', `${state.willSlotsText}${state.numberOfSlots}`);
		nextRunClickCardElement.addEventListener('click', onCurrentClick);
		unbindOnDragDrop(nextRunClickCardElement);
	}

	let slotNumber = 0;
	for (let i = count; i > nextRunClickIndex; i--) {
		slotNumber++;
		manageSlot(runCardElements, i, slotNumber);
	}
}
