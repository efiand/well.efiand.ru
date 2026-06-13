/** Минификация XML-карты сайта: удаление комментариев и лишних пробелов */
export function minifySitemap(xml = '') {
	return xml
		.replace(/<!--[\s\S]*?-->/g, '')
		.replace(/>\s+</g, '><')
		.replace(/\r?\n|\r/g, '')
		.replace(/\s{2,}/g, ' ')
		.trim();
}
