import Image from 'next/image';
import React from 'react';
import DiscountBanner from '@/public/icons/disocuntBanner.png';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const DiscountSection = () => {
	return (
		<section className="relative mt-6 ">
			<Image
				src={DiscountBanner}
				alt="DiscountBannger"
				className=" md:h-full h-[450px]"
			/>
			<div className="bg-[#003D29] md:py-[4rem] py-[2rem] md:px-[3.5rem] px-[2rem] text-white absolute md:right-10 2xl:top-[15%] xl:top-[10%] md:top-[5%] top-[12%] xl:w-[520px] md:w-[500px] rounded-3xl md:mx-0 mx-[1rem]">
				<h1 className="2xl:text-[52px] xl:text-[52px] lg:text-[40px] text-[34.2px] font-semibold pb-0 leading-0">
					Get 5% Cash back on 3 Items.
				</h1>
				<p className="2xl:text-xl xl:text-xl lg:text-lg font-normal mt-2">
					Giving you the best discount on Afruna hand made products which you purchase.
				</p>
				<Link href={'/auth/sign-up'}>
					<Button
						variant="solid"
						className=" bg-white bg-opacity-10 text-white border-[1px] border-[#FFFFFF] border-opacity-10 rounded-full my-[1.5rem] px-[2.5rem] py-4 text-body-md h-[18]"
					>
						Let’s Get You Started
					</Button>
				</Link>
			</div>
		</section>
	);
};
export default DiscountSection;
