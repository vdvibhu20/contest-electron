import { useState } from 'react';

import Editor, { OnChange } from '@monaco-editor/react';

import ProblemEditorPaneHeader from './ProblemEditorPaneHeader';
import TEditorLanguage from '../types/TEditorLanguage';
import ProblemEditorPaneTabs from './ProblemEditorPaneTabs';
import ProblemEditorPaneFooter from './ProblemEditorPaneFooter';
import usePostSubmission, {
	TPostSubmissionPayload,
} from '../hooks/usePostSubmission';
import useSubmissionDataById from '../hooks/useSubmissionDataById';
import IContent from '../types/IContent';
import saveCodeToLocalStorage from '../utils/saveCodeToLocalStorage';
import getCodeFromLocalStorage from '../utils/getCodeFromLocalStorage';
import TSolutionStub from '../types/TSolutionStub';
import IContest from '../types/IContest';
import { TContest } from '../types/TContest';

const languages: TEditorLanguage[] = [
	{
		name: 'C++',
		code: 'cpp',
		mode: 'cpp',
		source: '',
	},
	{
		name: 'C',
		code: 'c',
		mode: 'c',
		source: '',
	},
	{
		name: 'Python 2.7',
		code: 'py2',
		mode: 'python',
		source: '',
	},
	{
		name: 'Python 3',
		code: 'py3',
		mode: 'python',
		source: '',
	},
	{
		name: 'Node 10',
		code: 'nodejs10',
		mode: 'javascript',
		source: '',
	},
	{
		name: 'Java 8',
		code: 'java',
		mode: 'java',
		source: '',
	},
	{
		name: 'C#',
		code: 'csharp',
		mode: 'csharp',
		source: '',
	},
];

function getCodeFromSolutionStub(
	language: TEditorLanguage,
	solutionStub: TSolutionStub[]
): string {
	const stub = solutionStub.find((stub) => stub.language === language.code);
	if (stub === undefined) return '';
	return window.btoa(stub.body);
}

type TProblemEditorPaneProps = {
	content: IContent;
	solutionStub: TSolutionStub[];
	fullScreen?: boolean;
	contest?: IContest | TContest;
};

export default function ProblemEditorPane({
	content,
	solutionStub,
	fullScreen,
	contest,
}: TProblemEditorPaneProps) {
	const [selectedLanguage, setSelectedLanguage] = useState<TEditorLanguage>(
		languages[0]
	);

	const [isConsoleOpen, setIsConsoleOpen] = useState<boolean>(false);

	const [customInput, setCustomInput] = useState<string>(
		content.problem?.content.sample_input
			? content.problem?.content.sample_input
			: ''
	);

	const [sourceCode, setSourceCode] = useState<string>(
		getCodeFromLocalStorage(content.id, selectedLanguage) ||
			getCodeFromSolutionStub(selectedLanguage, solutionStub)
	);

	const {
		mutate: mutatePostSubmission,
		data: mutatePostSubmissionData,
		status: mutationStatus,
	} = usePostSubmission();

	const { data: submissionData, status: fetchStatus } = useSubmissionDataById(
		String(mutatePostSubmissionData?.submissionId),
		{
			enabled: !!mutatePostSubmissionData,
			refetchInterval: (d) => {
				if (d?.data.judge_result) return false;
				return 5000;
			},
			onSuccess: (d) => {
				if (d.data.judge_result) {
					setIsConsoleOpen(true);
				}
			},
		}
	);

	function handleLanguageChange(e: TEditorLanguage) {
		setSelectedLanguage(e);
		setSourceCode(
			getCodeFromLocalStorage(content.id, e) ||
				getCodeFromSolutionStub(e, solutionStub)
		);
	}

	function handleEvaluate(type: 'run' | 'submit') {
		if (type === 'run') {
			let payload: TPostSubmissionPayload<'run'> = {
				type: 'run',
				data: {
					content_id: content.id,
					input: btoa(customInput),
					language: selectedLanguage.mode,
					source: sourceCode,
				},
			};
			mutatePostSubmission(payload);
		} else {
			let payload: TPostSubmissionPayload<'submit'> = {
				type: 'submit',
				data: {
					content_id: content.id,
					language: selectedLanguage.code,
					source: sourceCode,
					contest_id: contest
						? contest.id
						: (process.env.NEXT_PUBLIC_HACKERBLOCKS_CONTEST_ID as string),
				},
			};
			mutatePostSubmission(payload);
		}
	}

	function handleSourceChange(val: string) {
		setSourceCode(window.btoa(val));
		saveCodeToLocalStorage(content.id, selectedLanguage, window.btoa(val));
	}

	return (
		<div
			className={`bg-dark-1 border-dark-4 grid grid-rows-[auto_1fr_auto_auto] max-h-full min-h-full ${
				fullScreen ? 'border-x' : 'border-4 rounded-3xl'
			}`}
		>
			<ProblemEditorPaneHeader
				languages={languages}
				selectedLanguage={selectedLanguage}
				handleLanguageChange={handleLanguageChange}
				fullscreen={fullScreen as boolean}
			/>
			<div className="grow overflow-y-auto">
				<Editor
					theme="vs-dark"
					value={window.atob(sourceCode)}
					onChange={handleSourceChange as OnChange}
					language={selectedLanguage.mode}
				/>
			</div>
			{isConsoleOpen ? (
				<ProblemEditorPaneTabs
					submissionData={submissionData?.data}
					customInput={customInput}
					setCustomInput={setCustomInput}
				/>
			) : null}
			<ProblemEditorPaneFooter
				isConsoleOpen={isConsoleOpen}
				setIsConsoleOpen={setIsConsoleOpen}
				handleEvaluate={handleEvaluate}
				isEvaluating={
					mutationStatus === 'loading' ||
					fetchStatus === 'loading' ||
					(fetchStatus === 'success' && !submissionData.data.judge_result)
				}
				fullscreen={fullScreen as boolean}
			/>
		</div>
	);
}
