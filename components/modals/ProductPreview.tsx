'use client';
import CenteredModal from '@/components/widgets/CenteredModal';
import {
	CartApiResponse,
	FollowuserApiResponse,
	addToCartCredentails,
	cartDetailProps,
	productDetailsProps,
} from '@/lib/types';
import { Button, ModalBody } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import ProductImg from '@/public/icons/product_img.svg';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '../ui/use-toast';
import {
	AddItemToCart,
	AddItemToWishlist,
	AddUnitItemFromCart,
	RemoveItemFromCart,
	RemoveItemFromWishlist,
	RemoveUnitItemFromCart,
} from '@/lib/dataMutationFns';
import { AxiosError } from 'axios';
import { useSelector } from 'react-redux';
import { Bag, Heart } from 'iconsax-react';
import heart_filled from '@/public/icons/heart_filled.svg';
import { LuMinus } from 'react-icons/lu';
import { BsPlus } from 'react-icons/bs';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';

type Props = {
	open: boolean;
	handleClose: () => void;
	oneProduct: productDetailsProps;
};

const ProductPreview = (props: Props) => {
	const { open, handleClose, oneProduct } = props;

	const { cartItems, wishlistItems } = useSelector((state: any) => state.landingpage);
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const numberFormat = (value: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN',
		})
			.format(value)
			.replace('NGN', '₦')
			.trim();

	const removeUnitMutation = useMutation({
		mutationFn: RemoveUnitItemFromCart,
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

	async function handleUnitRemoveFromCart() {
		removeUnitMutation.mutate(oneProduct?._id);
	}

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

	const addUnitMutation = useMutation({
		mutationFn: AddUnitItemFromCart,
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

	async function handleAddUnitToCart(data: string) {
		addUnitMutation.mutate(data);
	}

	const wishlistAddMutation = useMutation({
		mutationFn: AddItemToWishlist,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['get-wishlist'],
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

	async function handleAddToWishList() {
		wishlistAddMutation.mutate({
			productId: oneProduct?._id,
		});
	}

	const removeWishlistMutation = useMutation({
		mutationFn: RemoveItemFromWishlist,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['get-wishlist'],
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

	const removeFromWishlist = () => {
		removeWishlistMutation.mutate(oneProduct?._id);
	};

	const findItem = cartItems?.items?.find(
		(product: cartDetailProps) => product?.productId?._id === oneProduct?._id,
	);

	const findWishlistItem = wishlistItems?.productsId?.find(
		(product: string) => product === oneProduct?._id,
	);

	return (
		<CenteredModal open={open} handleClose={handleClose} size="4xl">
			<ModalBody className="mt-[3rem] mx-0">
				<section className="md:flex justify-center block items-start">
					<section className=" md:w-[60%] relative">
						<Image
							src={oneProduct?.coverPhoto?.length > 0 ? oneProduct?.coverPhoto[0] : ProductImg}
							alt="product Image"
							width={500}
							height={500}
							className="w-[460px]"
						/>
						<Button
							variant="solid"
							isIconOnly
							className="absolute top-0 right-2 bg-[#FCF9F7] rounded-full shadow-lg"
						>
							{!findWishlistItem ? (
								<Heart
									size="15"
									className="text-afruna-blue cursor-pointer"
									onClick={(event) => {
										event?.stopPropagation();
										handleAddToWishList();
									}}
								/>
							) : (
								<Image
									src={heart_filled}
									alt="heart_filled"
									onClick={(event) => {
										event?.stopPropagation();
										removeFromWishlist();
									}}
									className="cursor-pointer"
								/>
							)}
						</Button>
					</section>
					<section className="md:w-[40%] w-full md:ml-[4rem] md:mt-0 mt-[2rem]">
						<h4 className="text-black text-[36px] font-semibold">{oneProduct?.name}</h4>
						<p className="text-[#586283] text-sm font-normal mt-2">
							Brand: <span className="text-primary">{oneProduct?.brand}</span>
						</p>
						<p className="text-[#586283] text-sm font-normal leading-7 mt-4">{oneProduct?.desc}</p>
						<div className="flex items-center mt-5">
							<h4 className="text-black text-xl font-bold">{numberFormat(oneProduct?.price)}</h4>
							<p className="bg-[#FCF9F7] py-[0.4rem] px-3 rounded-3xl text-primary text-[10px] font-medium ml-3">
								{oneProduct?.isOutOfStock ? 'Out of Stock' : 'in Stock'}
							</p>
						</div>
						<div className="mt-5">
							<div className="flex items-center gap-4 mt-5">
								<Button
									variant="solid"
									radius="full"
									className="bg-primary text-white px-10 py-[1.5rem] flex justify-center items-center gap-2"
									startContent={<Bag size="20" color="#FFFFFF" />}
									disabled={oneProduct?.isOutOfStock}
									onClick={() => {
										if (!oneProduct?.isOutOfStock) {
											if (!findItem) {
												handleAddToCart({
													productId: oneProduct?._id,
													quantity: 1,
												});
											} else {
												handleRemoveFromCart(oneProduct?._id);
											}
										}
									}}
								>
									{(addMutation.isPending || removeMutation.isPending) && (
										<Loader2 className="mr-2 h-4 w-4 animate-spin" />
									)}
									{findItem ? 'Remove Item' : 'Add to Cart'}
								</Button>
								{cartItems?.items?.length > 0 && findItem && (
									<Link href="/checkout">
										<Button
											variant="solid"
											radius="full"
											className="bg-[#FEA000] bg-opacity-10 px-10 py-[1.5rem] text-primary "
										>
											Buy Now
										</Button>
									</Link>
								)}
							</div>
						</div>
					</section>
				</section>
			</ModalBody>
		</CenteredModal>
	);
};

export default ProductPreview;
