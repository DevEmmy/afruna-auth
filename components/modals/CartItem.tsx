'use client';
import Sandal from '@/public/images/sandal.png';
import { Button } from '@nextui-org/react';
import { Trash } from 'iconsax-react';
import React, { useState } from 'react';
import { CurrencyDisplay } from 'utils/handlePrices';
import ProductImage from '../shared/ProductImage';
import QuantityControl from '../shared/QuntityControl';

const CartItem = ({
	option,
	handleRemoveFromCart,
	handleUnitRemoveFromCart,
	handleAddToCart,
}: any) => {
	const [qty, setQty] = useState(option?.quantity);

	const increment = () => {
		setQty((prevQty: number) => prevQty + 1);
		handleAddToCart(option?.productId?._id);
	};

	const decrement = () => {
		if (qty > 1) {
			setQty((prevQty: number) => prevQty - 1);
			handleUnitRemoveFromCart(option?.productId?._id);
		}
	};

	return (
		<div className="md:flex justify-between items-center border-b border-[#F0F2F5] pb-3 md:pt-0 pt-3">
			<div className="flex flex-col md:flex-row w-full items-center gap-5">
				<ProductImage
					src={option?.productId?.images[0]}
					placeholderSrc="product image"
					className="!w-[150px] !h-[150px] md:w-[150px] md:h-[150px]"
				/>
				<div className="flex flex-col gap-y-4 w-full grow">
					<div className="flex flex-row justify-between items-start">
						<div className="flex flex-col gap-y-1.5">
							<h6 className="text-black md:text-lg text-base font-semibold">
								{option.productId?.name}
							</h6>
							<p className="text-sm font-normal text-[#586283]">
								Brand: <span className="text-primary">{option?.productId?.brand}</span>
							</p>
						</div>

						<Button
							variant="solid"
							isIconOnly
							className="bg-[#FCF9F7] p-3 rounded-full cursor-pointer block justify-self-end ml-[11rem]"
							onClick={() => handleRemoveFromCart(option?.productId?._id)}
						>
							<Trash size="20" />
						</Button>
					</div>

					<div className="flex flex-row justify-between items-center">
						<QuantityControl
							containerClassName="flex flex-row items-center justify-between gap-x-3.5 px-1.5 py-1"
							handleUnitRemoveFromCart={decrement}
							quantityClassName=""
							productId={option.productId?._id}
							quantity={qty}
							handleUpdateAddToCart={increment}
						/>
						<div className="flex items-center gap-x-1.5 py-5">
							<h4 className="text-black font-bold text-xl">
								<CurrencyDisplay amount={option?.total} />
							</h4>
							<p className="bg-[#FCF9F7] py-2 px-3 text-xs rounded-3xl text-[#EF8D1B]">In Stock</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default CartItem;
