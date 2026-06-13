import { YANDEX_METRIKA_ID } from '#common/constants.js';

const YANDEX_METRIKA_TAG_URL = 'https://mc.yandex.ru/metrika/tag.js';

export const YANDEX_METRIKA_TEMPLATE = /* html */ `
	<!-- Yandex.Metrika counter -->
	<script>
		setTimeout(() => {
			window.ym = window.ym || function () {
				(window.ym.a = window.ym.a || []).push(arguments);
			};
			window.ym.l = Date.now();

			const isTagLoaded = [...document.scripts].some(
				(scriptElement) => scriptElement.src === "${YANDEX_METRIKA_TAG_URL}",
			);
			if (!isTagLoaded) {
				const newScriptElement = document.createElement("script");
				newScriptElement.async = 1;
				newScriptElement.src = "${YANDEX_METRIKA_TAG_URL}";

				const [firstScriptElement] = document.scripts;
				firstScriptElement.parentNode.insertBefore(newScriptElement, firstScriptElement);
			}

			ym(${YANDEX_METRIKA_ID}, "init", {
				accurateTrackBounce: true,
				clickmap: true,
				trackLinks: true,
				webvisor: true,
			});
		}, 3000);
	</script>
	<noscript>
		<img class="_visually-hidden" src="https://mc.yandex.ru/watch/${YANDEX_METRIKA_ID}" alt="">
	</noscript>
	<!-- /Yandex.Metrika counter -->
`;
