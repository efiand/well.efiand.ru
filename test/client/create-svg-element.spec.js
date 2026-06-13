import assert from 'node:assert/strict';
import { before, describe, test } from 'node:test';
import { setupDomFixture } from '../_helpers/dom-fixture.js';

describe('Client/Create-svg-element', () => {
	before(() => {
		setupDomFixture();
	});

	test('Creates SVG element with use reference to sprite symbol', async () => {
		const { createSvgElement } = await import('#client/modules/functions/create-svg-element.js');
		const svgElement = createSvgElement('hearts-7');

		assert.strictEqual(svgElement.namespaceURI, 'http://www.w3.org/2000/svg');
		assert.match(svgElement.innerHTML, /href="#hearts-7"/);
	});

	test('Adds title element when title is passed', async () => {
		const { createSvgElement } = await import('#client/modules/functions/create-svg-element.js');
		const svgElement = createSvgElement('hearts-7', 'Черви: 7');

		assert.strictEqual(svgElement.querySelector('title')?.textContent, 'Черви: 7');
	});
});
