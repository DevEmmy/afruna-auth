'use client';
import React from 'react';
import Logo from '@/public/icons/grayLogo.svg';
import Link from 'next/link';
import Image from 'next/image';
import { SidebarMenuOptions } from '@/components/constants';
import { usePathname, useRouter } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import avatar from '@/public/icons/Avata.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { SaveAdd, MessageQuestion, CallCalling, Logout, Note1 } from 'iconsax-react';
import { logoutAction } from '@/contexts/features/authentication/authenticationSlice';
import { logoutAction_ } from '@/contexts/features/landingpage/landingpage';
import { logout } from '@/lib/utils';

const Sidebar = () => {
	const pathname = usePathname();
	const router = useRouter();
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.authentication?.userData);

	const handleLogout = () => {
		logout();
		dispatch(logoutAction());
		dispatch(logoutAction_());
		router.push('/');
	};

	const accountMenuLinks = [
		{ href: '/user/wish-lists', icon: SaveAdd, label: 'Wishlists' },
		{ href: '/faqs', icon: MessageQuestion, label: 'FAQs' },
		{ href: '/support-center', icon: CallCalling, label: 'Customer Support' },
		{ href: '/privacy-policy', icon: Note1, label: 'Privacy Policy' },
		{ href: '/terms-of-use', icon: Note1, label: 'Terms of Use' },
	];

	return (
		<div className="border-r border-[#F0F2F5] bg-[#FBFBFB] h-screen px-6 py-8">
			<div className="flex items-center gap-3">
				<Image src={avatar} alt="Avatar" />
				<div>
					<p className="text-[#586283] text-sm font-normal">Hello,👋🏾 {userData?.firstName}</p>
					<Popover>
						<PopoverTrigger className="flex hover:brightness-75 items-center gap-3">
							<p className="text-[#1A74C7] text-sm font-medium underline">My Account</p>
						</PopoverTrigger>
						<PopoverContent
							className="mt-1 md:w-[200px] w-full border-transparent bg-[#FFFFFF] p-2 z-10 rounded-xl"
							align="center"
						>
							{accountMenuLinks.map(({ href, icon: Icon, label }, idx) => (
								<Link
									key={idx}
									href={href}
									className="flex gap-2 items-center mb-2 py-3 px-1 hover:bg-[#FBFBFB] cursor-pointer"
								>
									<Icon size="16" color="#586283" />
									<p className="text-[#586283] text-sm font-normal">{label}</p>
								</Link>
							))}
							<div
								className="flex gap-2 items-center mb-2 py-3 px-1 hover:bg-[#FBFBFB] cursor-pointer"
								onClick={handleLogout}
							>
								<Logout size="16" color="#586283" />
								<p className="text-[#586283] text-sm font-normal">Logout</p>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			</div>

			<div className="mt-[2.5rem]">
				{SidebarMenuOptions.map((menu, index) => (
					<Link
						href={menu.link}
						key={index}
						className={`${
							menu.link === pathname ? 'bg-[#663300] rounded-full' : ''
						} flex items-center gap-2 p-3 mb-2`}
					>
						<menu.icon size="16" color={menu.link === pathname ? '#FFFFFF' : '#586283'} />
						<p
							className={`text-sm ${
								menu.link === pathname ? 'text-white' : 'text-[#586283]'
							} font-normal`}
						>
							{menu.name}
						</p>
					</Link>
				))}
			</div>

			<div className="absolute bottom-[13%]">
				<Link href="/">
					<Image src={Logo} alt="logo" className="w-[100px]" />
				</Link>
			</div>
		</div>
	);
};

export default Sidebar;
