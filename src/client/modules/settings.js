/** Поле игры */
export const tableElement = /** @type {HTMLElement} */ (document.querySelector('.table'));

/** Модальное окно с правилами */
export const rulesElement = /** @type {HTMLElement} */ (document.querySelector('.rules'));

/** Кнопка закрытия правил */
export const closeButtonElement = /** @type {HTMLElement} */ (rulesElement.querySelector('.rules__closer'));

/** Кнопка перезапуска */
export const restartButtonElement = /** @type {HTMLElement} */ (rulesElement.querySelector('.rules__restart'));

/** Сообщение о выигрыше */
export const winMessageElement = /** @type {HTMLElement} */ (rulesElement.querySelector('.rules__win'));

/** Кнопка сдачи карт  */
export const reloadButtonElement = /** @type {HTMLElement} */ (tableElement.querySelector('.card--reload'));

/** Кнопка открытия модального окна */
export const rulesOpenerElement = /** @type {HTMLElement} */ (tableElement.querySelector('.table__rules-opener'));

/**
 * Величина отступа от края браузера до края стола
 *
 * @type {number}
 */
export const baseLeft = (document.body.clientWidth - tableElement.clientWidth) / 2;

/**
 * Карты в колодах
 *
 * @type {string[]}
 */
export const deckComponents = [];

/**
 * Хранилище данных о дропзонах
 *
 * @type {Record<string, { left: number; top: number }>}
 */
export const dropTargetOptions = {};
