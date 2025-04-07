import SecondaryButton from './SecondaryButton';
import PrimaryButton from './PrimaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faPlay,
	faChevronDown,
	faChevronUp,
	faPause,
} from '@fortawesome/free-solid-svg-icons';
import TextButton from './TextButton';
import ViewSubmissionsButton from './ViewSubmissionsButton';
import useSession from '../hooks/useSession';
import LoginButton from './LoginButton';

type TProblemEditorPaneFooterProps = {
	isConsoleOpen: boolean;
	setIsConsoleOpen: (e: boolean) => void;
	handleEvaluate: (type: 'run' | 'submit') => void;
	isEvaluating: boolean;
	fullscreen: boolean;
};

export default function ProblemEditorPaneFooter({
	isConsoleOpen,
	setIsConsoleOpen,
	handleEvaluate,
	isEvaluating,
	fullscreen
}: TProblemEditorPaneFooterProps) {
	const { status: sessionStatus } = useSession();

	if (sessionStatus === 'LOADING') return <div />;

	if (sessionStatus === 'NOT_AUTHENTICATED')
		return <LoginButton text="Login to run and submit your code" />;

	return (
		<div className={`bg-dark-5 border-t border-dark-0 ${!fullscreen && 'rounded-b-[1.24rem]'} p-3 flex items-center justify-between`}>
			<ViewSubmissionsButton />

			<div className="flex justify-end space-x-4">
				<TextButton
					color="secondary"
					size="small"
					onClick={() => setIsConsoleOpen(!isConsoleOpen)}
				>
					<span>Console</span>
					<FontAwesomeIcon
						className="text=white w-3 h-3 pl-2"
						icon={isConsoleOpen ? faChevronDown : faChevronUp}
					/>
				</TextButton>
				{isEvaluating ? (
					<SecondaryButton disabled size="small">
						<FontAwesomeIcon className="w-4 h-4 mr-2" icon={faPause} />
						<span>Evaluating</span>
					</SecondaryButton>
				) : (
					<>
						<SecondaryButton size="small" onClick={() => handleEvaluate('run')}>
							<FontAwesomeIcon className="w-4 h-4 mr-2" icon={faPlay} />
							<span>Run code</span>
						</SecondaryButton>
						<PrimaryButton
							onClick={() => handleEvaluate('submit')}
							size="small"
						>
							Submit code
						</PrimaryButton>
					</>
				)}
			</div>
		</div>
	);
}
