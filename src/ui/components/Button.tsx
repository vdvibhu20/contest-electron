// THIS COMPONENT IS NOT COMPLETE YET

type IButtonVariant = 'text' | 'contained';
type IButtonColor = 'primary' | 'secondary' | 'danger' | 'success' | 'gray';
type IButtonSize = 'medium' | 'large'; // no design for small buttons
	//@ts-ignore
type IRunSubmissionArgs = {
	content_id: string,
	source: string,
	language: string,
	customInput: string
}
	//@ts-ignore
type IProps<T> = {
	variant: IButtonVariant;
	color: IButtonColor;
	children: React.ReactNode
	size?: IButtonSize;
	classNames?: string
	onClick?: () => void
	disabled?: boolean
};

// TODO
function getDefaultBackground(variant: IButtonVariant, color: IButtonColor, disabled: boolean | undefined) {
	if(disabled) return 'bg-[#939393]'
	if (variant === 'contained' && color === 'primary')
		return 'bg-gradient-to-r from-primary to-primary-light';
	else if (variant === 'contained' && color === 'danger') return 'bg-red-400';
	else if (variant === 'contained' && color === 'success') return 'bg-green-400'
	else if (variant === 'contained' && color === 'gray') return 'bg-dark-1';
	else if (variant === 'text') return 'bg-transparent';

	// Default return value
	return '';
}

// TODO
function getPadding(size: IButtonSize) {
	if (size === 'medium') return 'py-2 px-5';
	else if (size === 'large') return 'py-3 px-8';
	return '';
}

// TODO
function getBorderRadius(size: IButtonSize) {
	if (size === 'medium') return 'rounded';
	else if (size === 'large') return 'rounded-md';
	return '';
}

function getBorderColor(variant: IButtonVariant, color: IButtonColor) {
	if (variant === 'contained') return ''
	else if (variant === 'text' && color === 'danger') return 'border border-red-400'
	else if (variant==='text') return 'border border-white'
	return '';
}

// completed
function getBoxShadow(variant: IButtonVariant) {
	if (variant === 'contained') return 'shadow-button';
	else if (variant === 'text') return '';
	return '';
}

// todo
function getBackgroundAndTextColor(
	variant: IButtonVariant,
	color: IButtonColor
) {
	if (variant === 'text' && color === 'primary') {
	}
}

function getTextColor(variant: IButtonVariant, color: IButtonColor) {
	if(variant === 'text' && color === 'danger') return 'text-red-400'
	else return 'text-white'
}

function getTextSize(size: IButtonSize) {
	if(size === 'medium') return 'text-base'
	else if(size === 'large') return 'text-xl'
	return '';
}

export default function Button<T extends IButtonVariant>({
	variant,
	color,
	children,
	size = 'medium' as IButtonSize,
	classNames,
	onClick,
	disabled
}: IProps<T>) {
	const className = `${classNames} ${getDefaultBackground(variant, color, disabled)} ${getPadding(size)} ${getBorderRadius(size)} ${getBorderColor(variant, color)} ${getBoxShadow(variant)} ${getBackgroundAndTextColor(variant, color)} ${getTextColor(variant, color)} ${getTextSize(size)}`

	return (
		<button className={className} onClick={onClick} disabled={disabled}>
			{children}
		</button>
	);
}
