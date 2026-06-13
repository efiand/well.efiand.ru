import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { YANDEX_METRIKA_ID } from '#common/constants.js';
import { YANDEX_METRIKA_TEMPLATE } from '#common/templates/yandex-metrika.js';

describe('Templates/Yandex-metrika', () => {
	test('Includes metrika id in script and noscript', () => {
		assert.match(YANDEX_METRIKA_TEMPLATE, new RegExp(`ym\\(${YANDEX_METRIKA_ID}, "init"`));
		assert.match(YANDEX_METRIKA_TEMPLATE, new RegExp(`watch/${YANDEX_METRIKA_ID}`));
	});

	test('Defers script loading with timeout', () => {
		assert.match(YANDEX_METRIKA_TEMPLATE, /setTimeout/);
		assert.match(YANDEX_METRIKA_TEMPLATE, /mc\.yandex\.ru\/metrika\/tag\.js/);
	});
});
