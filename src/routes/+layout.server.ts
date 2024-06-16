import data from '../../data.json';

export function load({ cookies }) {
	let languageSelected = cookies.get('language');
	return {
		content: data.content,
		language: languageSelected,
	};
}
