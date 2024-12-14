import Image from 'next/image';
import React from 'react';
import Samsung from '@/public/icons/samsung.svg';
import Nike from '@/public/icons/nike.svg';
import KitchenAid from '@/public/icons/kitchenAid.svg';
import Apple from '@/public/icons/apple.svg';
import Intel from '@/public/icons/intel.svg';

const TrendingSection = () => {
	return (
		<section className="w-[93%] md:w-[90%] mx-auto my-[4rem]">
			<div className="flex flex-row items-start justify-start border-b-2 border-[#344054] border-opacity-10 w-52 pb-4 relative">
				<div className='font-bold text-2xl'>Trending Brands</div>
				<div className="absolute border-b-2 border-[#1D2329] w-full bottom-0"></div>
			</div>
			<div className="flex flex-wrap justify-between items-center mt-[2rem]">
				<div>
					<Image src={Samsung} alt="samsung" className="w-full h-full" />
				</div>
				<div>
					<Image src={Nike} alt="nike" className="w-full h-full" />
				</div>
				<div>
					<Image src={KitchenAid} alt="kitchenAid" className="w-full h-full" />
				</div>
				<div>
					<Image src={Apple} alt="apple" className="w-full h-full" />
				</div>
				<div>
					<Image src={Nike} alt="nike" className="w-full h-full" />
				</div>
				<div>
					<Image src={Intel} alt="intel" className="w-full h-full" />
				</div>
			</div>
		</section>
	);
};
export default TrendingSection;
