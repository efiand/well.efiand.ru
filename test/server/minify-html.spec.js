import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { minifyHtml } from '#server/lib/minify-html.js';

describe('Server/Minify-html', () => {
	test('Collapses whitespace and removes comments', async () => {
		const html = /* html */ `
		<!-- comment -->
		<div class="foo">
			Hello   world
		</div>
	`;

		const result = await minifyHtml(html);

		assert.doesNotMatch(result, /<!--/);
		assert.match(result, /<div class=foo>/);
		assert.match(result, />Hello world</);
	});

	test('Minifies inline script', async () => {
		const html = /* html */ '<script>const  x  =  1 ;</script>';

		const result = await minifyHtml(html);

		assert.match(result, /<script>/);
		assert.doesNotMatch(result, /const {2}x/);
	});

	test('Wraps template literal placeholders in quotes', async () => {
		const dollarSign = '$';
		const html = /* html */ `<a href=${dollarSign}{link} class=${dollarSign}{className}>text</a>`;

		const result = await minifyHtml(html);

		assert.match(result, /href="\$\{link\}"/);
		assert.match(result, /class="\$\{className\}"/);
	});
});
