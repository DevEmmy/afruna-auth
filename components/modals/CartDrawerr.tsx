import CustomDrawer from '@/components/widgets/CustomDrawer';
import {
	AddUnitItemFromCart,
	ClearToCart,
	RemoveItemFromCart,
	RemoveUnitItemFromCart,
} from '@/lib/dataMutationFns';
import { useAppSelector } from '@/lib/hooks.';
import { CartApiResponse } from '@/lib/types';
import { Button } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { Trash } from 'iconsax-react';
import { Loader2 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { BsPlus } from 'react-icons/bs';
import { LuMinus } from 'react-icons/lu';
import { CurrencyDisplay } from 'utils/handlePrices';
import { useToast } from '../ui/use-toast';
import CartItem from './CartItem';

interface Props {
	handleClose: () => void;
	open: boolean;
}

const CartDrawer = ({ ...props }: Props): JSX.Element => {
	// Props
	const { open, handleClose } = props;

	// next router
	const Router = useRouter();

	// toast notification
	const { toast } = useToast();

	// react query
	const queryClient = useQueryClient();

	// Redux
	const { cartItems } = useAppSelector((state) => state.landingpage || { cartItems: {} });

	// Functions
	const addMutation = useMutation({
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

	async function handleAddToCart(data: string) {
		addMutation.mutate(data);
	}

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

	async function handleUnitRemoveFromCart(productId: string) {
		removeUnitMutation.mutate(productId);
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

	const clearCartMutation = useMutation({
		mutationFn: ClearToCart,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['get-cart'],
			});
			handleClose();
		},
		onError: (error: AxiosError<any>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function handleRemoveClearCart() {
		clearCartMutation.mutate();
	}

	const numberFormat = (value: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN',
		})
			.format(value)
			.replace('NGN', '₦')
			.trim();

	return (
		<CustomDrawer
			isOpen={open}
			noClose
			title={
				<div className="flex flex-row items-center gap-x-3.5">
					<div>
						<h4 className="text-[#1D2329] text-lg md:text-2xl text-semibold">Shopping Cart</h4>
					</div>
					<div className="flex flex-row items-center justify-center bg-black text-white w-10 h-10 rounded-full text-sm">
						{cartItems?.items?.length}
					</div>
				</div>
			}
			footer={
				cartItems?.items?.length ? (
					<div className="mt-[1rem] border border-[#F0F2F5] rounded-md py-2 md:px-6 px-3 md:mx-[3rem] mx-[1rem] mb-[1rem]">
						<div className="flex justify-between items-center my-2">
							<p className="text-base text-[#586283]">Orders</p>
							<Button
								variant="solid"
								className="bg-[#F0F2F5] px-[10px] py-[8px] rounded-full text-xs font-medium text-[#586283]"
							>
								{cartItems?.items?.length} Item
								{cartItems?.items?.length > 1 ? 's' : ''}
							</Button>
						</div>
						<div className="flex justify-between items-center my-2">
							<p className="text-base text-[#586283]">Subtotal</p>
							<h4 className="text-xl font-semibold text-[#1F1F1F]">
								<CurrencyDisplay amount={cartItems?.total} />
							</h4>
						</div>
						<div className="flex flex-col md:flex-row items-center gap-x-4 mt-2">
							<Button
								variant="solid"
								className="bg-[#FEA000] w-full rounded-full py-4 text-white text-sm font-semibold my-1 h-[10]"
								onClick={() => Router.push('/checkout')}
							>
								Checkout
							</Button>
							<Button
								variant="solid"
								className="border-[1.5px] bg-white border-[#F0F2F5] w-full rounded-full py-4 text-[#1D2329] text-sm font-semibold my-3 flex gap-2 justify-center items-center h-[10]"
								onClick={handleRemoveClearCart}
							>
								{clearCartMutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
								Clear Cart
							</Button>
						</div>
					</div>
				) : null
			}
			handleClose={handleClose}
			className="h-screen max-h-screen w-full max-w-[700px] overflow-scroll rounded-md"
		>
			<div className="mt-7 md:mx-[2rem] mx-[1rem]">
				{cartItems?.items?.length ? (
					<>
						{cartItems?.items?.map((option, index) => {
							return (
								<CartItem
									key={index}
									option={option}
									handleRemoveFromCart={handleRemoveFromCart}
									handleUnitRemoveFromCart={handleUnitRemoveFromCart}
									handleAddToCart={handleAddToCart}
								/>
							);
						})}
					</>
				) : (
					<h6 className="flex justify-center items-center mt-[10rem] text-2xl text-black">
						Your cart is empty
					</h6>
				)}
			</div>
		</CustomDrawer>
	);
};

export default CartDrawer;
