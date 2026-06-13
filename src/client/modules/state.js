export const MAX_ATTACHED = 104;

export const NUMBER_OF_SLOTS = 5;

export const state = {
	/**
	 * Список мастей, которые начали собирать
	 *
	 * @type {string[]}
	 */
	cornerSuits: [],

	dropTargets: [
		'corner-top-left',
		'corner-top-right',
		'corner-bottom-left',
		'corner-bottom-right',
		'acceptor-top',
		'acceptor-right',
		'acceptor-bottom',
		'acceptor-left',
		'central',
	],

	/** @type {Record<string, string>} */
	names: {
		1: 'туз',
		11: 'валет',
		12: 'дама',
		13: 'король',
	},

	/** Счётчик пристроенных карт */
	numberOfAttached: 0,

	/** Число слотов в нижнем ряду для раздачи карт */
	numberOfSlots: NUMBER_OF_SLOTS,

	reloadPlural: 'слота',
	reloadSingular: 'слот',
	reloadTitle: 'Начать повторную раскладку на',
	restartText: 'Разложить заново',

	/** @type {Record<string, string>} */
	suits: {
		clubs: 'Трефы',
		diamonds: 'Бубны',
		hearts: 'Червы',
		spades: 'Пики',
	},

	/** @type {Record<string, string>} */
	values: {
		1: 'A',
		11: 'J',
		12: 'Q',
		13: 'K',
	},

	willSlotsText: 'Будет разложено карт: ',
};
