import { clearShadows } from '#client/modules/functions/clear-shadows.js';
import { createDeck } from '#client/modules/functions/create-deck.js';
import { removeCard } from '#client/modules/functions/remove-card.js';
import {
	closeButtonElement,
	reloadButtonElement,
	restartButtonElement,
	rulesElement,
	tableElement,
	winMessageElement,
} from '#client/modules/settings.js';
import { NUMBER_OF_SLOTS, state } from '#client/modules/state.js';

const TIMEOUT = 300;

/** Закрытие модального окна с правилами */
export function closeRules() {
	rulesElement.hidden = true;
	if (window.location.hash) {
		history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
	}
}

/** Перезапуск игры со сменой колоды */
export function onRestart() {
	clearShadows();

	// Обновляем количество слотов, количество окончательно собранных карт и отсчет формирования колод
	state.numberOfSlots = NUMBER_OF_SLOTS;
	state.numberOfAttached = 0;
	state.cornerSuits = [];

	/** @type {NodeListOf<HTMLElement>} */
	const existsCardElements = tableElement.querySelectorAll('[data-card]');
	if (existsCardElements) {
		// Удаляем существующую колоду со всеми обработчиками
		for (let i = 0; i < existsCardElements.length; i++) {
			removeCard(existsCardElements[i]);
		}
	}

	// Закрываем меню правил и сообщение о победе
	winMessageElement.hidden = true;
	closeRules();
	closeButtonElement.hidden = false;

	// Формируем новую колоду
	window.setTimeout(createDeck, TIMEOUT);

	// Меняем текст кнопки
	restartButtonElement.textContent = state.restartText;

	// Активируем кнопку расклада (на случай деактивации в предыдущем сеансе игры)
	reloadButtonElement.removeAttribute('disabled');

	// Обновляем title кнопки расклада
	reloadButtonElement.title = `${state.reloadTitle} ${state.numberOfSlots - 1} ${state.reloadPlural}`;
}
