import { createSvgElement } from '#client/modules/functions/create-svg-element.js';
import { onCurrentClick } from '#client/modules/functions/on-current-click.js';
import { onDonorClick } from '#client/modules/functions/on-donor-click.js';
import { bindOnDragDrop } from '#client/modules/functions/on-drag-drop.js';
import { deckComponents, tableElement } from '#client/modules/settings.js';
import { state } from '#client/modules/state.js';
import { shuffleArray } from '#core/common/lib/shuffle-array.js';

const Count = {
	FOUR_DECKS: 44,
	MAX: 103,
	ONE_DECK: 11,
	THREE_DECKS: 33,
	TWO_DECKS: 22,
};

/** Генерация и раскладка 104 карт на игровом поле */
export function createDeck() {
	/** Удвоенная колода */
	const cards = deckComponents.concat(deckComponents);

	// Тасуем удвоенную колоду
	shuffleArray(cards);

	const deckFragment = document.createDocumentFragment();
	for (let i = 0; i < cards.length; i++) {
		const cardId = cards[i];
		const [cardType, cardIndex] = cardId.split('-');
		const buttonElement = document.createElement('div');

		// Раскладываем по 11 карт по стенкам колодца, остальные в колоду
		let suffix = 'control card--run';
		if (i < Count.ONE_DECK) {
			suffix = 'donor-top';
		} else if (i < Count.TWO_DECKS) {
			suffix = 'donor-left';
		} else if (i < Count.THREE_DECKS) {
			suffix = 'donor-right';
		} else if (i < Count.FOUR_DECKS) {
			suffix = 'donor-bottom';
		}

		buttonElement.className = `card card--${suffix} card--shirt card--${cardType}`;
		buttonElement.dataset.card = cardId;

		// Центральный контейнер
		const svgElement = createSvgElement(cardId, `${state.suits[cardType]}: ${state.names[cardIndex] || cardIndex}`);
		svgElement.classList.add('card__info', 'card__svg');
		buttonElement.append(svgElement);

		// Контейнер в левом верхнем углу
		const cornerElement = document.createElement('span');
		cornerElement.className = `card__corner card__corner--${cardType}`;
		cornerElement.textContent = state.values[cardIndex] || cardIndex;

		// Левый верхний угол
		const iconSvgElement = createSvgElement(cardType);
		iconSvgElement.classList.add('card__icon', 'card__svg');
		cornerElement.append(iconSvgElement);
		buttonElement.append(cornerElement);

		// Правый нижний угол
		const bottomCornerElement = cornerElement.cloneNode(true);
		cornerElement.classList.add('card__corner--bottom');
		buttonElement.append(bottomCornerElement);

		// Для крайней карты или карты по углам
		if (i === Count.MAX) {
			buttonElement.addEventListener('click', onCurrentClick);
			buttonElement.title = `${state.willSlotsText}${state.numberOfSlots}`;
		} else if (i < Count.FOUR_DECKS) {
			buttonElement.addEventListener('click', onDonorClick);
		} else {
			bindOnDragDrop(buttonElement);
		}

		// Добавление к колоде
		deckFragment.append(buttonElement);
	}

	tableElement.append(deckFragment);
}
