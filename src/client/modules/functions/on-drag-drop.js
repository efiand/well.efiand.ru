import { clearShadows } from '#client/modules/functions/clear-shadows.js';
import { evaluateDrop } from '#client/modules/functions/evaluate-drop.js';
import { showWinMessage } from '#client/modules/functions/show-win-message.js';
import { baseLeft, dropTargetOptions, reloadButtonElement, tableElement } from '#client/modules/settings.js';
import { MAX_ATTACHED, state } from '#client/modules/state.js';

const CONTROLS_COUNT = 8;

class Coords {
	/**
	 * @param {number} clientX - Координата указателя по оси X
	 * @param {number} clientY - Координата указателя по оси Y
	 */
	constructor(clientX, clientY) {
		this.clientX = clientX;
		this.clientY = clientY;
	}
}

/**
 * Добавление всех обработчиков перемещения на карту
 *
 * @type {(cardElement: HTMLElement) => void}
 */
export function bindOnDragDrop(cardElement) {
	cardElement.classList.add('card--draggable');
	cardElement.addEventListener('mousedown', onDragDrop);
	cardElement.addEventListener('touchstart', onDragDrop, { passive: false });
}

/**
 * Перемещение карты
 *
 * @type {(event: MouseEvent | TouchEvent) => void}
 */
export function onDragDrop(event) {
	event.preventDefault();

	const cardElement = /** @type {HTMLElement} */ (event.currentTarget);

	// @ts-expect-error
	const startCoordsBase = event.changedTouches?.[0] || event;
	const startCoords = new Coords(startCoordsBase.clientX, startCoordsBase.clientY);

	const [dataCardType, dataCardIndex] = /** @type {string} */ (cardElement.getAttribute('data-card')).split('-');
	const startLeft = cardElement.style.left;
	const startTop = cardElement.style.top;

	/** @type {HTMLElement | null} */
	let targetElement = null;

	/** @type {string | null} */
	let newDataAccept = null;

	let isAccepted = false;
	let isCorner = false;

	tableElement.append(cardElement);

	// Тень
	cardElement.classList.add('card--pulled');

	// Добавление обработчиков перемещения мышью либо тачем
	//@ts-expect-error
	if (event.changedTouches?.[0]) {
		document.addEventListener('touchmove', onMove, { passive: false });
		document.addEventListener('touchend', onUp, { passive: false });
	} else {
		document.addEventListener('mousemove', onMove);
		document.addEventListener('mouseup', onUp);
	}

	/** @type {(moveEvent: MouseEvent | TouchEvent) => void} */
	function onMove(moveEvent) {
		moveEvent.preventDefault();

		// @ts-expect-error
		const coordBase = moveEvent.changedTouches?.[0] || moveEvent;
		const { clientX, clientY } = coordBase;

		isAccepted = false;
		const diffCoords = new Coords(startCoords.clientX - clientX, startCoords.clientY - clientY);

		startCoords.clientX = clientX;
		startCoords.clientY = clientY;

		const currentLeft = cardElement.offsetLeft - diffCoords.clientX;
		const currentTop = cardElement.offsetTop - diffCoords.clientY;

		cardElement.style.left = `${currentLeft}px`;
		cardElement.style.top = `${currentTop}px`;

		clearShadows();

		// Поиск доступного слота
		const [targetClass] = state.dropTargets.filter(
			(item) =>
				Math.abs(currentLeft + baseLeft - dropTargetOptions[item].left) < cardElement.clientWidth &&
				Math.abs(currentTop - dropTargetOptions[item].top) < cardElement.clientHeight,
		);

		// Если карта пролетает над целевой ячейкой
		if (targetClass) {
			/** @type {NodeListOf<HTMLElement>} */
			const targetElements = tableElement.querySelectorAll(`.card--${targetClass}`);
			targetElement = targetElements[targetElements.length - 1];

			const [dataAcceptType, dataAcceptIndex] = (targetElement.getAttribute('data-accept') || 'any-0').split('-');
			const cardValue = parseInt(dataCardIndex, 10);
			const acceptValue = parseInt(dataAcceptIndex, 10);

			isCorner = targetElement.className.indexOf('corner') > -1;

			const dropResult = evaluateDrop({
				acceptIndex: acceptValue,
				acceptType: dataAcceptType,
				cardIndex: cardValue,
				cardType: dataCardType,
				cornerSuits: state.cornerSuits,
				isCorner,
			});

			if (dropResult.isAccepted) {
				isAccepted = true;
				targetElement.classList.add('card--acceptable');
				newDataAccept = dropResult.newDataAccept ?? null;
			}
		}
	}

	/** @type {(upEvent: MouseEvent | TouchEvent) => void} */
	function onUp(upEvent) {
		upEvent.preventDefault();

		document.removeEventListener('mousemove', onMove);
		document.removeEventListener('touchmove', onMove);
		document.removeEventListener('mouseup', onUp);
		document.removeEventListener('touchend', onUp);

		// Если карта отпущена над целевой ячейкой
		if (isAccepted && targetElement) {
			cardElement.style.left = targetElement.style.left;
			cardElement.style.top = targetElement.style.top;
			cardElement.className = targetElement.className;
			cardElement.classList.remove('card--empty');
			cardElement.classList.remove('card--acceptable');
			if (cardElement.className.indexOf('corner') > -1) {
				state.numberOfAttached++;
				unbindOnDragDrop(cardElement);
				if (state.cornerSuits.indexOf(dataCardType) === -1) {
					state.cornerSuits.push(dataCardType);
				}
			} else {
				cardElement.classList.add('card--draggable');
			}
			if (state.numberOfAttached === MAX_ATTACHED) {
				showWinMessage();
			}
			if (newDataAccept) {
				cardElement.setAttribute('data-accept', newDataAccept);
			}
			if (targetElement === cardElement) {
				cardElement.style.left = startLeft;
				cardElement.style.top = startTop;
			}
		} else {
			cardElement.style.left = startLeft;
			cardElement.style.top = startTop;
		}

		// Удаляем тень
		cardElement.classList.remove('card--pulled');

		// Если в раскладе пусто, деактивируем кнопку повторного расклада
		if (tableElement.querySelectorAll('.card--control').length < CONTROLS_COUNT) {
			reloadButtonElement.setAttribute('disabled', 'disabled');
			reloadButtonElement.title = 'Раскладывать нечего ☹';
		}
	}
}

/**
 * Удаление всех обработчиков перемещения с карты
 *
 * @type {(cardElement: HTMLElement) => void}
 */
export function unbindOnDragDrop(cardElement) {
	cardElement.classList.remove('card--draggable');
	cardElement.removeEventListener('mousedown', onDragDrop);
	cardElement.removeEventListener('touchstart', onDragDrop);
}
