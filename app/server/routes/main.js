import { RULES_TEMPLATE } from '#common/templates/rules.js';
import { TABLE_TEMPLATE } from '#common/templates/table.js';

const mainRoute = {
	/** @type {RouteMethod} */
	async GET() {
		return {
			page: {
				description: 'Карточная игра для настольных и мобильных браузеров',
				headTemplate: /* html */ `<meta name="yandex-verification" content="6891d630ad9271e6">`,
				pageTemplate: `${RULES_TEMPLATE}${TABLE_TEMPLATE}`,
				pathname: '/',
			},
		};
	},
};

export { mainRoute };
