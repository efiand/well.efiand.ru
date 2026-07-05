import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { registerMarkupValidationTests, useIntegrationFixture } from '#core/test-helpers/integration-fixture.js';
import { createApp } from '#server/lib/app.js';

const fixture = useIntegrationFixture({ createApp });

describe('Интеграция', () => {
	registerMarkupValidationTests(fixture);

	describe('Страницы', () => {
		test('Главная содержит игровой стол и правила', async () => {
			const markup = await fixture.getMarkup('/');

			assert.match(markup, /class="table"/);
			assert.match(markup, /Пасьянс «Колодец»/);
			assert.match(markup, /card--corner-top-left/);
		});

		test('Главная содержит блок политики конфиденциальности', async () => {
			const markup = await fixture.getMarkup('/');

			assert.match(markup, /id="privacy"/);
			assert.match(markup, /Политика обработки персональных данных/);
		});

		test('Неизвестный маршрут возвращает страницу 404', async () => {
			const markup = await fixture.getMarkup('/unknown-page');

			assert.match(markup, /Ошибка 404/);
			assert.match(markup, /Страница не найдена/);
		});
	});
});
