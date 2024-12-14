import { useToast } from '@/components/ui/use-toast';
import { setProducId } from '@/contexts/features/landingpage/landingpage';
import {
	AddItemToCart,
	AddItemToWishlist,
	AddUnitItemFromCart,
	RemoveItemFromWishlist,
	RemoveUnitItemFromCart,
} from '@/lib/dataMutationFns';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import {
	CartApiResponse,
	addToCartCredentails,
	cartDetailProps,
	productDetailsProps,
} from '@/lib/types';
import Altimage from '@/public/icons/AltImage.svg';
import heart_filled from '@/public/icons/heart_filled.svg';
import { EyeIcon, LoveIcon } from '@/public/icons/interaction';
import { Button } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Add, Eye, Heart } from 'iconsax-react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { FC, useEffect, useState } from 'react';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { CurrencyDisplay } from 'utils/handlePrices';
import ProductPreview from '../modals/ProductPreview';
import ProductImage from '../shared/ProductImage';

interface ProductCardProps {
	item: productDetailsProps;
	noborder?: boolean;
	nobutton?: boolean;
	containerClassName?: string;
}

export const ProductsCard: FC<ProductCardProps> = ({
	item,
	noborder,
	nobutton,
	containerClassName,
}) => {
	const router = useRouter();
	const { toast } = useToast();
	const queryClient = useQueryClient();
	const [productPreview, setProductPreview] = useState(false);
	const [details, setDetails] = useState<productDetailsProps>();

	// Redux
	const dispatch = useAppDispatch();
	const { wishlistItems, cartItems } = useAppSelector((state) => state.landingpage);
	const [inWishList, setInWIshList] = useState(false);

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
	const addQuantityMutation = useMutation({
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
	const removeMutation = useMutation({
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
		removeMutation.mutate(item?._id);
	};

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

	async function handleAddToWishList(productId: string) {
		wishlistAddMutation.mutate({
			productId: productId,
		});
	}

	const findItem = cartItems?.items?.find(
		(product: cartDetailProps) => product?.productId?._id === item?._id,
	);

	useEffect(() => {
		const findWishlistItem = wishlistItems?.productsId?.find(
			(product) => product._id === item?._id,
		);

		if (findWishlistItem) {
			setInWIshList(true);
		} else {
			setInWIshList(false);
		}
	}, [wishlistItems, item?._id]);

	const handleView = () => {
		dispatch(setProducId(item._id));
		router.push(`/product/${item._id}`);
	};

	return (
		<div
			className={` ${
				noborder ? '' : 'border border-[#F0F2F5]'
			} flex flex-col gap-y-3 rounded-2xl py-4 px-3 min-w-60 sm:min-w-0 sm:max-w-[290px] md:px-4 relative cursor-pointer transition ease-in-out hover:shadow-sm ${containerClassName}`}
			onClick={handleView}
		>
			<div className="flex justify-between items-center">
				<div className="w-[2.1rem] h-[1.3rem] text-[10px] font-semibold text-white bg-[#FE3B20] flex justify-center items-center top-2 left-3 rounded-r-3xl">
					-{item.discount}%
				</div>
				<div className="flex gap-3 items-center">
					<button
						onClick={(event) => {
							event.stopPropagation();
							setDetails(item as productDetailsProps);
							setProductPreview(true);
						}}
						className="flex flex-col items-center justify-center border-0 outline-none"
					>
						<EyeIcon />
					</button>
					<button
						onClick={(event) => {
							event.stopPropagation();
							setInWIshList((prevState: boolean) => !prevState);

							if (inWishList) {
								removeFromWishlist();
							} else {
								handleAddToWishList(item._id);
							}
						}}
						className="flex flex-col items-center justify-center border-0 outline-none"
					>
						<LoveIcon
							className={inWishList ? 'fill-[#bf1c1c] stroke-[#bf1c1c]' : 'stroke-[#1D2329]'}
						/>
					</button>
				</div>
			</div>

			<ProductImage
				src={item?.coverPhoto?.length > 0 ? item?.coverPhoto[0] : Altimage}
				placeholderSrc="product_image"
			/>
			<div className="">
				<p className="text-[#586283] text-sm font-normal">{item.name}</p>
				<div className="flex gap-3 items-center mt-1">
					<h6 className="md:text-xl text-[14.62px] text-black font-bold">
						<CurrencyDisplay amount={item.price} />
					</h6>
				</div>{' '}
				<div className="flex justify-left items-center gap-2 mx-auto my-1">
					{Array(5)
						.fill('_')
						.map((star, index) => (
							<div
								className={`${index < item.ratings ? 'text-[#FF9E3A]' : 'text-[#FF9E3A]'}  `}
								key={index}
							>
								{index < item.ratings ? (
									index === Math.floor(item.ratings) && item.ratings % 1 !== 0 ? (
										<BsStarHalf size={16} />
									) : (
										<BsStarFill size={16} />
									)
								) : (
									<BsStar size={16} />
								)}
							</div>
						))}
				</div>{' '}
				{!nobutton && (
					<div>
						{item?.isOutOfStock ? (
							<button
								className="w-full flex justify-center items-center transition-opacity duration-500 text-[#FEA000] text-sm font-normal bg-[#FCF9F7] mt-4 rounded-full py-[0.5rem] border border-[#F0F2F5]"
								disabled
							>
								Out of Stock
							</button>
						) : findItem === undefined ? (
							<Button
								variant="bordered"
								onClick={(event) => {
									event?.stopPropagation();
									handleAddToCart({
										productId: item?._id,
										quantity: 1,
									});
								}}
								disabled={item?.isOutOfStock}
								className="w-full flex justify-center items-center transition-opacity duration-500 text-[#FEA000] text-sm font-normal bg-[#FCF9F7] mt-4 rounded-full py-[0.5rem] border border-[#F0F2F5] cursor-pointer"
							>
								{addMutation.isPending || addQuantityMutation.isPending ? (
									<Loader2 className="mr-2 h-4 w-4 animate-spin text-[#FEA000]" />
								) : (
									<Add size="20" color="#FEA000" className="mr-3" />
								)}
								Add to Cart
							</Button>
						) : (
							<Button
								variant="bordered"
								className="w-full flex justify-center items-center transition-opacity duration-500 text-[#FEA000] text-sm font-normal bg-[#FCF9F7] mt-4 rounded-full py-[0.5rem] border border-[#F0F2F5]"
							>
								In Cart
							</Button>
						)}
					</div>
				)}
			</div>
			<ProductPreview
				open={productPreview}
				handleClose={() => setProductPreview(false)}
				oneProduct={details as productDetailsProps}
			/>
		</div>
	);
};
