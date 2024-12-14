import SectionHeader from '@/components/shared/SectionHeader';
import { ProductsCard } from '@/components/widgets/ProductsCard';
import {
	getAllProductData,
	getTrendingProductData,
} from '@/contexts/features/landingpage/landingpage';
import {
	GetProductByCategory,
	GetProductsCategories,
	GetTrendingProducts,
} from '@/lib/dataFetchingFns';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { productDetailsProps } from '@/lib/types';
import { Button, ScrollShadow } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const TodalsDealSection = () => {
	const [currentState, setCurrentState] = useState({
		name: 'All',
		value: '',
	});
	const [time, setTime] = useState(300000);

	const dispatch = useAppDispatch();
	const trendingProducts = useAppSelector((state) => state.landingpage?.trendingProducts || []);

	const [products, setProducts] = useState(trendingProducts);

	const allTrendingProducts = useQuery({
		queryKey: ['trending-products'],
		queryFn: () => GetTrendingProducts(),
	});

	const allCategories = useQuery({
		queryKey: ['all-categories'],
		queryFn: () => GetProductsCategories(),
	});

	useEffect(() => {
		if (!allTrendingProducts?.data?.data) return;
		setProducts(allTrendingProducts?.data?.data)
		dispatch(getTrendingProductData(allTrendingProducts?.data?.data));
	}, [allTrendingProducts?.data?.data, dispatch]);

	const { data, isLoading, isError, error } = useQuery({
		queryKey: [currentState.name, currentState.value],
		queryFn: () => GetProductByCategory(currentState.value),
		enabled: currentState.value !== '',
	});

	useEffect(() => {
		if (data?.data) {
			dispatch(getAllProductData(data.data));
			setProducts(data.data);
		} else if (isError) {
			console.warn('No products found or error occurred:', error);
		}
	}, [data, isError, error]);

	useEffect(() => {
		let timer = setInterval(() => {
			setTime((time) => {
				if (time === 0) {
					clearInterval(timer);
					return 0;
				} else return time - 1;
			});
		}, 1000);
	}, []);
	const hours = Math.floor(time / 3600);

	return (
		<section className="w-[93%] md:w-[90%] mx-auto py-5">
			<SectionHeader>
				<div className="md:flex hidden items-center gap-4">
					{' '}
					<Button
						variant="solid"
						className={`${
							currentState?.name === 'All'
								? 'bg-[#FCF9F7] border border-[#FEA000] border-opacity-50'
								: ' bg-white border-2 border-[#F0F2F5] border-opacity-50'
						} rounded-full px-5 py-2 cursor-pointer`}
						onClick={() => {
							setCurrentState({
								name: 'All',
								value: '',
							});
							setProducts(trendingProducts);
						}}
					>
						<p
							className={`md:text-base text-sm font-normal ${
								currentState?.name === 'All' ? 'text-[#FEA000]' : 'text-[#586283]'
							}`}
						>
							All
						</p>
					</Button>
					{allCategories?.data?.data?.slice(0, 4).map((category, idx) => {
						return (
							<Button
								variant="solid"
								key={idx}
								className={`${
									category?.name === currentState?.name
										? 'bg-[#FCF9F7] border border-[#FEA000] border-opacity-50'
										: ' bg-white border-2 border-[#F0F2F5] border-opacity-50'
								} rounded-full px-5 py-2 cursor-pointer`}
								onClick={() => {
									setCurrentState({
										name: category?.name,
										value: category?._id,
									});
								}}
							>
								<p
									className={`md:text-base text-sm font-normal ${
										category?.name === currentState?.name ? 'text-[#FEA000]' : 'text-[#586283]'
									}`}
								>
									{category?.name}
								</p>
							</Button>
						);
					})}
				</div>
				<ScrollShadow
					orientation="horizontal"
					hideScrollBar
					isEnabled={false}
					size={100}
					className="md:hidden block mt-2"
				>
					<div className="md:hidden flex items-center gap-2 w-[500px] mt-2">
						<Button
							variant="solid"
							className={`${
								currentState?.name === 'All'
									? 'bg-[#FCF9F7] border border-[#FEA000] border-opacity-50'
									: ' bg-white border-2 border-[#F0F2F5] border-opacity-50'
							}  rounded-full px-5 py-2 cursor-pointer`}
							onClick={() => {
								setCurrentState({
									name: 'All',
									value: '',
								});
								setProducts(trendingProducts);
							}}
						>
							<p
								className={`md:text-base text-sm font-normal ${
									currentState?.name === 'All' ? 'text-[#FEA000]' : 'text-[#586283]'
								}`}
							>
								{/* All */}
							</p>
						</Button>
						{allCategories?.data?.data?.slice(0.4).map((category, idx) => {
							return (
								<Button
									variant="solid"
									key={idx}
									className={`${
										category?.name === currentState?.name
											? 'bg-[#FCF9F7] border border-[#FEA000] border-opacity-50'
											: ' bg-white border-2 border-[#F0F2F5] border-opacity-50'
									} min-w-max flex flex-row items-center  rounded-full px-5 py-2 cursor-pointer`}
									onClick={() =>
										setCurrentState({
											name: category?.name,
											value: category?._id,
										})
									}
								>
									<p
										className={`md:text-base text-sm font-normal ${
											category?.name === currentState?.name ? 'text-[#FEA000]' : 'text-[#586283]'
										}`}
									>
										{category?.name}
									</p>
								</Button>
							);
						})}
					</div>
				</ScrollShadow>
			</SectionHeader>

			<div className="flex flex-wrap gap-4 justify-center md:gap-3 md:mt-[3rem] mt-[1.5rem]">
  <div className="md:flex flex-col justify-center h-[355px] items-center w-52 px-[1.8rem] border border-[#F0F2F5] rounded-3xl pt-[2rem] pb-[2rem] transition ease-in-out hover:shadow-lg hidden ">
    <h6 className="text-xl text-black font-bold">
      Available for <br />
      only 24 Hours
    </h6>
    <p className="text-[#FEA000] text-base font-normal mt-2">Don’t miss out!</p>
    <div className="my-[2rem] flex items-center justify-center flex-col">
      <p className="text-[#586283] text-sm font-normal">Sales Ends In</p>
      <div className="flex items-center gap-3 mt-4">
        <button className="bg-[#FEA000] px-3 py-2 rounded-full text-white text-[15.2] font-medium">
          {`${hours}`.padStart(2, 0 as any)}
        </button>
        <p>:</p>
        <button className="bg-[#FEA000] px-3 py-2 rounded-full text-white text-[15.2] font-medium">
          {`${Math.floor(hours / 60)}`.padStart(2, 0 as any)}
        </button>
        <p>:</p>
        <button className="bg-[#FEA000] px-3 py-2 rounded-full text-white text-[15.2] font-medium">
          {`${time % 60}`.padStart(2, 0 as any)}
        </button>
      </div>
      <div className="flex items-center gap-8 mt-3">
        <p className="text-[#586283] text-body-sm mt-1">Hours</p>
        <p className="text-[#586283] text-body-sm mt-1">Mins</p>
        <p className="text-[#586283] text-body-sm mt-1">Secs</p>
      </div>
    </div>
    <Link href="/product">
      <Button
        variant="solid"
        className="bg-[#FEA000] rounded-full px-6 py-[0.6rem] text-white w-full"
      >
        See All Products
      </Button>
    </Link>
  </div>
  
  {products.length === 0 ? (
    <div className="w-full flex items-center justify-center">
      <p>There are no Products here</p>
    </div>
  ) : (
    products.slice(0, 4).map((product: productDetailsProps, idx) => (
      <div key={idx} className="flex-1">
        <ProductsCard item={product} />
      </div>
    ))
  )}
</div>

		</section>
	);
};
export default TodalsDealSection;
