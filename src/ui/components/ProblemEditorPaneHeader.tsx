import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExpand, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import TextButton from './TextButton';
import screenfull from 'screenfull';
import { Listbox } from '@headlessui/react';
import TEditorLanguage from '../types/TEditorLanguage';

type TProblemEditorPaneHeaderProps = {
	languages: TEditorLanguage[];
	selectedLanguage: TEditorLanguage;
	handleLanguageChange: (e: TEditorLanguage) => void;
	fullscreen: boolean;
};

export default function ProblemEditorPaneHeader({
	languages,
	selectedLanguage,
	handleLanguageChange,
	fullscreen
}: TProblemEditorPaneHeaderProps) {
	function handleFullScreenClick() {
		const element = document.getElementById('problem-split') as HTMLDivElement;
		if (screenfull.isEnabled) {
			if (screenfull.isFullscreen) {
				screenfull.exit();
			} else {
				screenfull.request(element);
			}
		}
	}

	return (
		<div className={`bg-dark-5 border-b border-dark-0 p-3 ${!fullscreen && 'rounded-t-[1.24rem]'} flex items-center justify-between`}>
			<TextButton
				onClick={handleFullScreenClick}
				color="secondary"
				size="normal"
			>
				<FontAwesomeIcon className="w-4 h-4" icon={faExpand} />
			</TextButton>
			<Listbox
				value={selectedLanguage}
				onChange={handleLanguageChange}
				as="span"
				className="relative"
			>
				<Listbox.Button
				//@ts-ignore
					className={({ open }) => `flex items-center focus:outline-none`}
				>
					<span className="font-memdium text-sm text-white pr-2">
						{selectedLanguage.name}
					</span>
					<FontAwesomeIcon
						className="text-white w-3 h-3"
						icon={faChevronDown}
					/>
				</Listbox.Button>
				<Listbox.Options className="absolute max-h-80 overflow-auto top-full right-0 bg-dark-2 w-40 border border-solid border-dark-4 rounded-lg shadow-filter z-10 ring-0 focus:outline-none">
					{languages.map((option) => (
						<Listbox.Option
							key={option.code}
							value={option}
							className={({ active }) =>
								`py-2 px-4 cursor-pointer ${active ? 'bg-dark-4' : ''}`
							}
						>
							{/* @ts-ignore */}
							{({ selected }) => (
								<span className="font-medium text-sm text-white pl-3">
									{option.name}
								</span>
							)}
						</Listbox.Option>
					))}
				</Listbox.Options>
			</Listbox>
		</div>
	);
}
