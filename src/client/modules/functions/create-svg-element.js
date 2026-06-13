/**
 * Генерация SVG с использование символьного спрайта
 *
 * @type {(symbolId: string, title?: string) => SVGSVGElement}
 */
export function createSvgElement(symbolId, title) {
	const svgElement = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
	const useElement = document.createElementNS('http://www.w3.org/2000/svg', 'use');

	useElement.setAttributeNS('http://www.w3.org/1999/xlink', 'href', `#${symbolId}`);
	svgElement.append(useElement);

	if (title) {
		const titleElement = document.createElementNS('http://www.w3.org/2000/svg', 'title');
		titleElement.textContent = title;
		svgElement.prepend(titleElement);
	}

	return svgElement;
}
