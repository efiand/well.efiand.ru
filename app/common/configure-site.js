import { initSiteClient } from '#core/client/lib/init-site-client.js';
import { setSiteConfig } from '#core/common/lib/site-config.js';

setSiteConfig({
	baseHost: 'well.efiand.ru',
	cookieConsent: {
		privacyHref: '/#privacy',
	},
	privacyRevisionDate: '2026-07-06',
	projectDescription: 'Карточная игра для настольных и мобильных браузеров',
	projectTitle: 'Пасьянс «Колодец»',
	version: {
		CSS: 2,
		JS: 2,
	},
	yandexMetrikaId: 99938263,
});

initSiteClient();
