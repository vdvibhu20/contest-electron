import debounce from 'lodash.debounce';
import TEditorLanguage from '../types/TEditorLanguage';

const saveCodeToLocalStorage = debounce(function (
	contentId: string,
	lang: TEditorLanguage,
	val: string
) {
	const codeCache = JSON.parse(
		localStorage.getItem('code-gym-code-cache') || '{}'
	);
	if (codeCache[contentId] === undefined) {
		codeCache[contentId] = {};
	}
	codeCache[contentId][lang.code] = val;
	localStorage.setItem('code-gym-code-cache', JSON.stringify(codeCache));
},
5000);

export default saveCodeToLocalStorage;
