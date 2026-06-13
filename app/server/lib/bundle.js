import { readFile } from 'node:fs/promises';
import postcss from 'postcss';
import { cwd } from '#server/constants.js';
import postcssConfig from '../../../postcss.config.js';

/**
 * Общий promise импорта rolldown для параллельных вызовов getJs.
 *
 * @type {Promise<typeof import('rolldown')> | null}
 */
let rolldownLoad = null;

/** @type {(entryPoint: string) => Promise<string>} */
export async function getCss(entryPoint) {
	const from = `${cwd}/src/client/css/${entryPoint}`;
	const cssCode = await readFile(from, 'utf-8');
	return (await postcss(postcssConfig.plugins).process(cssCode, { from })).css;
}

/** @type {(entryPoint: string) => Promise<string>} */
export async function getJs(entryPoint) {
	const { rolldown } = await loadRolldown();
	const bundle = await rolldown({ input: `src/client/${entryPoint}` });
	const { code } = (await bundle.generate({ format: 'esm', minify: true })).output[0];

	await bundle.close();
	return code;
}

/** Подключает rolldown при первом вызове getJs. */
async function loadRolldown() {
	if (!rolldownLoad) {
		rolldownLoad = import('rolldown');
	}

	return rolldownLoad;
}
