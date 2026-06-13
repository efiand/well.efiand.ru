import assert from 'node:assert/strict';
import { after, before, describe, test } from 'node:test';
import { HtmlValidate } from 'html-validate';
import * as bemLinter from 'posthtml-bem-linter';
import { ALL_PAGES } from '#common/constants.js';
import { log } from '#common/lib/log.js';
import { closeApp, createApp, getAppHost, waitForApp } from '#server/lib/app.js';
import validatorConfig from '../../.htmlvalidate.js';

const htmlvalidate = new HtmlValidate(validatorConfig);

/** @type {string[]} */
let markups = [];

/** @type {import("node:http").Server | undefined} */
let server;

async function getMarkup(page = '') {
	return await fetch(`${getAppHost(server)}${page}`).then((res) => res.text());
}

describe('Integration', () => {
	before(async () => {
		if (!server) {
			server = createApp({ isQuiet: true, port: 0 });
			await waitForApp(server);
		}

		if (!markups.length) {
			markups = await Promise.all(ALL_PAGES.map(getMarkup));
		}
	});

	after(async () => {
		await closeApp(server);
	});

	describe('Markup', () => {
		test('All pages have valid BEM classes in markup', () => {
			let errorsCount = 0;

			ALL_PAGES.forEach((page, i) => {
				const result = bemLinter.lintBem({ content: markups[i], log: log.error, name: page });
				if (result.warningCount) {
					errorsCount++;
				}
			});

			assert.strictEqual(errorsCount, 0);
		});

		test('All pages have valid HTML markup', async () => {
			let errorsCount = 0;

			await Promise.all(
				ALL_PAGES.map(async (page, i) => {
					const report = await htmlvalidate.validateString(markups[i]);
					if (!report.valid) {
						errorsCount++;
						report.results.forEach(({ messages }) => {
							messages.forEach(({ column, line, message, ruleUrl }) => {
								log.error(`${page} [${line}:${column}] ${message} (${ruleUrl})`);
							});
						});
					}
				}),
			);

			assert.strictEqual(errorsCount, 0);
		});
	});

	describe('Pages', () => {
		test('Home page includes game table and rules', async () => {
			const markup = await getMarkup('/');

			assert.match(markup, /class="table"/);
			assert.match(markup, /Пасьянс «Колодец»/);
			assert.match(markup, /card--corner-top-left/);
		});

		test('Home page includes privacy policy section', async () => {
			const markup = await getMarkup('/');

			assert.match(markup, /id="privacy"/);
			assert.match(markup, /Политика обработки персональных данных/);
		});

		test('Unknown route returns home page content', async () => {
			const markup = await getMarkup('/unknown-page');

			assert.match(markup, /class="table"/);
			assert.match(markup, /Пасьянс «Колодец»/);
		});
	});
});
