import { onCurrentClick } from '#client/modules/functions/on-current-click.js';
import { reloadButtonElement, tableElement } from '#client/modules/settings.js';
import { state } from '#client/modules/state.js';

const MORE_SLOTS = 2;

/** Расклад левой нижней кнопкой */
export function onReload() {
	for (let i = 1; i <= state.numberOfSlots; i++) {
		const targetClass = `card--work-${i}`;
		const workCardElements = tableElement.querySelectorAll(`.${targetClass}:not(.card--empty)`);
		for (let j = 0; j < workCardElements.length; j++) {
			const cardElement = workCardElements[j];
			cardElement.classList.remove(targetClass);
			cardElement.classList.add('card--run');
			cardElement.classList.add('card--shirt');
			tableElement.append(cardElement);
		}
	}

	if (state.numberOfSlots > 1) {
		state.numberOfSlots--;
		reloadButtonElement.title = `${state.reloadTitle} ${state.numberOfSlots - 1} ${state.reloadPlural}`;
	}

	if (state.numberOfSlots <= MORE_SLOTS) {
		reloadButtonElement.title = `${state.reloadTitle} 1 ${state.reloadSingular}`;
	}

	tableElement.lastChild?.addEventListener('click', onCurrentClick);
	onCurrentClick();
}
