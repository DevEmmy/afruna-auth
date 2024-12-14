import React from 'react';
import Image from 'next/image';
import EmptyState from '@/public/icons/emptyState.svg';

interface EmptyStateFallbackProps {
	imageSrc?: string;
	title: string;
	description: string;
	buttonText: string;
	buttonOnClick: () => void;
}

const EmptyStateFallback: React.FC<EmptyStateFallbackProps> = ({
	imageSrc = EmptyState,
	title,
	description,
	buttonText,
	buttonOnClick,
}) => {
	return (
		<div className="flex justify-center items-center m-auto xl:mt-[6rem] sm:mt-[3.4rem] flex-col sm:w-[70%] lg:w-[40%] max-w-[480px] bg-slate-50 p-6 rounded-xl border border-slate-100">
			<Image src={imageSrc} alt="EmptyState" />
			<div className="mt-5 text-center">
				<h1 className="text-black text-2xl font-semibold">{title}</h1>
				<p className="mt-3 text-[#586283] text-base font-normal">{description}</p>
			</div>

			<button
				className="bg-[#663300] text-white py-5 px-10 rounded-full mt-10 text-sm font-semibold"
				onClick={buttonOnClick}
			>
				{buttonText}
			</button>
		</div>
	);
};

export default EmptyStateFallback;
