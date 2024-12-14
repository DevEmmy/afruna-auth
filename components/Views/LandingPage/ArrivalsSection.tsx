import Image from 'next/image';
import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { GetFrequentProducts } from '@/lib/dataFetchingFns';
import { getFrequentProductData } from '@/contexts/features/landingpage/landingpage';
import { CartApiResponse, addToCartCredentails } from '@/lib/types';
import { AddItemToCart, RemoveItemFromCart } from '@/lib/dataMutationFns';
import { AxiosError } from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';
import Altimage from '@/public/icons/AltImage.svg';
import { Button } from '@nextui-org/react';

const ArrivalsSection = () => {
	const queryClient = useQueryClient();
	const { toast } = useToast();
	// Redux
	const dispatch = useAppDispatch();
	const { frequentProducts, cartItems } = useAppSelector((state) => state.landingpage || {frequentProducts: [], cartItems: {}});

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

	// Functions
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
		(product) => product?.productId?._id === frequentProducts?.[0]?._id,
	);
	const findItem_two = cartItems?.items?.find(
		(product) => product?._id === frequentProducts?.[2]?._id,
	);
	const findItem_three = cartItems?.items?.find(
		(product) => product?._id === frequentProducts?.[3]?._id,
	);
	return (
		<section className="md:my-[3rem]  md:flex block w-[93%] md:w-[90%] mx-auto gap-5">
			<div className="relative w-full flex justify-between items-center gap-5 bg-[#E3F4ED] p-5 md:mb-0 mb-5">
				<div className="text-[#20894D]">
					<span className="text-[10px]">NEW ARRIVALS</span>
					<h4 className="text-lg font-semibold mt-1">{frequentProducts?.[0]?.name}</h4>
					<p className="text-sm font-normal mt-1">{frequentProducts?.[0]?.desc}</p>
					<Button
						variant="solid"
						className="rounded-full bg-[#E3F4ED] border border-[#20894D] text-[#20894D] px-[1rem] py-[-2rem] mt-2 text-xs font-normal"
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
				</div>
				<div className="flex justify-center items-center pl-[1.4rem] bg-[#20894D] absolute top-3 right-2 w-[70px] h-[70px] rounded-full">
					<p className="text-white text-[11px]">From ₦399</p>
				</div>
				<Image
					src={
						frequentProducts?.[0]?.coverPhoto?.length > 0
							? frequentProducts?.[0]?.coverPhoto[0]
							: Altimage
					}
					alt="BGNewphone"
					width={500}
					height={500}
					className="w-[150px]"
				/>
			</div>
			<div className="relative w-full flex justify-between items-center gap-5  bg-[#E7E6E7] p-5 md:mb-0 mb-5">
				<div className="text-[#535361]">
					<span className="text-[10px] ">CLEARANCE</span>
					<h4 className="text-lg font-semibold mt-1">{frequentProducts?.[2]?.name}</h4>
					<p className="text-sm font-normal mt-1">{frequentProducts?.[2]?.desc}</p>
					<Button
						variant="solid"
						className="rounded-full bg-[#E7E6E7] border border-[#535361] text-[#535361] px-[1rem] py-[0.5rem] mt-2 text-xs font-normal"
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
				</div>
				<div className="flex justify-center items-center pl-[1.4rem] bg-[#535361] absolute top-3 right-2 w-[70px] h-[70px] rounded-full">
					<p className="text-white text-[11px]">From ₦399</p>
				</div>
				<Image
					src={
						frequentProducts?.[2]?.coverPhoto?.length > 0
							? frequentProducts?.[2]?.coverPhoto[0]
							: Altimage
					}
					alt="BGNewphone"
					width={500}
					height={500}
					className="w-[150px]"
				/>
			</div>
			<div className="relative w-full flex justify-between items-center gap-5  bg-[#F2EED8] p-5 md:mb-0 mb-5">
				<div className="text-[#6B6619]">
					<span className="text-[10px] ">FEATURED</span>
					<h4 className="text-lg font-semibold mt-1"> {frequentProducts?.[3]?.name}</h4>
					<p className="text-sm font-normal mt-1">{frequentProducts?.[3]?.desc}</p>
					<Button
						variant="solid"
						className="rounded-full  bg-[#F2EED8] border border-[#6B6619] text-[#6B6619] px-[1rem] py-[0.5rem] mt-2 text-xs font-normal flex items-center gap-2"
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
				</div>
				<div className="flex justify-center items-center pl-[1.4rem] bg-[#6B6619] absolute top-3 right-2 w-[70px] h-[70px] rounded-full">
					<p className="text-white text-[11px]">From ₦399</p>
				</div>
				<Image
					src={
						frequentProducts?.[3]?.coverPhoto?.length > 0
							? frequentProducts?.[3]?.coverPhoto[0]
							: Altimage
					}
					alt="BGNewphone"
					width={500}
					height={500}
					className="w-[150px]"
				/>
			</div>
		</section>
	);
};
export default ArrivalsSection;
