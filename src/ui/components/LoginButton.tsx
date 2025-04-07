import SecondaryButton from './SecondaryButton';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import classNames from '../utils/classNames';
import useLoginPrompt from '../hooks/useLoginPrompt';

type TLoginButtonProps = {
	text: string;
	className?: string;
};

export default function LoginButton({
	text,
	className = '',
}: TLoginButtonProps) {
	const { showLoginPrompt } = useLoginPrompt();

	return (
		<div
			className={classNames(
				'w-full flex items-center justify-center',
				className
			)}
		>
			<SecondaryButton
				className="flex items-center"
				onClick={() => showLoginPrompt()}
			>
				<FontAwesomeIcon icon={faLock} className="mr-2" />
				<span>{text}</span>
			</SecondaryButton>
		</div>
	);
}
