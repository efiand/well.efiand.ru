import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { TABLE_TEMPLATE } from '#common/templates/table.js';

describe('Templates/Table', () => {
	test('Includes corner drop zones with any-13 accept rule', () => {
		assert.match(TABLE_TEMPLATE, /card--corner-top-left/);
		assert.match(TABLE_TEMPLATE, /card--corner-top-right/);
		assert.match(TABLE_TEMPLATE, /card--corner-bottom-left/);
		assert.match(TABLE_TEMPLATE, /card--corner-bottom-right/);
		assert.match(TABLE_TEMPLATE, /data-accept="any-13"/g);
	});

	test('Includes central slot and donor or acceptor decks', () => {
		assert.match(TABLE_TEMPLATE, /card--central/);
		assert.match(TABLE_TEMPLATE, /data-accept="any-1"/);
		assert.match(TABLE_TEMPLATE, /card--donor-top/);
		assert.match(TABLE_TEMPLATE, /card--acceptor-top/);
	});

	test('Includes five work slots and control buttons', () => {
		assert.match(TABLE_TEMPLATE, /card--work-1/);
		assert.match(TABLE_TEMPLATE, /card--work-5/);
		assert.match(TABLE_TEMPLATE, /card--reload/);
		assert.match(TABLE_TEMPLATE, /table__rules-opener/);
	});
});
