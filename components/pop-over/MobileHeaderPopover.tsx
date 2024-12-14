import { GetProductApiResponse, userDetailsTypes } from '@/lib/types';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { ActionCreatorWithPayload, Dispatch, UnknownAction } from '@reduxjs/toolkit';
import { UseQueryResult } from '@tanstack/react-query';
import type { CookieValueTypes } from 'cookies-next';
import { CloseCircle } from 'iconsax-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

import React from 'react';

type Props = {
	avatar: string;
	token: CookieValueTypes | null;
	userData: userDetailsTypes | null;
	dispatch: Dispatch<UnknownAction>;
	setOpenPopOver: React.Dispatch<React.SetStateAction<boolean>>;
	allCategories: UseQueryResult<GetProductApiResponse, Error>;
	setCategoryId: ActionCreatorWithPayload<string, 'landingpage/setCategoryId'>;
};

const MobileHeaderPopover = ({
	avatar,
	token,
	userData,
	allCategories,
	setCategoryId,
	setOpenPopOver,
	dispatch,
}: Props) => {
	const Router = useRouter();

	return (
		<PopoverContent className="flex md:hidden flex-col gap-y-5 mt-1 w-[350px] border-transparent bg-[#FFFFFF] p-2 z-10 rounded-xl">
			<div className="w-full px-5 flex flex-row justify-between items-center mx-[0.5rem]">
				<div className="flex flex-row items-center gap-3">
					<Image src={avatar} alt="Avatr" />
					<div className="block text-left">
						<p className="text-neutral-40  text-sm font-normal">My Account</p>
						{token && userData ? (
							<h6
								className="text-black text-sm font-medium cursor-pointer"
								onClick={() => Router.push('/user/orders')}
							>
								{userData?.firstName}
							</h6>
						) : (
							<h6
								className="text-black text-sm font-medium cursor-pointer"
								onClick={() => Router.push('/auth/sign-in')}
							>
								Login/Register
							</h6>
						)}
					</div>
				</div>
				<CloseCircle
					color="#1D2329"
					size={20}
					className="cursor-pointer"
					onClick={() => setOpenPopOver(false)}
				/>
			</div>
			<div className="flex flex-col ">
				{allCategories?.data?.data.map((menu, index) => (
					<div
						key={index}
						onClick={() => {
							dispatch(setCategoryId(menu._id));
							Router.push(`/category/${menu.name}`);
						}}
						className="flex my-2 justify-between items-center py-[1rem] cursor-pointer hover:bg-[#FEA000] hover:bg-opacity-10 px-[1rem] border-t border-[#F0F2F5]"
					>
						<div className="flex items-center gap-5">
							<p className="text-sm font-normal text-black">{menu.name}</p>
						</div>
					</div>
				))}
			</div>
		</PopoverContent>
	);
};

export default MobileHeaderPopover;
