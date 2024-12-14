'use client';
import CartModal from '@/components/modals/CartDrawerr';
import WishListModal from '@/components/modals/WishListModal';
import MobileHeaderPopover from '@/components/pop-over/MobileHeaderPopover';
import HamburgerMenu from '@/components/shared/HamburgerMenu';
import SearchForm from '@/components/shared/SearchForm';
import { useToast } from '@/components/ui/use-toast';
import { setConvert } from '@/contexts/features/currency/currencySlice';
import {
	getCartItemData,
	getWishlistItemData,
	setCategoryId,
	setEnabled,
	setType,
} from '@/contexts/features/landingpage/landingpage';
import { GetAllProducts, GetCart, GetProductsCategories, GetWishlist } from '@/lib/dataFetchingFns';
import { ClearToCart } from '@/lib/dataMutationFns';
import { useAppSelector } from '@/lib/hooks.';
import { getUserToken } from '@/lib/utils';
import Logo from '@/public/icons/afruna_orange.svg';
import avatar from '@/public/icons/Avata.svg';
import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import {
	ArrowDown2,
	BagCross,
	CallCalling,
	CloseCircle,
	DiscountShape,
	HambergerMenu,
	Heart,
	MessageQuestion,
	Profile,
	SearchNormal1,
	Shop,
	Tag,
} from 'iconsax-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { CurrencyDisplay } from 'utils/handlePrices';
import Categories from './Categories';
import { productDetailsProps } from '@/lib/types';
import { ChevronDown } from 'lucide-react';
import { logoutAction } from '@/contexts/features/authentication/authenticationSlice';
import { logoutAction_ } from '@/contexts/features/landingpage/landingpage';
import { logout } from '@/lib/utils';

