/**
 * Базовая функция логирования
 *
 * @type {(log: (...data: unknown[]) => void, levelTitle: 'ERROR' | 'INFO' | 'WARN', ...args: unknown[]) => void}
 */
function executeLog(log, levelTitle, ...args) {
	const dashSide = 10;
	const header = `[${levelTitle} | ${new Date().toISOString()}]`;
	const topLine = `${'─'.repeat(dashSide)} ${header} ${'─'.repeat(dashSide)}`;

	log(topLine);

	args.forEach((arg) => {
		if ((levelTitle === 'ERROR' || levelTitle === 'WARN') && arg instanceof Error) {
			log(arg.stack || arg.message);
		} else {
			log(arg);
		}
	});

	log('─'.repeat(topLine.length));
}

/** @type {Record<LogLevel, (...args: unknown[]) => void>} */
export const log = {
	error: (...args) => executeLog(console.error, 'ERROR', ...args),
	info: (...args) => executeLog(console.info, 'INFO', ...args),
	warn: (...args) => executeLog(console.warn, 'WARN', ...args),
};
