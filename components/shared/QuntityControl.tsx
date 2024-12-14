import { Button } from '@nextui-org/react';
import { Add, Minus } from 'iconsax-react';

type Props = {
	productId: string;
	quantity?: number;
	handleUnitRemoveFromCart: (productId: string) => void;
	handleUpdateAddToCart: (productId: string) => void;
	containerClassName?: string;
	quantityClassName?: string;
	addBtnClassName?: string;
	minusBtnClassName?: string;
	btnClassName?: string;
	disableAddBtn?: boolean;
	disableRemoveBtn?: boolean;
};

const QuantityControl = ({
	productId,
	quantity,
	handleUnitRemoveFromCart,
	handleUpdateAddToCart,
	containerClassName,
	addBtnClassName,
	minusBtnClassName,
	btnClassName,
	quantityClassName,
	disableAddBtn = false,
	disableRemoveBtn = false,
}: Props) => {
	return (
		<div
			className={`flex items-center bg-[#FCF9F7] rounded-full border border-[#F0F2F5] ${containerClassName}`}
		>
			<Button
				variant="solid"
				isIconOnly
				size="sm"
				className={`bg-primary text-white rounded-full ${btnClassName} ${minusBtnClassName}`}
				onClick={() => handleUnitRemoveFromCart(productId)}
				disabled={disableRemoveBtn}
			>
				<Minus size={20} />
			</Button>

			<p className={`text-[#FEA000] text-sm font-semibold ${quantityClassName}`}>{quantity}</p>

			<Button
				variant="solid"
				isIconOnly
				size="sm"
				className={`bg-primary text-white rounded-full ${btnClassName} ${addBtnClassName}`}
				onClick={() => handleUpdateAddToCart(productId)}
				disabled={disableAddBtn}
			>
				<Add size={20} />
			</Button>
		</div>
	);
};

export default QuantityControl;