const Header = ({
	searchClassName,
	headerContainerClassName,
	fullScreen = true,
}: {
	searchClassName?: string;
	fullScreen?: boolean;
	headerContainerClassName?: string;
}) => {
	const [openCart, setOpenCart] = useState<boolean>(false);
	const [openWishList, setOpenWishList] = useState<boolean>(false);
	const [openPopover, setOpenPopOver] = useState(false);
	const [country_code, setCountryCode] = useState('ng');
	const [isOpen, setIsOpen] = React.useState(false);
	const [isLanguageOpen, setIsLanguageOpen] = React.useState(false);
	const [isHelp, setIsHelp] = React.useState(false);
	const [currency, setCurrency] = React.useState('');
	const [country, setCountry] = useState('ng');
	const [search, setSearch] = useState('');
	const [openSearch, setOpenSearch] = useState(false);

	// next router
	const Router = useRouter();
	const pathname = usePathname();
	const dispatch = useDispatch();
	const userData = useAppSelector((state) => state.authentication?.userData);
	const { cartItems, wishlistItems } = useAppSelector(
		(state) => state.landingpage || { cartItems: {}, wishlistItems: {} },
	);
	// react query
	const queryClient = useQueryClient();

	const token = getUserToken();

	// Toast notifcation
	const { toast } = useToast();

	// const { data: parallelData } = useQuery({
	// 	queryKey: ['parallel'],
	// 	queryFn: async () => {
	// 		const [cart, wishlist, categories, products] = await Promise.all([GetCart(), GetWishlist(), GetProductsCategories(), GetAllProducts()]);
	// 		return { cart, wishlist, categories, products };
	// 	},
	// });

	// WQery
	const getCart = useQuery({
		queryKey: ['get-cart'],
		queryFn: () => GetCart(),
	});

	const getWishlist = useQuery({
		queryKey: ['get-wishlist'],
		queryFn: () => GetWishlist(),
	});

	const allCategories = useQuery({
		queryKey: ['all-categories'],
		queryFn: () => GetProductsCategories(),
	});

	const allPrducts = useQuery({
		queryKey: ['all-productss'],
		queryFn: () => GetAllProducts(),
	});

	// UseEffects
	useEffect(() => {
		if (!getCart?.data?.data) return;

		dispatch(getCartItemData(getCart?.data?.data));
	}, [getCart?.data?.data, dispatch]);

	useEffect(() => {
		if (!getWishlist?.data?.data) return;

		dispatch(getWishlistItemData(getWishlist?.data?.data));
	}, [getWishlist?.data?.data, dispatch]);

	const handleOpenCart = () => {
		setOpenCart(true);
	};

	const handleCloseCart = () => {
		setOpenCart(false);
	};

	const handleOpenWishList = () => {
		setIsHelp(false);
		setOpenWishList(true);
	};
	const handleCloseWishList = () => {
		setOpenWishList(false);
	};

	const sub_total = cartItems?.items?.reduce((accumulator: any, value: any) => {
		return accumulator + value?.total;
	}, 0);

	const numberFormat = (value: number) =>
		new Intl.NumberFormat('en-US', {
			style: 'currency',
			currency: 'NGN',
		})
			.format(value)
			.replace('NGN', '₦')
			.trim();

	const handleSearch = (event: any) => {
		event.preventDefault();
		dispatch(setType(search));
		Router.push(`/search?search=${search}`);
	};

	const clearCartMutation = useMutation({
		mutationFn: ClearToCart,
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

	async function ClearCart() {
		clearCartMutation.mutate();
	}

	// useEffect(() => {
	//   if (!token && pathname === "/delivery-details") {
	//     Router.push("/");
	//   }
	// }, [token, pathname]);

	const filteredroducts = allCategories?.data?.data.filter((product: { name: string }) =>
		product?.name?.toLowerCase()?.includes(search?.toLowerCase()),
	);

	const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
		setSearch(event.target.value);
		setOpenSearch(true);
	};

	const handleSearchSubmit = () => {
		dispatch(setType(search));
		Router.push(`/search?search=${encodeURIComponent(search)}`);
		setOpenSearch(false);
	};

	const handleClickItem = (item: productDetailsProps) => {
		setSearch(item.name);
		dispatch(setType(item.name));
		Router.push(`/search?search=${item.name}`);
		setOpenSearch(false);
	};

	const handleLogout = () => {
		logout();
		dispatch(logoutAction());
		dispatch(logoutAction_());
		Router.push('/');
	};

	return (
		<div className={`${fullScreen ? 'w-full bg-white ' : 'bg-[#F0F2F5]'} `}>
			<div
				className={` flex flex-col md:bg-white w-[93%] mx-auto rounded-t-2xl rounded-br-2xl ${headerContainerClassName} ${fullScreen ? 'w-full' : ''}`}
			>
				<div className="md:flex hidden border-b border-neutral-60 md:w-[95%] md:mx-auto">
					<nav className="container flex justify-between items-center gap-4 py-5 z-0">
						<button className={'flex gap-2 font-bold items-center'}>
							<Tag size="20" color="#EF8D1B" />
							<span className="text-neutral-40 text-sm font-normal">Sell on Afruna</span>{' '}
						</button>
						<div className="flex items-center gap-10">
							<button className={'flex gap-2 font-bold items-center'}>
								<Link href="/track-order">
									<span className="text-neutral-40  text-sm font-normal">Track your order</span>{' '}
								</Link>
							</button>
							<button className={'flex gap-2 font-bold items-center'}>
								<Link href="/support-center">
									<span className="text-neutral-40  text-sm font-normal">Support Center</span>{' '}
								</Link>
							</button>
							<Popover isOpen={isOpen} onOpenChange={(open) => setIsOpen(open)}>
								<PopoverTrigger className='className="flex hover:brightness-75" items-center gap-3'>
									<div className="flex items-center gap-2">
										<p className="text-[#586283] text-sm font-normal">Currency</p>
										<p className="text-[#586283] text-sm font-normal">{currency}</p>
										<img
											alt={'country Flag'}
											className="w-4 h-4 rounded-full hover:bg-none"
											width={0}
											height={0}
											src={`https://flagcdn.com/w20/${country}.png`}
										/>
										<ArrowDown2
											size="15"
											color="#FF8A65"
											className={`${
												isOpen && 'rotate-180'
											} text-lg transition ease-linear duration-300 font-bold text-afruna-orange cursor-pointer
                }`}
										/>
									</div>
								</PopoverTrigger>

								<PopoverContent className="mt-1 w-[150px] max-h-[200px] overflow-auto border-transparent bg-[#FFFFFF] py-2 z-10 rounded-[10px] px-2">
									<div
										className="text-small flex gap-2 items-center my-2 cursor-pointer w-full hover:bg-[#FEA000] hover:bg-opacity-10 px-2 py-1"
										onClick={() => {
											setCurrency('USD');
											setCountry('us');
											setIsOpen(false);
											dispatch(setConvert(true));
										}}
									>
										<p className="text-[#586283] text-sm font-normal text-left">USD</p>
										<img
											alt={'country Flag'}
											className="w-4 h-4 rounded-full hover:bg-none"
											width={0}
											height={0}
											src={`https://flagcdn.com/w20/us.png`}
										/>
									</div>
									<div
										className="text-small flex gap-2 items-center my-2 cursor-pointer w-full hover:bg-[#FEA000] hover:bg-opacity-10  px-2 py-1"
										onClick={() => {
											setCurrency('NGN');
											setCountry('ng');
											setIsOpen(false);
											dispatch(setConvert(false));
										}}
									>
										<p className="text-[#586283] text-sm font-normal text-left">NGN</p>
										<img
											alt={'country Flag'}
											className="w-4 h-4 rounded-full hover:bg-none"
											width={0}
											height={0}
											src={`https://flagcdn.com/w20/ng.png`}
										/>
									</div>
								</PopoverContent>
							</Popover>

							<Popover isOpen={isLanguageOpen} onOpenChange={(open) => setIsLanguageOpen(open)}>
								<PopoverTrigger className='className="flex hover:brightness-75" items-center gap-3'>
									<div className="flex items-center gap-2">
										<p className="text-[#586283] text-sm font-normal">Language</p>
										<ArrowDown2
											size="15"
											color="#FF8A65"
											className={`${
												isLanguageOpen && 'rotate-180'
											} text-lg transition ease-linear duration-300 font-bold text-afruna-orange cursor-pointer
                }`}
										/>
									</div>
								</PopoverTrigger>

								<PopoverContent className="w-[120px] max-h-[250px] overflow-scroll border-transparent bg-[#FFFFFF] py-2 z-10 rounded-[10px] px-0">
									<div
										className="text-small flex gap-2 items-center my-1 cursor-pointer w-full hover:bg-[#FEA000] hover:bg-opacity-10 px-2 py-1"
										onClick={() => {
											setCountryCode('en');
											setIsLanguageOpen(false);
										}}
									>
										<p className="text-[#586283] text-sm font-normal text-left">English</p>
									</div>
									<div
										className="text-small flex gap-2 items-center my-1 cursor-pointer w-full hover:bg-[#FEA000] hover:bg-opacity-10 px-2 py-1"
										onClick={() => {
											setCountryCode('ke');
											setIsLanguageOpen(false);
										}}
									>
										<p className="text-[#586283] text-sm font-normal text-left">Swahili</p>
									</div>
									<div
										className="text-small flex gap-2 items-center my-1 cursor-pointer w-full hover:bg-[#FEA000] hover:bg-opacity-10 px-2 py-1"
										onClick={() => {
											setCountryCode('fr');
											setIsLanguageOpen(false);
										}}
									>
										<p className="text-[#586283] text-sm font-normal text-left">French</p>
									</div>
									<div
										className="text-small flex gap-2 items-center my-1 cursor-pointer w-full hover:bg-[#FEA000] hover:bg-opacity-10 px-2 py-1"
										onClick={() => {
											setCountryCode('ar');
											setIsLanguageOpen(false);
										}}
									>
										<p className="text-[#586283] text-sm font-normal text-left">Arabic</p>
									</div>
									<div
										className="text-small flex gap-2 items-center my-1 cursor-pointer w-full hover:bg-[#FEA000] hover:bg-opacity-10 px-2 py-1"
										onClick={() => {
											setCountryCode('fe');
											setIsLanguageOpen(false);
										}}
									>
										<p className="text-[#586283] text-sm font-normal text-left">Spanish</p>
									</div>
								</PopoverContent>
							</Popover>
						</div>
					</nav>
				</div>
				<section className="flex items-center justify-between py-2 px-3 md:py-3 md:w-[95%] md:mx-auto">
					<HamburgerMenu openPopover={openPopover} setOpenPopOver={setOpenPopOver}>
						<MobileHeaderPopover
							avatar={avatar}
							token={token}
							allCategories={allCategories}
							setCategoryId={setCategoryId}
							setOpenPopOver={setOpenPopOver}
							userData={userData}
							dispatch={dispatch}
						/>
					</HamburgerMenu>

					<div className="relative flex flex-row items-center md:gap-x-5 lg:gap-x-7">
						<Link href="/">
							<Image src={Logo} alt="logo" />
						</Link>
						<Search
							openSearch={openSearch}
							containerClassName="hidden md:flex"
							onChange={(event) => {
								dispatch(setEnabled(false));
								setSearch(event.target.value);
								setOpenSearch(true);
							}}
							placeholder="Search for products"
							search={search}
							onSubmit={handleSearchSubmit}
							filteredroducts={filteredroducts}
							setSearch={setSearch}
							setOpenSearch={setOpenSearch}
							clickItem={(item) => {
								setSearch(item.name);
								dispatch(setType(item.name));
								Router.push(`/search?search=${item.name}`);
								setOpenSearch(false);
							}}
						/>
					</div>

					<div className="flex flex-row items-center md:gap-x-3 lg:gap-x-7">
						<div className="hidden md:flex items-center gap-3">
							<Button
								variant="solid"
								isIconOnly
								className="bg-[#FEA000] bg-opacity-10 rounded-full overflow-hidden  h-[45px] w-[45px]"
							>
								<MessageQuestion size="22.5" color="#FEA000" />
							</Button>
							<Popover isOpen={isHelp} onOpenChange={(open) => setIsHelp(open)}>
								<PopoverTrigger className='className="flex hover:brightness-75" items-center gap-3'>
									<div className="flex items-center gap-2">
										<p className="text-[#586283] text-sm font-normal">Help</p>
										<ArrowDown2
											size="15"
											color="#FF8A65"
											className={`${
												isHelp && 'rotate-180'
											} text-lg transition ease-linear duration-300 font-bold text-afruna-orange cursor-pointer
                }`}
										/>
									</div>
								</PopoverTrigger>

								<PopoverContent className="mt-1 w-[180px] h-[250px] overflow-auto border-transparent bg-[#FFFFFF] py-3 z-10 rounded-[10px]">
									<div
										className="text-small flex gap-2 items-center my-2 cursor-pointer w-full"
										onClick={() => setCountryCode('ng')}
									>
										<Button
											variant="solid"
											isIconOnly
											className="bg-[#F0F2F5] rounded-full  h-[40px] w-[40px]"
										>
											<CallCalling size="20" color="#FEA000" />
										</Button>
										<p className="text-[#586283] text-sm font-normal text-left">
											<a href="tel:07064907892">Call To Order</a>
										</p>
									</div>

									<div
										className="text-small flex gap-2 items-center my-2 cursor-pointer w-full"
										onClick={() => setCountryCode('ng')}
									>
										{' '}
										<Button
											variant="solid"
											isIconOnly
											className="bg-[#F0F2F5] rounded-full  h-[40px] w-[40px]"
										>
											<Shop size="20" color="#FEA000" />
										</Button>
										<p className="text-[#586283] text-sm font-normal text-left">Sell on Afruna</p>
									</div>
									<div
										className="text-small flex gap-2 items-center my-2 cursor-pointer w-full"
										onClick={() => setCountryCode('ng')}
									>
										<Button
											variant="solid"
											isIconOnly
											className="bg-[#F0F2F5] rounded-full  h-[40px] w-[40px]"
										>
											<DiscountShape size="20" color="#FEA000" />
										</Button>
										<p className="text-[#586283] text-sm font-normal text-left">Nest Deals</p>
									</div>
									<div
										className="text-small flex gap-2 items-center my-2 cursor-pointer w-full"
										onClick={handleOpenWishList}
									>
										<Button
											variant="solid"
											isIconOnly
											className="bg-[#F0F2F5] rounded-full  h-[40px] w-[40px]"
										>
											<Heart size="20" color="#FEA000" />
										</Button>
										<p className="text-[#586283] text-sm font-normal text-left">Wishlist</p>
									</div>
								</PopoverContent>
							</Popover>
						</div>
						<div className="hidden md:flex items-center gap-3 w-full">
							<Button
								variant="solid"
								isIconOnly
								className="bg-[#FEA000] bg-opacity-10 rounded-full  h-[45px] w-[45px]"
							>
								<Profile size="22.5" color="#FEA000" />
							</Button>
							<div>
								<p className="text-neutral-40  text-sm font-normal">My Account</p>
								{token && userData ? (
									<div className="flex flex-row items-center">
										<h6
											className="text-black text-sm font-medium cursor-pointer"
											onClick={() => Router.push('/user/orders')}
										>
											{userData?.firstName}
										</h6>
										<Popover>
											<PopoverTrigger>
												<ChevronDown className="h-3 w-3" />
											</PopoverTrigger>
											<PopoverContent>
												<div className="flex flex-col">
													<button onClick={handleLogout} className="p-3">
														log out
													</button>
													<button onClick={() => Router.push('/user/wish-lists')} className="p-3">
														wishlist
													</button>
												</div>
											</PopoverContent>
										</Popover>
									</div>
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
						<div className="flex items-center gap-3">
							<div className="relative">
								<Button
									onClick={handleOpenCart}
									variant="solid"
									isIconOnly
									className="bg-[#FEA000] bg-opacity-10 rounded-full h-[40px] w-[40px] md:h-[45px] md:w-[45px]"
								>
									<BagCross size="22.5" color="#FEA000" />
								</Button>
								{cartItems?.items?.length > 0 && (
									<p className="absolute px-[5px] py-[0.5px] bg-[#FF3333] text-white text-[9.4px] rounded-full top-0 right-0">
										{cartItems?.items?.length}
									</p>
								)}
							</div>
							<div className="hidden md:flex flex-col ">
								<p className="text-neutral-40  text-sm font-normal">Total</p>
								<h6 className="text-black text-sm font-medium">
									{sub_total === undefined ? `₦0` : <CurrencyDisplay amount={sub_total} />}
								</h6>
							</div>
						</div>
					</div>
				</section>
				<Search
					openSearch={openSearch}
					containerClassName="md:hidden flex !w-full mt-2"
					onChange={handleSearchChange}
					placeholder="Search for products"
					search={search}
					onSubmit={handleSearchSubmit}
					filteredroducts={filteredroducts}
					setSearch={setSearch}
					setOpenSearch={setOpenSearch}
					searchClassName="bg-white !w-full"
					clickItem={handleClickItem}
				/>
				<Categories />
				<CartModal open={openCart} handleClose={handleCloseCart} />
				<WishListModal open={openWishList} handleClose={handleCloseWishList} />
			</div>
		</div>
	);
};

export default Header;

const Search = ({
	searchClassName = '',
	filteredroducts,
	onChange,
	onSubmit,
	openSearch,
	setOpenSearch,
	setSearch,
	containerClassName,
	placeholder,
	clickItem,
	search,
}: {
	openSearch: boolean;
	searchClassName?: string;
	containerClassName?: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	clickItem: (item: productDetailsProps) => void;
	placeholder?: string;
	search: string;
	onSubmit: () => void;
	filteredroducts: productDetailsProps[] | undefined;
	setSearch: React.Dispatch<React.SetStateAction<string>>;
	setOpenSearch: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
	return (
		<div className={`relative ${containerClassName}`}>
			<SearchForm
				searchClassName={`md:!h-[50px] md:w-60 lg:w-11/12 md:!py-0 ${searchClassName}`}
				placeholder={placeholder}
				onChange={onChange}
				onSubmit={onSubmit}
				search={search}
			/>
			{search.length > 0 && openSearch && (
				<div
					className="absolute top-[100%] bg-white shadow-full w-full rounded min-h-[200px] max-h-[400px] p-3 overflow-y-auto"
					style={{ zIndex: 1000 }}
				>
					{filteredroducts?.map((item) => (
						<p
							key={item._id}
							className="py-1.5 px-3 mb-1 hover:bg-[#F0F2F5] rounded text-[#586283] text-sm font-normal cursor-pointer"
							onClick={() => clickItem(item)}
						>
							{item.name}
						</p>
					))}
				</div>
			)}
		</div>
	);
};
