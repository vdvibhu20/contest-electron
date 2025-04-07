interface IProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
	children: React.ReactNode;
	size?: 'normal' | 'small';
}

function classNames(...classes: any[]) {
	return classes.filter(Boolean).join(' ');
}

export default function PrimaryButton({
	children,
	className = '',
	size = 'normal',
	...props
}: IProps) {
	return (
		<button
			className={classNames(
				'inline-block  bg-gradient-to-r from-primary to-primary-light shadow-[0px_2px_12px_rgba(99,99,99,0.25)] rounded font-bold text-white',
				size === 'normal' ? 'px-5 py-2' : 'px-4 py-1.5',
				size === 'normal' ? 'text-base' : 'text-sm',
				'hover:from-primary-light hover:to-primary',
				'active:from-primary-dark active:to-primary',
				'focus:outline-none focus:ring-1 focus:ring-secondary',
				'disabled:from-light-1 disabled:to-light-1',
				className
			)}
			{...props}
		>
			{children}
		</button>
	);
}
