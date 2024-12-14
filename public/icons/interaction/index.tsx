import React from 'react';

type SvgIconProps = {
	className?: string;
	width?: string;
	height?: string;
};

export const LoveIcon: React.FC<SvgIconProps> = ({
	className = '',
	width = '24',
	height = '24',
	...props
}: SvgIconProps) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M11.017 17.3418C10.7337 17.4418 10.267 17.4418 9.98366 17.3418C7.56699 16.5168 2.16699 13.0752 2.16699 7.24183C2.16699 4.66683 4.24199 2.5835 6.80033 2.5835C8.31699 2.5835 9.65866 3.31683 10.5003 4.45016C11.342 3.31683 12.692 2.5835 14.2003 2.5835C16.7587 2.5835 18.8337 4.66683 18.8337 7.24183C18.8337 13.0752 13.4337 16.5168 11.017 17.3418Z"
				strokeWidth={1.25}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</svg>
	);
};

export const EyeIcon: React.FC<SvgIconProps> = ({
	className = '',
	width = '24',
	height = '24',
	...props
}: SvgIconProps) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path d="M12.9833 10.0551C12.9833 11.7051 11.6499 13.0384 9.99993 13.0384C8.34993 13.0384 7.0166 11.7051 7.0166 10.0551C7.0166 8.40511 8.34993 7.07178 9.99993 7.07178C11.6499 7.07178 12.9833 8.40511 12.9833 10.0551Z" stroke="#1D2329" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />
			<path d="M9.99987 16.9469C12.9415 16.9469 15.6832 15.2136 17.5915 12.2136C18.3415 11.0386 18.3415 9.06361 17.5915 7.88861C15.6832 4.88861 12.9415 3.15527 9.99987 3.15527C7.0582 3.15527 4.31654 4.88861 2.4082 7.88861C1.6582 9.06361 1.6582 11.0386 2.4082 12.2136C4.31654 15.2136 7.0582 16.9469 9.99987 16.9469Z" stroke="#1D2329" stroke-width="1.25" stroke-linecap="round" stroke-linejoin="round" />

		</svg>
	);
};

export const ThumbsUpIcon: React.FC<SvgIconProps> = ({
	className = '',
	width = '24',
	height = '24',
	...props
}: SvgIconProps) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<path
				d="M6.2334 16.1358L8.81673 18.1358C9.15006 18.4691 9.90006 18.6358 10.4001 18.6358H13.5667C14.5667 18.6358 15.6501 17.8858 15.9001 16.8858L17.9001 10.8025C18.3167 9.6358 17.5667 8.6358 16.3167 8.6358H12.9834C12.4834 8.6358 12.0667 8.21913 12.1501 7.6358L12.5667 4.96913C12.7334 4.21913 12.2334 3.3858 11.4834 3.1358C10.8167 2.8858 9.9834 3.21913 9.65006 3.71913L6.2334 8.80246"
				stroke="#1D2329"
				strokeWidth={1.5}
				strokeMiterlimit={10}
			/>
			<path
				d="M1.9834 16.1357V7.96908C1.9834 6.80241 2.4834 6.38574 3.65007 6.38574H4.4834C5.65006 6.38574 6.15007 6.80241 6.15007 7.96908V16.1357C6.15007 17.3024 5.65006 17.7191 4.4834 17.7191H3.65007C2.4834 17.7191 1.9834 17.3024 1.9834 16.1357Z"
				stroke="#1D2329"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>

		</svg>
	);
};
export const ThumbsDownIcon: React.FC<SvgIconProps> = ({
	className = '',
	width = '24',
	height = '24',
	...props
}: SvgIconProps) => {
	return (
		<svg
			className={className}
			width={width}
			height={height}
			viewBox={`0 0 ${width} ${height}`}
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<svg width="20" height="21" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg">
				<path d="M13.7668 5.55176L11.1834 3.55176C10.8501 3.21842 10.1001 3.05176 9.6001 3.05176H6.43344C5.43344 3.05176 4.3501 3.80176 4.1001 4.80176L2.1001 10.8851C1.68344 12.0518 2.43344 13.0518 3.68344 13.0518H7.01677C7.51677 13.0518 7.93344 13.4684 7.8501 14.0518L7.43344 16.7184C7.26677 17.4684 7.76677 18.3018 8.51677 18.5518C9.18344 18.8018 10.0168 18.4684 10.3501 17.9684L13.7668 12.8851" stroke="#1D2329" stroke-width="1.5" stroke-miterlimit="10" />
				<path d="M18.0163 5.55208V13.7188C18.0163 14.8854 17.5163 15.3021 16.3496 15.3021H15.5163C14.3496 15.3021 13.8496 14.8854 13.8496 13.7188V5.55208C13.8496 4.38542 14.3496 3.96875 15.5163 3.96875H16.3496C17.5163 3.96875 18.0163 4.38542 18.0163 5.55208Z" stroke="#1D2329" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
			</svg>


		</svg>
	);
};

