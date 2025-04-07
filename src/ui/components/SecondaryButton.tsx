import classNames from '../utils/classNames';

interface TSecondaryButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	size?: 'normal' | 'small';
}

// TODO: Add support for start and end icon
export default function SecondaryButton({
	children,
	className = '',
	size = 'normal',
	...props
}: TSecondaryButtonProps) {
	return (
		<button
			className={classNames(
				'inline-block bg-transparent border border-white shadow-[0px_2px_12px_rgba(99,99,99,0.25)] rounded',
				'font-bold  text-white',
				size === 'normal' ? 'px-5 py-2' : 'px-4 py-1.5',
				size === 'normal' ? 'text-base' : 'text-sm',
				'hover:bg-black/10',
				'active:bg-black/30',
				'focus:outline-none focus:ring-1 focus:ring-secondary',
				'disabled:bg-black/10 disabled:border-none disabled:text-light-1',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
