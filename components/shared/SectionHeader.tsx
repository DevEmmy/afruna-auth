import React from 'react';

type Props = {
	children?: React.ReactNode;
	containerClassName?: string;
	subClassName?: string;
	className?: string;
	border?: boolean;
	title?: string;
	titleClassName?: string;
	borderClassName?: string;
};

const SectionHeader = ({
	children,
	containerClassName,
	subClassName,
	className,
	border = true,
	title = `Today's Deal`,
	titleClassName,
	borderClassName,
}: Props) => {
	return (
		<div className={`${containerClassName}`}>
			<div
				className={`md:flex justify-between block items-center md:border-b border-[#586283] border-opacity-10 md:pb-4 relative ${className}`}
			>
				<div
					className={`md:w-[50%] md:text-2xl text-xl font-bold text-[#1D2329] ${titleClassName}`}
				>
					<h4 className="">{title}</h4>
				</div>
				{border && (
					<div
						className={`md:block absolute hidden border-b-2 border-[#FF9E3A] w-[170px] bottom-0 ${borderClassName}`}
					></div>
				)}
				{children}
			</div>
		</div>
	);
};

export default SectionHeader;
