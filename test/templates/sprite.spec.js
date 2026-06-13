import assert from 'node:assert/strict';
import { describe, test } from 'node:test';
import { SPRITE_TEMPLATE } from '#common/templates/sprite.js';

const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];

describe('Templates/Sprite', () => {
	test('Uses SVG namespace', () => {
		assert.match(SPRITE_TEMPLATE, /xmlns="http:\/\/www\.w3\.org\/2000\/svg"/);
	});

	test('Includes symbol for each suit and rank', () => {
		for (const suit of SUITS) {
			for (let rank = 1; rank <= 13; rank++) {
				assert.match(SPRITE_TEMPLATE, new RegExp(`<symbol id="${suit}-${rank}"`));
			}
		}
	});
});
