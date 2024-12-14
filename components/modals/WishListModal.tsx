import CustomDrawer from '@/components/widgets/CustomDrawer';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { LuMinus } from 'react-icons/lu';
import { BsPlus } from 'react-icons/bs';
import { Trash } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import {
	WishlistProductPricesData,
	clearWishlist,
} from '@/contexts/features/landingpage/landingpage';
import Sandal from '@/public/images/sandal.png';
import { Button } from '@nextui-org/react';
import { CurrencyDisplay } from 'utils/handlePrices';
import MiniCard from 'app/user/wish-lists/components/MiniCard';

interface Props {
	handleClose: () => void;
	open: boolean;
}

const WishList = ({ ...props }: Props): JSX.Element => {
	const { open, handleClose } = props;
	const [prices, setPrices] = useState<any>([]);

	// Redux
	const dispatch = useAppDispatch();
	const wishlistProducts = useAppSelector((state) => state.landingpage?.wishlistItems  || {});

	console.log(wishlistProducts)

	const handleIncrease = (id: string) => {
		const new_prices = [...prices];
		const new_cart_products = [...wishlistProducts];
		const priceIndex = new_prices?.findIndex((item: any) => item?.id === id);
		const productIndex = new_cart_products?.findIndex((item: any) => item?._id === id);
		new_prices[priceIndex] = {
			...new_prices?.[priceIndex],
			value: new_prices?.[priceIndex]?.value + 1,
			price: (new_prices?.[priceIndex]?.value + 1) * new_cart_products?.[productIndex]?.price,
		};
		setPrices(new_prices);
		dispatch(WishlistProductPricesData(new_prices));
	};

	const handleDecrease = (id: string) => {
		const new_prices = [...prices];
		const priceIndex = new_prices?.findIndex((item: any) => item?.id === id);
		const new_cart_products = [...wishlistProducts];
		const productIndex = new_cart_products?.findIndex((item: any) => item?._id === id);
		new_prices[priceIndex] = {
			...new_prices?.[priceIndex],
			value: new_prices?.[priceIndex]?.value - 1,
			price: (new_prices?.[priceIndex]?.value - 1) * new_cart_products?.[productIndex]?.price,
		};
		setPrices(new_prices);
		dispatch(WishlistProductPricesData(new_prices));
	};

	const numberFormat = (value: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN',
		})
			.format(value)
			.replace('NGN', '₦')
			.trim();

	useEffect(() => {
		const prices = wishlistProducts.productsId?.map((product) => {
			return {
				id: product?._id,
				value: 1,
				price: product?.price,
				name: product?.name,
				isOutOfStock: product?.isOutOfStock,
				brand: product?.brand,
				coverPhoto: product?.coverPhoto,
			};
		});
		setPrices(prices);
		dispatch(WishlistProductPricesData(prices));
	}, [open]);

	const sub_total = prices?.reduce((accumulator: any, value: any) => {
		return accumulator + value?.price;
	}, 0);
	return (
		<CustomDrawer
			isOpen={open}
			noClose
			title={
				<div className="flex items-center gap-3">
					<h4 className="text-black text-2xl text-semibold">Wishlist</h4>
					{wishlistProducts?.productsId?.length > 0 && (
						<p className="bg-[#1D2329] text-white px-[0.6rem] py-[0.1rem] rounded-full text-lg">
							{wishlistProducts?.productsId?.length}
						</p>
					)}
				</div>
			}
			footer={
				wishlistProducts?.productsId?.length ? (
					<div className="mt-[1rem] border border-[#F0F2F5] rounded-md py-2 px-6 mx-[3rem] mb-[1rem]">
						<div className="flex justify-between items-center my-2">
							<p className="text-sm font-medium text-[#586283]">Orders</p>
							<button className="bg-[#F0F2F5] px-[10px] py-[8px] rounded-full text-xs font-medium text-[#586283]">
								{wishlistProducts?.productsId.length} Item
								{wishlistProducts?.productsId.length > 1 ? 's' : ''}
							</button>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="text-sm font-medium text-[#586283]">Subtotal</p>
							<h4 className="text-xl font-semibold text-[#1F1F1F]"> {numberFormat(sub_total)}</h4>
						</div>
						<div className="mt-5">
							{/* <button className="bg-[#FEA000] w-full rounded-full py-4 text-white text-sm font-semibold my-1" onClick={() => Router.push('/checkout')}>
              Checkout
            </button> */}
							<button
								className="border border-[#F0F2F5] w-full rounded-full py-5 text-[#1D2329] text-sm font-semibold my-3"
								onClick={() => {
									dispatch(clearWishlist());
									handleClose();
								}}
							>
								ClearWishlist
							</button>
						</div>
					</div>
				) : null
			}
			handleClose={handleClose}
			className="h-screen max-h-screen w-full max-w-[700px] overflow-scroll rounded-md"
		>
			<div className="mt-7 mx-[2rem]">
				{wishlistProducts?.productsId?.length > 0 ? (
					<>
						{wishlistProducts?.productsId?.map((option, index) => {
							const get_item = prices?.find((item: any) => item?.id === option?._id);
							return (
								// <div
								// 	key={index}
								// 	className="flex justify-between items-center border-b border-[#F0F2F5]"
								// >
								// 	<div className="flex items-center gap-5">
								// 		<Image
								// 			src={option.coverPhoto[0] || Sandal}
								// 			alt="product image"
								// 			className="w-[150px] h-[150px]"
								// 			width={200}
								// 			height={200}
								// 		/>
								// 		<div>
								// 			<h6 className="text-black text-lg font-semibold">{option.name}</h6>
								// 			<p className="text-sm font-normal text-[#586283]">
								// 				Brand: <span className="text-primary">{option.brand}</span>
								// 			</p>
								// 			<div className="flex justify-center items-center mt-5 gap-4 bg-[#FCF9F7] rounded-full py-2 w-[120px]">
								// 				<Button
								// 					variant="solid"
								// 					size="sm"
								// 					isIconOnly
								// 					className="bg-primary text-white rounded-full p-1"
								// 					onClick={() => handleDecrease(option?._id)}
								// 					disabled={get_item?.value === 1}
								// 				>
								// 					<LuMinus size={20} />
								// 				</Button>
								// 				<p className="text-[#586283] text-md font-medium">{get_item?.value}</p>
								// 				<Button
								// 					variant="solid"
								// 					size="sm"
								// 					isIconOnly
								// 					className="bg-primary text-white rounded-full p-1"
								// 					onClick={() => handleIncrease(option?._id)}
								// 				>
								// 					<BsPlus size={20} />
								// 				</Button>
								// 			</div>
								// 		</div>
								// 	</div>
								// 	<div>
								// 		<div className="bg-[#FCF9F7] p-3 rounded-full w-[50px] justify-self-auto">
								// 			<Trash size="20" />
								// 		</div>
								// 		<div className="flex items-center gap-3 py-5">
								// 			<h4 className="text-black font-bold text-xl">
								// 				<CurrencyDisplay amount={get_item?.price} />
								// 			</h4>
								// 			<p className="bg-[#FCF9F7] py-2 px-3 text-xs rounded-3xl text-[#EF8D1B] ml-3">
								// 				In Stock
								// 			</p>
								// 		</div>
								// 	</div>
								// </div>
								<MiniCard {...option} key={index}/>
							);
						})}
					</>
				) : (
					<h6 className="flex justify-center items-center mt-[10rem] text-2xl text-black">
						Your Wishlist is empty
					</h6>
				)}
			</div>
		</CustomDrawer>
	);
};

export default WishList;
