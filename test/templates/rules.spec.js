import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { RULES_TEMPLATE } from '#common/templates/rules.js';

describe('Templates/Rules', () => {
	test('Includes game title and hidden win message', () => {
		assert.match(RULES_TEMPLATE, /Пасьянс «Колодец»/);
		assert.match(RULES_TEMPLATE, /class="rules__win" hidden/);
	});

	test('Includes restart and closer buttons', () => {
		assert.match(RULES_TEMPLATE, /rules__restart/);
		assert.match(RULES_TEMPLATE, /rules__closer/);
	});

	test('Includes privacy policy section', () => {
		assert.match(RULES_TEMPLATE, /id="privacy"/);
		assert.match(RULES_TEMPLATE, /Политика обработки персональных данных/);
		assert.match(RULES_TEMPLATE, /Яндекс\.Метрика/);
	});
});
