import { getDropCoords } from '#client/modules/functions/get-drop-coords.js';
import { onReload } from '#client/modules/functions/on-reload.js';
import { closeRules, onRestart } from '#client/modules/functions/on-restart.js';
import { onRulesOpen } from '#client/modules/functions/on-rules-open.js';
import {
	closeButtonElement,
	deckComponents,
	reloadButtonElement,
	restartButtonElement,
	rulesOpenerElement,
} from '#client/modules/settings.js';
import { state } from '#client/modules/state.js';
import '#client/modules/tg.js';

const CARDS_IN_KEYS = 14;

// Генерация массива карт
const suitKeys = Object.keys(state.suits);
for (let i = 0; i < suitKeys.length; i++) {
	for (let j = 1; j < CARDS_IN_KEYS; j++) {
		deckComponents.push(`${suitKeys[i]}-${j}`);
	}
}

window.addEventListener('resize', getDropCoords);
rulesOpenerElement.addEventListener('click', onRulesOpen);
reloadButtonElement.addEventListener('click', onReload);
restartButtonElement.addEventListener('click', onRestart);
closeButtonElement.addEventListener('click', closeRules);

// Начальное состояние
getDropCoords();
