import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { SyntaxValidator } from 'fast-xml-validator';
import { BASE_URL } from '#common/constants.js';
import { log } from '#common/lib/log.js';
import { sitemapXmlRoute } from '#server/routes/sitemap-xml.js';
import { createRouteParams } from '../_helpers/route-params.js';

describe('Routes/Sitemap-xml', () => {
	test('Returns well-formed xml', async () => {
		const { template } = await sitemapXmlRoute.GET(createRouteParams());
		const result = SyntaxValidator.validate((template ?? '').trim());
		const isValid = result === true;

		if (!isValid) {
			const { msg, line, col } = result.err;
			log.error(`sitemap.xml [${line}:${col}] ${msg}`);
		}

		assert.strictEqual(isValid, true);
	});

	test('Returns xml sitemap with home page url', async () => {
		const { contentType, template } = await sitemapXmlRoute.GET(createRouteParams());
		const xml = (template ?? '').trim();

		assert.strictEqual(contentType, 'application/xml');
		assert.match(xml, /^<\?xml version="1.0" encoding="UTF-8" \?>/);
		assert.match(xml, /<urlset xmlns="https:\/\/www\.sitemaps\.org\/schemas\/sitemap\/0\.9"/);
		assert.match(xml, new RegExp(`<loc>${BASE_URL}/</loc>`));
		assert.match(xml, /<priority>0\.8<\/priority>/);
	});
});
