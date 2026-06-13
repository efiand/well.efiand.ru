import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { minifySitemap } from '#common/lib/minify-sitemap.js';

describe('Lib/Minify-sitemap', () => {
	test('Removes line breaks and collapses whitespace between tags', () => {
		const xml = /* xml */ `<urlset>
		<url>
			<loc>https://example.com/</loc>
		</url>
	</urlset>`;

		const result = minifySitemap(xml);

		assert.strictEqual(result.includes('\n'), false);
		assert.strictEqual(result, '<urlset><url><loc>https://example.com/</loc></url></urlset>');
	});

	test('Removes XML comments', () => {
		const xml = /* xml */ `<?xml version="1.0" encoding="UTF-8"?>
		<!-- generated -->
		<urlset><url><loc>https://example.com/</loc></url></urlset>`;

		const result = minifySitemap(xml);

		assert.doesNotMatch(result, /<!--/);
		assert.match(result, /<urlset><url>/);
	});

	test('Trims surrounding whitespace', () => {
		const result = minifySitemap('\n  <urlset></urlset>  \n');

		assert.strictEqual(result, '<urlset></urlset>');
	});
});
