import classNames from '../utils/classNames';

type TTextButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
	children: React.ReactNode;
	color: 'primary' | 'secondary';
	size: 'normal' | 'small';
};

// export interface IProps
// 	extends React.DetailedHTMLProps<
// 			React.ButtonHTMLAttributes<HTMLButtonElement>,
// 			HTMLButtonElement
// 		>,
// 		React.AriaAttributes {
// 	color: 'primary' | 'secondary' | string;
// 	size: 'normal' | 'small';
// }

//TODO: Add support for start and end icon
export default function TextButton({
	className = '',
	...props
}: TTextButtonProps) {
	return (
		<button
			className={classNames(
				'font-bold',
				props.color === 'primary'
					? 'text-primary hover:text-primary-dark active:text-primary/80 disabled:text-[#999]'
					: 'text-white hover:text-primary active:text-white/80 disabled:text-[#999]',
				props.size === 'normal' ? 'text-base' : 'text-sm',
				className
			)}
			{...props}
		>
			{props.children}
		</button>
	);
}
