import TEditorLanguage from '../types/TEditorLanguage';

export default function getCodeFromLocalStorage(
	contentId: string,
	lang: TEditorLanguage
) {
	return (
		JSON.parse(localStorage.getItem('code-gym-code-cache') || '{}')?.[
			contentId
		]?.[lang.code] || ''
	);
}
