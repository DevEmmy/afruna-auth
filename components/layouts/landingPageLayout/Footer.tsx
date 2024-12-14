import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import Logo from '@/public/icons/afruna-white.svg';
import Appstore from '@/public/icons/AppStore.svg';
import Playstore from '@/public/icons/Playstore.svg';
import TelegramLogo from '@/public/icons/telegramlogo.svg';
import InstagramLogo from '@/public/icons/instagramLogo.svg';
import LinkedinLogo from '@/public/icons/linkedinLogo.svg';
import TwitterLogo from '@/public/icons/twitterLogo.svg';
import { getUserToken } from '@/lib/utils';

const Footer = () => {
	const token = getUserToken();
	return (
		<footer>
			<div className="bg-[#663300]">
				<div className=" w-[95%] md:w-[85%] mx-auto pt-[2.5rem] pb-[2.5rem]">
					<div className="md:block hidden">
						<div className="flex justify-between items-top gap-6 text-white">
							<div>
								<h2 className="text-lg font-medium text-white mb-2">hello@afruna.com</h2>
								<div className="flex items-top">
									<Image
										src={Appstore}
										alt="Afruna Logo"
										className="ml-[-5px] mr-3  cursor-pointer"
									/>
									<Image src={Playstore} alt="Afruna Logo" className="cursor-pointer" />
								</div>

								<div className="flex items-center mt-[5rem] gap-10">
									<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
										<Image src={InstagramLogo} alt="instagram" className="w-[24px]" />{' '}
									</div>
									<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
										<Image src={TelegramLogo} alt="telegram" className="w-[24px]" />{' '}
									</div>
									<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
										<Image src={LinkedinLogo} alt="linkedIn" className="w-[24px]" />{' '}
									</div>
									<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
										<Image src={TwitterLogo} alt="twitter" className="w-[24px]" />{' '}
									</div>
								</div>
							</div>
							<div>
								<h6 className="font-bold text-base">Product</h6>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={token ? '/user/orders' : '/auth/sign-in'} className="mt-1">
										My Account
									</Link>
									<Link href={''} className="pt-[1.5rem]">
										Find Store
									</Link>
									<Link href={''} className="pt-[1.5rem]">
										Sell on Afruna
									</Link>
									<Link href={token ? '/user/orders' : '/auth/sign-in'} className="mt-[1.5rem]">
										My Orders
									</Link>
								</div>
							</div>
							<div>
								<h1 className="font-bold text-base">Legal</h1>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={'/terms-of-use'} className="my-1">
										Terms of use
									</Link>
									<Link href={'/privacy-policy'} className="mt-[1.5rem]">
										Privacy Policy
									</Link>
									<Link href={'/refund-policy'} className="mt-[1.5rem]">
										Refund Policy
									</Link>
									<Link href={'/shipping'} className="mt-[1.5rem]">
										Shipping
									</Link>
									<Link href={'/faqs'} className="mt-[1.5rem]">
										FAQs
									</Link>
								</div>
							</div>
							<div className="">
								<h1 className="font-bold text-base">Company</h1>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={''} className="my-1">
										About us
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Blog
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Career
									</Link>
								</div>
							</div>
							<div className="">
								<h1 className="font-bold text-base">Support</h1>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={''} className="my-1">
										Give us feedback
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Help center
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Live chat
									</Link>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-center mt-[2rem]">
							<Link href="/" className="block">
								<Image
									src={`/images/white-logo.png`}
									width={160}
									height={100}
									priority
									quality={100}
									alt="logo"
								/>
							</Link>
							<div className="p-3 text-white font-normal text-sm">
								<span>&copy; {new Date().getFullYear()} </span>
								<span>Afruna Global Company | All Rights Reserved.</span>
							</div>
						</div>
					</div>

					<div className="md:hidden block mx-[1rem]">
						<Image src={Logo} alt="logo" />
						<div className="mt-7">
							<h2 className="text-lg font-bold text-white mb-2">hello@afruna.com</h2>
							<div className="flex items-center gap-2 flex-wrap">
								<Image src={Appstore} alt="Afruna Logo" className="cursor-pointer" />
								<Image src={Playstore} alt="Afruna Logo" className="cursor-pointer" />
							</div>
						</div>
						<div className="flex items-center mt-5 gap-10">
							<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
								<Image src={InstagramLogo} alt="instagram" className="w-[24px]" />{' '}
							</div>
							<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
								<Image src={TelegramLogo} alt="telegram" className="w-[24px]" />{' '}
							</div>
							<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
								<Image src={LinkedinLogo} alt="linkedIn" className="w-[24px]" />{' '}
							</div>
							<div className="flex justify-center items-center w-[55px] h-[55px] bg-white bg-opacity-10 rounded-full cursor-pointer">
								<Image src={TwitterLogo} alt="twitter" className="w-[24px]" />{' '}
							</div>
						</div>
						<div className="flex items-start flex-wrap text-white mt-10">
							<div className="w-[70%]">
								<h1 className="font-bold text-base">Product</h1>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={token ? '/user/orders' : '/auth/sign-in'} className="mt-1">
										My Account
									</Link>
									<Link href={''} className="pt-[1.5rem]">
										Find Store
									</Link>
									<Link href={''} className="pt-[1.5rem]">
										Sell on Afruna
									</Link>
									<Link href={token ? '/user/orders' : '/auth/sign-in'} className="mt-[1.5rem]">
										My Orders
									</Link>
								</div>
							</div>
							<div className="w-[30%]">
								<h1 className="font-bold text-base">Legal</h1>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={''} className="my-1">
										Terms of use
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Privacy Policy
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Refund Policy
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Shipping
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										FAQs
									</Link>
								</div>
							</div>
						</div>
						<div className="flex justify-between items-start flex-wrap text-white mt-10">
							<div className="">
								<h1 className="font-bold text-base">Company</h1>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={''} className="my-1">
										About us
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Contact us
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Blog
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Career
									</Link>
								</div>
							</div>
							<div className="w-[30%]">
								<h1 className="font-bold text-base">Support</h1>
								<div className="flex flex-col text-sm font-normal mt-3">
									<Link href={''} className="my-1">
										Give us feedback
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Help center
									</Link>
									<Link href={''} className="mt-[1.5rem]">
										Live chat
									</Link>
								</div>
							</div>
						</div>
						<div className="py-3 text-white font-normal text-sm mt-5">
							<span>&copy; {new Date().getFullYear()} </span>
							<span>Afruna Global Company | All Rights Reserved.</span>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
