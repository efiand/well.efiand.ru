import { SPRITE_TEMPLATE } from '#common/templates/sprite.js';

/** @type {(data: LayoutData) => string} */
function renderLayout({ pageTemplate = '' }) {
	return /* html */ `
		<div hidden>${SPRITE_TEMPLATE}</div>
		<main>${pageTemplate}</main>
	`;
}

export { renderLayout };
