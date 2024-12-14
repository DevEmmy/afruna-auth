'use client';
import { ArrowLeft2, BagCross, HambergerMenu, NotificationBing } from 'iconsax-react';
import React, { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { GetCart, GetUser } from '@/lib/dataFetchingFns';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { setUserData } from '@/contexts/features/authentication/authenticationSlice';
import CartModal from '@/components/modals/CartDrawerr';

import { ArrowDown2 } from 'iconsax-react';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { getCartItemData } from '@/contexts/features/landingpage/landingpage';
import { NotificationOptions } from '@/components/constants';
import BlueShirt from '@/public/images/BlueShirt.svg';
import Image from 'next/image';
import { getUserToken } from '@/lib/utils';
import { useRouter } from 'next/navigation';

type Props = {
	openSidebar: Function;
};

const Header = (props: Props) => {
	const { openSidebar } = props;
	const dispatch = useAppDispatch();
	const [isOpen, setIsOpen] = useState(false);
	const [openNotification, setOpenNotification] = useState(false);
	const [openCart, setOpenCart] = useState<boolean>(false);
	const [view, setView] = useState<boolean>(false);
	const [notificationDetails, setNotificationDetailst] = useState<any>(null);
	const { cartItems } = useAppSelector((state) => state.landingpage || {});
	const token = getUserToken();
	const router = useRouter();

	const currentUser = useQuery({
		queryKey: ['currentUser'],
		queryFn: () => GetUser(),
	});

	const getCart = useQuery({
		queryKey: ['get-cart'],
		queryFn: () => GetCart(),
	});

	// UseEffects
	useEffect(() => {
		if (!getCart?.data?.data) return;

		dispatch(getCartItemData(getCart?.data?.data));
	}, [getCart?.data?.data, dispatch]);

	useEffect(() => {
		if (!currentUser.data?.data) return;

		dispatch(setUserData(currentUser.data.data));
	}, [currentUser.data?.data, dispatch]);

	const handleOpenCart = () => {
		setOpenCart(true);
	};

	const handleCloseCart = () => {
		setOpenCart(false);
	};
	useEffect(() => {
		if (!token) {
			router.push('/');
		}
	}, []);

	return (
		<div className="border-b border-[#F0F2F5] xl:h-[8vh] flex xl:gap-5 md:gap-0 justify-between items-center xl:px-[2rem] px-[1rem] md:px-[2rem] py-3 overflow-hidden">
			<div className="[@media(min-width:1200px)]:block hidden">
				<p className="text-[#586283] text-sm font-normal">Balance</p>
				<p className="text-black text-sm font-medium">₦0.00</p>
			</div>
			<div className="[@media(min-width:1200px)]:hidden block cursor-pointer" onClick={() => openSidebar()}>
				<HambergerMenu size={20} color="#1D2329" />
			</div>
			<div className="flex items-center gap-5">
				<Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
					<PopoverTrigger className='className="flex hover:brightness-75" items-center gap-3'>
						<div className="flex items-center gap-2">
							<p className="text-[#586283] text-sm font-normal">Language</p>
							<ArrowDown2
								size="15"
								color="#FF8A65"
								className={`${
									isOpen && 'rotate-180'
								} text-lg transition ease-linear duration-300 font-bold text-afruna-orange
                }`}
							/>
						</div>
					</PopoverTrigger>

					<PopoverContent className="mt-1 w-[120px] h-[250px] overflow-auto border-transparent bg-[#FFFFFF] py-3 z-10 rounded-[10px]">
						<div className="text-small flex gap-2 items-center my-2 cursor-pointer">
							<p className="text-[#586283] text-sm font-normal text-left">English</p>
						</div>{' '}
						<div className="text-small flex gap-2 items-center my-2 cursor-pointer">
							<p className="text-[#586283] text-sm font-normal text-left">Arabic</p>
						</div>
						<div className="text-small flex gap-2 items-center my-2 cursor-pointer">
							<p className="text-[#586283] text-sm font-normal text-left">Swahili</p>
						</div>
						<div className="text-small flex gap-2 items-center my-2 cursor-pointer">
							<p className="text-[#586283] text-sm font-normal text-left">French</p>
						</div>
						<div className="text-small flex gap-2 items-center my-2 cursor-pointer">
							<p className="text-[#586283] text-sm font-normal text-left">Spanish</p>
						</div>
					</PopoverContent>
				</Popover>

				<Popover
					isOpen={openNotification}
					onOpenChange={(open) => setOpenNotification(open)}
					radius="none"
				>
					<PopoverTrigger>
						<div className="flex items-center gap-3 cursor-pointer relative">
							<div className="bg-[#FCF9F7] h-[40px] w-[40px] rounded-full flex justify-center items-center">
								<NotificationBing size="16" color="#FEA000" />
							</div>
							<p className="absolute px-[5px] py-[0.5px] bg-[#FF3333] text-white text-[9.4px] rounded-full top-0 right-0">
								{NotificationOptions?.length}
							</p>
						</div>
					</PopoverTrigger>
					<PopoverContent
						className={`mt-1 w-[350px] h-[510px] overflow-auto border-transparent bg-[#FFFFFF] z-10 ${
							view ? 'rounded-0' : 'rounded-[20px]'
						} block p-0`}
					>
						<div>
							{!view ? (
								<div className="bg-[#FEA000] h-[60px] flex justify-between items-center px-3">
									<h1 className="text-white text-sm font-semibold">Notifications</h1>
									<p className="text-white text-opacity-70 text-xs font-normal underline cursor-pointer">
										Mark as read
									</p>
								</div>
							) : (
								<div className="flex items-center gap-2 h-[60px] px-5 border-b border-[#F0F2F5]">
									<ArrowLeft2
										color="#1D2329"
										size="12"
										onClick={() => {
											setView(false);
											setNotificationDetailst(null);
										}}
										className="cursor-pointer"
									/>
									<p className="text-black text-xs font-medium">{notificationDetails?.name}</p>
								</div>
							)}
							{view ? (
								<div className="mt-5 px-5">
									<p className="text-xs text-[#586283] font-normal mb-3">
										Hi {notificationDetails?.user_name},
									</p>
									<p className="text-xs text-[#586283] font-normal mb-3 leading-5">
										{notificationDetails?.details_1}
									</p>
									<p className="text-xs text-[#586283] font-normal mb-3 leading-5">
										{notificationDetails?.details_2}
									</p>
									<p className="text-xs text-[#586283] font-normal mb-3 leading-5">
										{notificationDetails?.details_3}
									</p>
									<p className="text-xs text-[#586283] font-normal">
										{notificationDetails?.details_4}
									</p>
									<p className="text-xs text-[#586283] font-normal">
										{notificationDetails?.details_5}
									</p>
									<div className="mt-2">
										<Image src={BlueShirt} alt="notification image" />
									</div>
								</div>
							) : (
								<div>
									{NotificationOptions?.map((option, index) => (
										<div
											key={index}
											className="flex items-start gap-3 p-3 border-b border-[#F0F2F5] cursor-pointer"
											onClick={() => {
												setView(true);
												setNotificationDetailst(option);
											}}
										>
											<p className="bg-[#1A74C7] text-white text-[10px] font-semibold px-4 py-0.5 rounded-full">
												New
											</p>
											<p className="text-[#586283] text-xs font-normal">
												<strong className="text-black font-semibold">{option.name}</strong>{' '}
												{option.description}
											</p>
										</div>
									))}
								</div>
							)}
						</div>
					</PopoverContent>
				</Popover>

				<div
					className="items-center gap-3 cursor-pointer relative"
					onClick={handleOpenCart}
				>
					<div className="bg-[#FCF9F7] h-[40px] w-[40px] rounded-full flex justify-center items-center">
						<BagCross size="16" color="#FEA000" />
					</div>
					{cartItems?.items?.length > 0 && (
						<p className="absolute px-[5px] py-[0.5px] bg-[#FF3333] text-white text-[9.4px] rounded-full top-0 right-0">
							{cartItems?.items?.length}
						</p>
					)}
				</div>
			</div>
			<CartModal open={openCart} handleClose={handleCloseCart} />
		</div>
	);
};

export default Header;
