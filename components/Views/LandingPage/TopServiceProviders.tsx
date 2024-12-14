import React, { useState } from 'react';
import Image from 'next/image';
import { TopSellersCategories, topProvidersOptions } from '@/components/constants';
import { BsStarFill } from 'react-icons/bs';
import { Cup } from 'iconsax-react';
import { ArrowRight2 } from 'iconsax-react';
import { Button } from '@nextui-org/react';

const TopSellerSection = () => {
	const [currentState, setCurrentState] = useState('Design');
	return (
		<>
			
		</>
	);
};
export default TopSellerSection;


// <section className="w-[93%] md:w-[90%] mx-auto py-5 md:mt-[3rem] mt-0">
// 			<div className="flex justify-between items-center md:pb-4 pb-0 relative">
// 				<h4 className="md:text-2xl text-xl font-bold">Top Service Providers</h4>
// 				<div className="md:block hidden absolute md:border-b-2 border-[#FFC3B8] border-none w-[270px] bottom-0"></div>
// 				<div className="md:flex hidden justify-between items-center gap-3">
// 					{TopSellersCategories.map((category, idx) => (
// 						<Button
// 							variant="solid"
// 							key={idx}
// 							className={`${
// 								category === currentState
// 									? 'bg-[#FCF9F7] border border-[#FEA000] border-opacity-50'
// 									: ' bg-white border-2 border-[#F0F2F5] border-opacity-50'
// 							} rounded-full min-w-fit  px-5 py-2 cursor-pointer`}
// 							onClick={() => setCurrentState(category)}
// 						>
// 							<p
// 								className={`text-base font-normal ${
// 									category === currentState ? 'text-[#FEA000]' : 'text-[#586283]'
// 								}`}
// 							>
// 								{category}
// 							</p>
// 						</Button>
// 					))}
// 				</div>
			
// 			</div>
// 			<div className="md:grid hidden xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5 md:mt-[3rem] mt-[1rem]">
// 				{topProvidersOptions.map((provider, index) => (
// 					<div
// 						className="bg-white border border-[#F0F2F5] rounded-2xl relative flex justify-center items-center flex-col my-auto h-[340px] px-[1rem] transition ease-in-out hover:shadow-lg"
// 						key={index}
// 					>
// 						<div className='mb-3 flex flex-row items-end justify-end text-end w-full'><p className="text-[#586283] font-normal md:text-sm text-[9.74px] ">
// 							{provider?.price}
// 						</p></div>
// 						<div className='flex flex-col w-full items-center justify-center'><Image src={provider.image} alt="img" className="md:mt-0 mt-[2rem]" />
// 							<div className="mt-2 mb-3">
// 								<h6 className="text-black text-base font-semibold">{provider.name}</h6>
// 								<p className="text-[#586283] font-normal text-sm">{provider.product}</p>
// 							</div>
// 							<div className="flex items-center gap-2 mb-5">
// 								<BsStarFill color="#FEA000" />
// 								<p className="text-[#586283] font-normal text-sm">{provider.job}</p>
// 							</div>
// 							<div className="flex items-center gap-1 mb-5 bg-[#FCF9F7] rounded-full p-2">
// 								<Cup size={16} color="#586283" />
// 								<p className="text-[#586283] font-normal text-xs">{provider.dept}</p>
// 							</div>
// 							<Button variant="solid" className="bg-[#663300] w-full py-2 rounded-full text-white">
// 								View profile
// 							</Button></div>
						
// 					</div>
// 				))}
// 			</div>
// 			<div className="md:hidden grid grid-cols-2 gap-5 md:mt-[3rem] mt-[1rem]">
// 				{topProvidersOptions?.slice(0, 4).map((provider, index) => (
// 					<div
// 						className="bg-white border border-[#F0F2F5] rounded-2xl relative flex justify-center items-center flex-col my-auto h-[340px] px-[1rem]"
// 						key={index}
// 					>
// 						<Image src={provider.image} alt="img" className="md:mt-0 mt-[2rem]" />
// 						<div className="mt-2 mb-3">
// 							<h6 className="text-black text-base font-semibold">{provider.name}</h6>
// 							<p className="text-[#586283] font-normal text-sm">{provider.product}</p>
// 						</div>
// 						<div className="flex items-center gap-2 mb-5">
// 							<BsStarFill color="#FEA000" />
// 							<p className="text-[#586283] font-normal text-sm">{provider.job}</p>
// 						</div>
// 						<div className="flex items-center gap-1 mb-5 bg-[#FCF9F7] rounded-full p-2">
// 							<Cup size={16} color="#586283" />
// 							<p className="text-[#586283] font-normal text-xs">{provider.dept}</p>
// 						</div>
// 						<button className="bg-[#663300] w-full py-2 rounded-full text-white">
// 							View profile
// 						</button>
// 						<p className="text-[#586283] font-normal md:text-sm text-[9.74px] absolute top-5 right-5">
// 							{provider?.price}
// 						</p>
// 					</div>
// 				))}
// 			</div>
// 		</section>