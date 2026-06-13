import { BASE_URL } from '#common/constants.js';
import { SPRITE_TEMPLATE } from '#common/templates/sprite.js';
import { YANDEX_METRIKA_TEMPLATE } from '#common/templates/yandex-metrika.js';
import { isDev } from '#server/constants.js';
import { getCss, getJs } from '#server/lib/bundle.js';

let cssCache = '';
let jsCache = '';

/** @type {(data: LayoutData) => Promise<string>} */
export async function renderPage({ headTemplate = '', pageTemplate = '' }) {
	if (!cssCache) {
		cssCache = await getCss('main.css');
	}
	if (!jsCache) {
		jsCache = await getJs('main.js');
	}
	const devTemplate = isDev ? /* html */ `<script src="/client/dev.js" type="module"></script>` : '';

	return /* html */ `
		<!DOCTYPE html>
		<html lang="ru" prefix="og: http://ogp.me/ns#">
			<head>
				<meta charset="UTF-8">
				<meta name="viewport" content="width=device-width, initial-scale=1">

				<title>Пасьянс «Колодец»</title>
				<meta property="og:title" content="Пасьянс «Колодец»">

				<meta name="description" content="Карточная игра для настольных и мобильных браузеров">
				<meta property="og:description" content="Карточная игра для настольных и мобильных браузеров">

				<meta property="og:url" content="${BASE_URL}">
				<link rel="canonical" href="${BASE_URL}">

				<meta property="og:locale" content="ru_RU">
				<meta property="og:type" content="website">
				<meta property="og:site_name" content="Пасьянс «Колодец»">

				<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
				<link rel="icon" type="image/svg+xml" href="/favicon.svg">
				<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
				<link rel="manifest" href="/site.webmanifest">
				<meta name="apple-mobile-web-app-title" content="Колодец">

				<style>${cssCache}</style>
				<script type="module">${jsCache}</script>
				${headTemplate}
				${devTemplate}
			</head>

			<body>
				<div hidden>${SPRITE_TEMPLATE}</div>

				<main>${pageTemplate}</main>
				${isDev ? '' : YANDEX_METRIKA_TEMPLATE}
			</body>
		</html>
	`;
}
