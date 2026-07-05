import { getSiteConfig } from '#core/common/lib/site-config.js';

/** @type {(statusCode: number, message: string) => string} */
function renderErrorPage(statusCode, message) {
	const { projectTitle } = getSiteConfig();

	return /* html */ `
		<section class="rules">
			<div class="rules__inner">
				<h1 class="rules__title">Ошибка ${statusCode}</h1>
				<div class="rules__group">
					<a class="rules__button button" href="/">Вернуться к «${projectTitle}»</a>
				</div>
				<p class="rules__text">${message}</p>
			</div>
		</section>
	`;
}

export { renderErrorPage };
