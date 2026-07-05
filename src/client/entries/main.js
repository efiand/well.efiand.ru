import '#common/configure-site.js';
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

const suitKeys = Object.keys(state.suits);
for (let index = 0; index < suitKeys.length; index++) {
	for (let rank = 1; rank < CARDS_IN_KEYS; rank++) {
		deckComponents.push(`${suitKeys[index]}-${rank}`);
	}
}

window.addEventListener('resize', getDropCoords);
rulesOpenerElement.addEventListener('click', onRulesOpen);
reloadButtonElement.addEventListener('click', onReload);
restartButtonElement.addEventListener('click', onRestart);
closeButtonElement.addEventListener('click', closeRules);

getDropCoords();
