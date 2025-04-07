import TSubmission from '../types/TSubmission';

type TCustomTestcaseProps = {
	submissionData: TSubmission<'run'> | undefined;
	customInput: string;
	setCustomInput: (e: string) => void;
};

export default function CustomTestCaseTab({
	submissionData,
	customInput,
	setCustomInput,
}: TCustomTestcaseProps) {
	return (
		<div className="space-y-4 max-h-52 overflow-y-auto">
			<p className="font-bold text-sm text-white">Input</p>
			<textarea
				className="w-full p-2 bg-dark-0 rounded-lg focus:outline-none font-normal text-sm text-white"
				rows={3}
				value={customInput}
				onChange={(e) => setCustomInput(e.target.value)}
			></textarea>
			{submissionData &&
			submissionData.judge_result &&
			submissionData.judge_result.scenario === 'run' ? (
				<>
					<p className="font-bold text-sm text-white">Output</p>
					<p className="max-w-full p-2 bg-dark-0 rounded-lg font-normal text-sm text-white overflow-x-auto">
						{submissionData.judge_result.stderr
							? <pre>{window.atob(submissionData.judge_result.stderr)}</pre>
							: null}
						{submissionData.judge_result.stdout
							? <pre>{window.atob(submissionData.judge_result.stdout)}</pre>
							: null}
					</p>
				</>
			) : null}
		</div>
	);
}
