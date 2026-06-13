const params = new URL(window.location.toString()).searchParams;
const isTg = typeof params.get('tg') === 'string';

if (isTg) {
	const scriptElement = document.createElement('script');
	scriptElement.src = 'https://telegram.org/js/telegram-web-app.js';
	scriptElement.addEventListener('load', () => {
		window.Telegram.WebApp.expand();
		window.Telegram.WebApp.disableVerticalSwipes();
		window.Telegram.WebApp.enableClosingConfirmation();
	});
	document.head.append(scriptElement);
}
