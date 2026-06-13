/**
 * Перемешивание массива на месте алгоритмом Fisher–Yates.
 *
 * @type {(items: unknown[]) => void}
 * */
export function shuffleArray(itens) {
	for (let i = itens.length - 1; i > 0; i--) {
		const swapIndex = Math.floor(Math.random() * (i + 1));
		const temp = itens[i];
		itens[i] = itens[swapIndex];
		itens[swapIndex] = temp;
	}
}
