import { Tab } from '@headlessui/react';
import TSubmission, { TSubmissionType } from '../types/TSubmission';
import CustomTestCaseTab from './CustomTestCaseTab';
import SubmissionResultTab from './SubmissionResultTab';
import { useState, useEffect, JSX } from 'react';

type TProblemEditorPaneTabsProps<T extends TSubmissionType> = {
	submissionData?: TSubmission<T> | undefined;
	customInput: string;
	setCustomInput: (e: string) => void;
};

type Tab<T extends TSubmissionType> = {
	name: string;
	component: (
		submissionData: TSubmission<T> | undefined,
		customInput: string,
		setCustomInput: (e: string) => void
	) => JSX.Element;
};

export default function ProblemEditorPaneTabs({
	submissionData,
	customInput,
	setCustomInput,
}: TProblemEditorPaneTabsProps<'run' | 'submit'>) {
	const tabs: (Tab<'run'> | Tab<'submit'>)[] = [
		{
			name: 'Custom test case',
			component: (
				submissionData: TSubmission<'run'> | undefined,
				customInput: string,
				setCustomInput: (e: string) => void
			) => (
				<CustomTestCaseTab
					submissionData={submissionData}
					customInput={customInput}
					setCustomInput={setCustomInput}
				/>
			),
		},
	];

	if (submissionData && submissionData.judge_result?.scenario === 'submit') {
		tabs.push({
			name: 'Submission result',
			component: (submissionData: TSubmission<'submit'> | undefined) => (
				<SubmissionResultTab submissionData={submissionData} />
			),
		});
	}

	const [activeTab, setActiveTab] = useState<number>(
		submissionData && submissionData.judge_result?.scenario === 'submit' ? 1 : 0
	);

	useEffect(() => {
		setActiveTab(submissionData?.judge_result?.scenario === 'submit' ? 1 : 0);
	}, [submissionData]);

	return (
		<div className="bg-dark-1 w-full">
			<Tab.Group
				selectedIndex={activeTab}
				onChange={(index) => setActiveTab(index)}
			>
				<Tab.List className="border-b border-dark-0">
					{tabs.map((tab) => (
						<Tab key={tab.name} className="focus:outline-none">
							{({ selected }) => (
								<span
									className={`inline-block text-base font-normal py-2 px-4 border-b-2 ${
										selected
											? 'text-primary border-primary'
											: 'text-light-1 border-primary-extradark'
									}`}
								>
									{tab.name}
								</span>
							)}
						</Tab>
					))}
				</Tab.List>
				<Tab.Panels>
					{tabs.map((tab) => (
						<Tab.Panel key={tab.name} className="p-4">
							{tab.component(
								submissionData as TSubmission<'run'> & TSubmission<'submit'>,
								customInput,
								setCustomInput
							)}
						</Tab.Panel>
					))}
				</Tab.Panels>
			</Tab.Group>
		</div>
	);
}
