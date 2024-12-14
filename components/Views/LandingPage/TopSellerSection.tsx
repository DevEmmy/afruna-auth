import React, { useEffect } from 'react';
import Image from 'next/image';
import { ArrowRight2 } from 'iconsax-react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetFrequentProducts } from '@/lib/dataFetchingFns';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { getFrequentProductData } from '@/contexts/features/landingpage/landingpage';
import { CartApiResponse, addToCartCredentails, cartDetailProps } from '@/lib/types';
import { AddItemToCart, RemoveItemFromCart } from '@/lib/dataMutationFns';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import Altimage from '@/public/icons/AltImage.svg';
import Link from 'next/link';
import { Button } from '@nextui-org/react';

const TopSellerSection = () => {
	// React query
	const queryClient = useQueryClient();
	const { toast } = useToast();

	// Redux
	const dispatch = useAppDispatch();
	const { frequentProducts, cartItems } = useAppSelector((state) => state.landingpage);

	// WQery
	const allFrequentProducts = useQuery({
		queryKey: ['frequent-products'],
		queryFn: () => GetFrequentProducts(),
	});

	// UseEffects
	useEffect(() => {
		if (!allFrequentProducts?.data?.data) return;

		dispatch(getFrequentProductData(allFrequentProducts?.data?.data));
	}, [allFrequentProducts?.data?.data, dispatch]);

	const addMutation = useMutation({
		mutationFn: AddItemToCart,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['get-cart'],
			});
		},
		onError: (error: AxiosError<CartApiResponse>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function handleAddToCart(data: addToCartCredentails) {
		addMutation.mutate({
			productId: data?.productId,
			quantity: data?.quantity,
		});
	}

	const removeMutation = useMutation({
		mutationFn: RemoveItemFromCart,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['get-cart'],
			});
		},
		onError: (error: AxiosError<any>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function handleRemoveFromCart(productId: string) {
		removeMutation.mutate(productId);
	}

	const findItem_one = cartItems?.items?.find(
		(product: cartDetailProps) => product?.productId?._id === frequentProducts?.[0]?._id,
	);
	const findItem_two = cartItems?.items?.find(
		(product) => product?._id === frequentProducts?.[2]?._id,
	);
	const findItem_three = cartItems?.items?.find(
		(product) => product?._id === frequentProducts?.[3]?._id,
	);
	const findItem_four = cartItems?.items?.find(
		(product) => product?._id === frequentProducts?.[4]?._id,
	);

	return (
		!allFrequentProducts?.isLoading && (
			<section className="flex flex-col gap-y-7 w-[93%] md:w-[90%] mx-auto py-5 mt-[3rem]">
				<div className="flex justify-between items-center pb-3 relative">
					<h4 className="md:text-2xl text-xl font-bold">Top Selling</h4>
					<div className="md:block hidden absolute border-b-2 border-[#1D2329] w-[150px] bottom-0"></div>
					<div className="flex justify-between items-center gap-4">
						<Link
							href="/product"
							className="flex gap-2 items-center cursor-pointer border border-[#F0F2F5] rounded-full py-2.5 px-5"
						>
							<p className="text-base text-[#586283] text-normal">See more</p>
							<ArrowRight2 size="10" color="#586283" className="" />
						</Link>
					</div>
				</div>
				<div className="grid md:grid-cols-4 grid-cols-2 xl:gap-5 md:gap-3 gap-5 ">
					<div className="bg-[#D2ECDA] px-[1.5rem] pt-[1.5rem] md:h-[400px] w-full">
						<h4 className="text-[#648014] md:text-2xl text-[13.2px] font-bold mb-1">
							{frequentProducts?.[0]?.name}
						</h4>
						<p className="text-[#648014] md:text-sm text-[7.59px]">{frequentProducts?.[0]?.desc}</p>
						<Button
							variant="solid"
							className="text-[#648014] bg-[#D2ECDA] border border-[#648014] mt-3 rounded-full py-2 px-6 text-[12px]"
							onClick={() => {
								if (findItem_one) {
									handleRemoveFromCart(frequentProducts?.[0]?._id);
								} else {
									handleAddToCart({
										productId: frequentProducts?.[0]?._id,
										quantity: 1,
									});
								}
							}}
						>
							{findItem_one ? 'In Cart' : 'Shop Now'}
						</Button>
						<div className="flex justify-center items-center">
							<Image
								src={
									frequentProducts?.[0]?.coverPhoto?.length > 0
										? frequentProducts?.[0]?.coverPhoto[0]
										: Altimage
								}
								alt="Product Image"
								width={500}
								height={500}
								priority
								className="mt-5 w-[200px]"
							/>
						</div>
					</div>
					<div className="bg-[#F6D5D1] px-[1.5rem] pt-[1.5rem] md:h-[400px] w-full">
						<h2 className="text-[#94226D] md:text-2xl text-[13.2px] font-bold mb-1">
							{frequentProducts?.[4]?.name}
						</h2>
						<p className="text-[#94226D] md:text-sm text-[7.59px]">{frequentProducts?.[4]?.desc}</p>
						<Button
							variant="solid"
							className="bg-[#F6D5D1] text-[#94226D] border border-[#94226D] mt-3 rounded-full py-2 px-6 text-[12px]"
							onClick={() => {
								if (findItem_four) {
									handleRemoveFromCart(frequentProducts?.[4]?._id);
								} else {
									handleAddToCart({
										productId: frequentProducts?.[4]?._id,
										quantity: 1,
									});
								}
							}}
						>
							{findItem_four ? 'In Cart' : 'Shop Now'}
						</Button>
						<div className="flex justify-center items-center">
							<Image
								src={
									frequentProducts?.[4]?.coverPhoto?.length > 0
										? frequentProducts?.[4]?.coverPhoto[0]
										: Altimage
								}
								alt="Product Image"
								width={500}
								height={500}
								className="mt-5 w-[200px]"
							/>
						</div>
					</div>
					<div className="bg-[#C7D8ED] px-[1.5rem] py-[1.5rem] md:h-[400px] w-full">
						<h4 className="text-[#285E8D] md:text-2xl text-[13.2px] font-bold mb-1">
							{frequentProducts?.[2]?.name}
						</h4>
						<p className="text-[#285E8D] md:text-sm text-[7.59px]">{frequentProducts?.[2]?.desc}</p>
						<Button
							variant="solid"
							className="bg-[#C7D8ED] text-[#285E8D] border border-[#285E8D] mt-3 rounded-full py-2 px-6  text-[12px] z-10"
							onClick={() => {
								if (findItem_two) {
									handleRemoveFromCart(frequentProducts?.[2]?._id);
								} else {
									handleAddToCart({
										productId: frequentProducts?.[2]?._id,
										quantity: 1,
									});
								}
							}}
						>
							{findItem_two ? 'In Cart' : 'Shop Now'}
						</Button>
						<div className="flex justify-center items-center">
							<Image
								src={
									frequentProducts?.[2]?.coverPhoto?.length > 0
										? frequentProducts?.[2]?.coverPhoto[0]
										: Altimage
								}
								alt="Product Image"
								width={500}
								height={500}
								priority
								className="mt-5 w-[200px]"
							/>
						</div>
					</div>
					<div className="bg-[#FCEFE3] px-[1.5rem] py-[1.5rem] md:h-[400px] w-full">
						<h4 className="text-[#91553A] md:text-2xl text-[13.2px] font-bold mb-1">
							{frequentProducts?.[3]?.name}
						</h4>
						<p className="text-[#91553A] md:text-sm text-[7.59px]">{frequentProducts?.[3]?.desc}</p>
						<Button
							variant="solid"
							className="bg-[#FCEFE3] text-[#91553A] border border-[#91553A] mt-3 rounded-full py-2 px-6  text-[12px] flex items-center gap-2"
							onClick={() => {
								if (findItem_three) {
									handleRemoveFromCart(frequentProducts?.[3]?._id);
								} else {
									handleAddToCart({
										productId: frequentProducts?.[3]?._id,
										quantity: 1,
									});
								}
							}}
						>
							{' '}
							{(addMutation.isPending || removeMutation.isPending) && (
								<Loader2 className="mr-2 h-4 w-4 animate-spin" />
							)}
							{findItem_three ? 'In Cart' : 'Shop Now'}
						</Button>
						<div className="flex justify-center items-center">
							<Image
								src={
									frequentProducts?.[3]?.coverPhoto?.length > 0
										? frequentProducts?.[3]?.coverPhoto[0]
										: Altimage
								}
								alt="Product Image"
								width={500}
								height={500}
								priority
								className="mt-5 w-[200px]"
							/>
						</div>
					</div>
				</div>
			</section>
		)
	);
};
export default TopSellerSection;
