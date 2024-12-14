import { AllProductsStacked } from '@/components/constants';
import { Button } from '@nextui-org/react';
import Image from 'next/image';
import React from 'react';
import { setProducId } from '@/contexts/features/landingpage/landingpage';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import bag from '@/public/icons/bag.svg';
import { Heart } from 'iconsax-react';
import { CartApiResponse, addToCartCredentails, productDetailsProps } from '@/lib/types';
import Sandal from '@/public/images/sandal.png';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import {
	getWishlistProductData,
	removeWishlistProductData,
} from '@/contexts/features/landingpage/landingpage';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { useRouter } from 'next/navigation';
import heart_filled from '@/public/icons/heart_filled.svg';
import { AddItemToCart, RemoveItemFromCart } from '@/lib/dataMutationFns';

type Props = {};
interface ProductCardProps {
	products: productDetailsProps[];
	// item: productDetailsProps;
	noborder?: boolean;
	nobutton?: boolean;
	containerClassName?: string;
}
const ProductStackedView: React.FC<ProductCardProps> = ({ products }) => {
	// const { products } = products;
	const router = useRouter();
	const { toast } = useToast();
	const queryClient = useQueryClient();

	// Redux
	const dispatch = useAppDispatch();
	const { wishlistProducts, cartItems } = useAppSelector((state) => state.landingpage);

	// Functions
	const numberFormat = (value: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN',
		})
			.format(value)
			.replace('NGN', '₦')
			.trim();

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

	const addToWishlist = (item: productDetailsProps) => {
		dispatch(getWishlistProductData([...wishlistProducts, item]));
	};

	const removeFromWishlist = (item: productDetailsProps) => {
		dispatch(removeWishlistProductData(item?._id));
	};

	// const handleView = () => {
	// 	dispatch(setProducId(item._id));
	// 	router.push(`/product/${item._id}`);
	// };

	return (
		<div className='flex flex-col gap-y-6 justify-center mx-auto'>
			{products?.map((product, index) => {
				const findItem = cartItems?.items?.find(
					(product_) => product_?.productId?._id === product?._id,
				);
				const findWishlistItem = wishlistProducts?.find(
					(product_: productDetailsProps) => product_?._id === product?._id,
				);

				return (
					<div
						key={index}
						className="flex sm:justify-evenly justify-center sm:flex-row gap-y-2 flex-col md:items-start items-center border-b border-[#F0F2F5] w-11/12 sm:w-auto py-5 sm:py-5 md:mx-0 mx-[2rem]"
					>
						<Image
							src={product.coverPhoto?.length > 0 ? product?.coverPhoto[0] : Sandal}
							alt="product_image"
							width={500}
							height={500}
							className="w-[180px]"
						/>
						<div className="flex justify-evenly items-start gap-x-5 flex-1 sm:flex-grow-0">
							<div className="w-72 hidden lg:flex flex-col items-start">
								<h4 className="text-black font-semibold text-xl">{product.name}</h4>
								<p className="text-[#586283] font-normal text-sm mt-1">
									Brand: <span className="text-[#FEA000]">{product.brand}</span>
								</p>
								<div className="flex items-start gap-2 my-3">
									{Array(5)
										.fill('_')
										.map((star, index) => (
											<div
												className={`${index < product.ratings ? 'text-primary' : 'text-primary'}`}
												key={index}
											>
												{index < product.ratings ? (
													index === Math.floor(product.ratings) && product.ratings % 1 !== 0 ? (
														<BsStarHalf />
													) : (
														<BsStarFill />
													)
												) : (
													<BsStar />
												)}
											</div>
										))}
								</div>
								<p className="text-[#586283] font-normal text-sm mt-3">{product.desc}</p>
							</div>
							<div className="flex justify-center flex-col w-full sm:w-fit">
								<h3 className="lg:hidden">{product.name}</h3>
								<div className="flex justify-between items-center gap-2">
									<h6 className="text-xl text-black font-bold">{numberFormat(product?.price)}</h6>
								</div>
								<div className="flex justify-left items-center gap-2 my-3">
									{Array(5)
										.fill('_')
										.map((star, index) => (
											<div
												key={index}
												className={`${index < product.ratings ? 'text-[#FF9E3A]' : 'text-[#FF9E3A]'}`}
											>
												{index < product.ratings ? (
													index === Math.floor(product.ratings) && product.ratings % 1 !== 0 ? (
														<BsStarHalf />
													) : (
														<BsStarFill />
													)
												) : (
													<BsStar />
												)}
											</div>
										))}
								</div>
								<Button
									variant="solid"
									radius="full"
									className="bg-primary text-white py-4 px-4 w-[260px] sm:w-auto"
									startContent={<Image src={bag} alt="icon" />}
									disabled={product.isOutOfStock}
									onClick={() => {
										if (!findItem) {
											handleAddToCart({
												productId: product?._id,
												quantity: 1,
											});
										} else {
											handleRemoveFromCart(product?._id);
										}
									}}
								>
									{product?.isOutOfStock ? 'Out Of Stock' : findItem ? 'In Cart' : 'Add to Cart'}
								</Button>
								<Button
									startContent={
										findWishlistItem ? (
											<Image src={heart_filled} alt="heart_filled" className="cursor-pointer" />
										) : (
											<Heart size="16" color="#FEA000" />
										)
									}
									variant="solid"
									radius="full"
									className="bg-[#FCF9F7] text-primary px-4 mt-4 py-4 flex-1"
									onClick={() => {
										if (findWishlistItem) {
											removeFromWishlist(product);
										} else {
											addToWishlist(product);
										}
									}}
								>
									{!findWishlistItem ? ' Add to Wishlist' : 'Remove From Wishlist'}
								</Button>
							</div>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export default ProductStackedView;
