import React, { useEffect } from 'react';
import StartEarningimage from '@/public/icons/start_earning.svg';
import Image from 'next/image';
import { ProductsCard } from '@/components/widgets/ProductsCard';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { GetTrendingProducts } from '@/lib/dataFetchingFns';
import { useQuery } from '@tanstack/react-query';
import { getTrendingProductData } from '@/contexts/features/landingpage/landingpage';
import { productDetailsProps } from '@/lib/types';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const StartEarning = () => {
	// Redux
	const dispatch = useAppDispatch();
	const trendingProducts = useAppSelector((state) => state.landingpage?.trendingProducts || []);

	// WQery
	const allTrendingProducts = useQuery({
		queryKey: ['trending-products'],
		queryFn: () => GetTrendingProducts(),
	});

	// UseEffects
	useEffect(() => {
		if (!allTrendingProducts?.data?.data) return;

		dispatch(getTrendingProductData(allTrendingProducts?.data?.data));
	}, [allTrendingProducts?.data?.data, dispatch]);

	return (
		<div className="w-[97%] md:w-[95%] mx-auto flex flex-wrap gap-y-5 gap-x-3 h-full py-5">
			<div className="bg-[#F4E9BC] md:pt-20 pt-10 px-4 md:rounded-2xl md:w-[100%] lg:w-[28%] w-full flex justify-start items-center flex-col h-full">
				<h3 className="xl:text-5xl md:text-3xl text-[38.4px] text-black font-bold text-center leadin-10">
					Oh Yes! Start <br />
					Earning on Afruna
				</h3>
				<p className="font-normal text-[#53575E] md: lg:text-2xl mt-3">Easy, Quick & Reliable</p>
				<Link href={'/auth/sign-up'}>
					<Button
						variant="solid"
						className="bg-primary text-base font-500 text-white py-[0.7rem] px-8 rounded-full mt-5 cursor-pointer h-[10] z-0"
					>
						Let’s Get You Started
					</Button>
				</Link>
				<div className=" w-56 md:w-[12rem] lg:w-[18rem] max-w-md relative">
					<div className="relative w-full h-full pt-[109%] md:pt-[120%]">
						{' '}
						{/* 4:5 aspect ratio on mobile, 1:1 on larger screens */}
						<Image
							alt="slide"
							src="/images/pixel.png"
							layout="fill"
							objectFit="cover"
							priority
							quality={100}
							className="absolute left-0 md:w-1/2 md:h-1/2 lg:w-full object-contain"
						/>
					</div>
				</div>
			</div>
			<div className="md:flex hidden md:w-full lg:w-[65%] h-full flex-col gap-y-8">
				<div className="flex flex-wrap gap-1">
					{trendingProducts?.slice(0, 3).map((product: productDetailsProps, idx) => (
						<div className="mb-[-1rem] flex-1" key={idx}>
							<ProductsCard item={product} />
						</div>
					))}
				</div>
				<div className="flex flex-wrap gap-1">
					{trendingProducts?.slice(3, 6).map((product: productDetailsProps, idx) => (
						<div key={idx} className='flex-1'>
							<ProductsCard item={product} />
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default StartEarning;
