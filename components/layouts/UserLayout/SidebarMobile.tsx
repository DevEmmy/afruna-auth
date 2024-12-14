'use client';
import React from 'react';
import { Modal, ModalContent } from '@nextui-org/react';
import avatar from '@/public/icons/Avata.svg';
import Image from 'next/image';
import Link from 'next/link';
import { CallCalling, Logout, MessageQuestion, Note1, SaveAdd } from 'iconsax-react';
import { SidebarMenuOptions } from '@/components/constants';
import Logo from '@/public/icons/grayLogo.svg';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { logoutAction } from '@/contexts/features/authentication/authenticationSlice';
import { logoutAction_ } from '@/contexts/features/landingpage/landingpage';
import { logout } from '@/lib/utils';
import { usePathname, useRouter } from 'next/navigation';

interface Props extends React.HTMLProps<HTMLDivElement> {
	isOpen: boolean;
	onOpenChange?: (open: boolean) => void;
	noClose?: boolean;
	title?: any;
	handleClose: () => void;
	endDecorator?: JSX.Element;
	footer?: JSX.Element | null;
	className?: any;
}

const SidebarMobile: React.FC<Props> = ({ ...props }) => {
	// router
	const pathname = usePathname();
	const router = useRouter();

	// redux
	const dispatch = useAppDispatch();
	const userData = useAppSelector((state) => state.authentication?.userData);

	const handleLogout = () => {
		logout();
		dispatch(logoutAction());
		dispatch(logoutAction_());
		router.push('/');
	};
	return (
		<Modal
			scrollBehavior="inside"
			isOpen={props.isOpen}
			onOpenChange={props.onOpenChange}
			onClose={props.handleClose}
			placement="center"
			backdrop="opaque"
			size="full"
			hideCloseButton={props.noClose}
			classNames={{
				wrapper: 'flex justify-start h-screen',
				base: ' h-screen top-0 max-h-screen',
			}}
			motionProps={{
				variants: {
					enter: {
						x: 0,
						opacity: 1,
						transition: {
							duration: 0.3,
							ease: 'easeOut',
						},
					},
					exit: {
						x: 50,
						opacity: 0,
						transition: {
							duration: 0.2,
							ease: 'easeIn',
						},
					},
				},
			}}
			className="w-[220px]"
		>
			<ModalContent>
				{() => (
					<div className="border-r border-[F0F2F5] bg-[#FBFBFB] h-screen px-6 py-8">
						<div className="flex items-center gap-3">
							<Image src={avatar} alt="Avatr" />
							<div>
								<p className="text-[#586283] text-sm font-normal">Hello,👋🏾 {userData?.firstName}</p>

								<Popover>
									<PopoverTrigger className="items-center gap-3">
										<p className="text-[#1A74C7] text-sm font-medium underline">My Account</p>
									</PopoverTrigger>

									<PopoverContent
										className="mt-1 [@media(min-width:980px)]:w-[200px] w-full border-transparent bg-[#FFFFFF] p-2 rounded-xl z-[99999]"
										align="center"
									>
										<Link
											href="/user/wish-lists"
											className="flex gap-2 items-center mb-2 py-3 px-1 hover:bg-[#FBFBFB] cursor-pointer"
										>
											<SaveAdd size="16" color="#586283" />
											<p className="text-[#586283] text-sm font-normal">Wishlists</p>
										</Link>
										<Link
											href="/faqs"
											className="flex gap-2 items-center mb-2 py-3 px-1 hover:bg-[#FBFBFB] cursor-pointer"
										>
											<MessageQuestion size="16" color="#586283" />
											<p className="text-[#586283] text-sm font-normal">FAQs</p>
										</Link>

										<Link
											href="/support-center"
											className="flex gap-2 items-center mb-2 py-3 px-1 hover:bg-[#FBFBFB] cursor-pointer"
										>
											<CallCalling size="16" color="#586283" />
											<p className="text-[#586283] text-sm font-normal">Customer Support</p>
										</Link>
										<Link
											href="/privacy-policy"
											className="flex gap-2 items-center mb-2 py-3 px-1 hover:bg-[#FBFBFB] cursor-pointer"
										>
											<Note1 size="16" color="#586283" />
											<p className="text-[#586283] text-sm font-normal">Privacy Policy</p>
										</Link>
										<Link
											href="/terms-of-use"
											className="flex gap-2 items-center mb-2 py-3 px-1 hover:bg-[#FBFBFB] cursor-pointer"
										>
											<Note1 size="16" color="#586283" />
											<p className="text-[#586283] text-sm font-normal">Terms of Use</p>
										</Link>
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
						<div className="mt-[2.5rem] z-50">
							{SidebarMenuOptions.map((menu, index) => (
								<div
									key={index}
									className={`${
										menu.link === pathname ? 'bg-[#663300] rounded-full ' : ''
									} flex items-center gap-2  p-3 mb-2 z-10 cursor-pointer`}
									onClick={() => router.push(menu.link)}
								>
									<menu.icon size="16" color={menu.link === pathname ? '#FFFFFF' : '#586283'} />
									<p
										className={`text-sm ${
											menu.link === pathname ? 'text-white' : 'text-[#586283]'
										} font-normal`}
									>
										{menu.name}
									</p>
								</div>
							))}
						</div>

						<div className="absolute bottom-[13%]">
							<div onClick={() => router.push('/')} className="cursor-pointer">
								<Image src={Logo} alt="logo" className="w-[100px]" />
							</div>
						</div>
					</div>
				)}
			</ModalContent>
		</Modal>
	);
};

export default SidebarMobile;
