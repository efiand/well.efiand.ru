const THIRTEENTH_CARD = 13;

/**
 * Проверка правил приёма карты в слот.
 *
 * Сверяет масть и достоинство карты с требованиями слота, учитывает особые
 * правила угловых слотов и возвращает обновлённый `data-accept` для следующей карты.
 *
 * @type {(params: EvaluateDropParams) => EvaluateDropResult}
 */
export function evaluateDrop({ acceptIndex, acceptType, cardIndex, cardType, cornerSuits, isCorner }) {
	// Проверка слота-акцептора по масти
	const isMatchingSuit = acceptType === 'any' || acceptType === cardType;

	// Разница между стоимостью карт и проверка по стоимости
	const valueDiff = cardIndex - acceptIndex;
	let isMatchingValue = !acceptIndex || !valueDiff;

	// Другие условия по стоимости для углового слота
	if (isCorner) {
		isMatchingValue = !valueDiff;

		// Если раскладка масти в углу началась, слот недоступен для этой масти
		if (acceptType === 'any' && acceptIndex === THIRTEENTH_CARD && cornerSuits.indexOf(cardType) > -1) {
			isMatchingValue = false;
		}
	}

	// Итоговое условие доступности слота
	if (!isMatchingSuit || !isMatchingValue) {
		return { isAccepted: false };
	}

	// Формулировка требований для следующей карты
	let newAcceptValue = cardIndex !== THIRTEENTH_CARD ? cardIndex + 1 : 1;
	if (isCorner) {
		newAcceptValue = cardIndex !== 1 ? cardIndex - 1 : THIRTEENTH_CARD;
	}

	return {
		isAccepted: true,
		newDataAccept: `${cardType}-${newAcceptValue}`,
	};
}
