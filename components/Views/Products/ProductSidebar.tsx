import * as Accordion from '@radix-ui/react-accordion';
import * as Checkbox from '@radix-ui/react-checkbox';
import * as ScrollArea from '@radix-ui/react-scroll-area';
import React, { FC, Ref, forwardRef, useContext, useState } from 'react';
// import { CheckIcon, DividerHorizontalIcon } from "@radix-ui/react-icons";
// import { ChevronDownIcon } from "@radix-ui/react-icons";
import classNames from 'classnames';
import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';

import { brandOptions, priceOptions } from '@/components/constants';
import { setEnabled, setType } from '@/contexts/features/landingpage/landingpage';
import { GetProductsCategories } from '@/lib/dataFetchingFns';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown2 } from 'iconsax-react';
import { useDispatch } from 'react-redux';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ChevronLeft, ChevronsRight } from 'lucide-react';

interface ProductSidebarProps {
	setPrice?: any;
	setCategory?: any;
}

export const ProductSidebar: FC<ProductSidebarProps> = ({ setPrice, setCategory }) => {
	// const { categories } = useSelector((state: RootState) => state.categories);
	const [seeAllCategories, setSeeAllCategories] = useState<boolean>(false);
	const [checked, setChecked] = useState('');
	const dispatch = useDispatch();

	const allCategories = useQuery({
		queryKey: ['all-categories'],
		queryFn: () => GetProductsCategories(),
	});

	const categories = [
		{ name: 'All Categories' },
		{ name: 'Phones & Accessories' },
		{ name: 'Electronics' },
		{ name: 'Smartphones' },
		{ name: 'Modern Tech' },
		{ name: 'Automobile' },
	];
	const lesscategories = categories?.filter((item, index) => {
		return index <= 4;
	});

	const brands = [
		{ name: 'New Balane' },
		{ name: 'Converse' },
		{ name: 'Birkenstock' },
		{ name: 'Adidas' },
		{ name: 'Reebok' },
	];

	const [seeAllBrands, setSeeAllBrands] = useState<boolean>(false);
	const lessBrands = brands.filter((item, index) => {
		return index <= 4;
	});

	const features = [
		{ name: 'Metallic' },
		{ name: 'Pastic cover' },
		{ name: '8GM' },
		{ name: 'Super power' },
		{ name: 'Larger Memory' },
	];
	const conditions = [
		{ name: 'New', value: 'r1' },
		{ name: '>90% New', value: 'r2' },
		{ name: 'Used', value: 'r3' },
		{ name: 'Refurblished', value: 'r4' },
		{ name: 'Brand New', value: 'r5' },
		{ name: 'Old Items', value: 'r6' },
	];
	const [seeAllConditions, setSeeAllConditions] = useState<boolean>(false);
	const lessConditions = conditions.filter((item, index) => {
		return index <= 4;
	});
	const ratingSpec = [{ value: 5 }, { value: 4 }, { value: 3 }, { value: 2 }, { value: 1 }];
	return (
		<>
			<div className="h-[0.5px] xl:mt-3 md:mt-1" />
			<Accordion.Root
				className="hidden md:flex flex-col"
				type="single"
				defaultValue="item-1"
				collapsible
			>
				<AccordionItem value="item-1" className="flex flex-col gap-2">
					<AccordionTrigger
						className={
							'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
						}
					>
						Category
					</AccordionTrigger>

					<AccordionContent className={'w-full flex flex-col border-none'}>
						<div className="flex flex-col gap-2 justify-start items-start">
							{allCategories?.data?.data.map((item, index) => (
								<div key={index} className="border-b border-slate-200 w-full">
									<button
										className="text-sm font-normal capitalize text-[#586283] cursor-pointer duration-300 transition-all py-3"
										onClick={() => {
											dispatch(setType(item?.name));
											dispatch(setEnabled(true));
											setCategory(item?._id);
										}}
									>
										<span>{item.name}</span>
									</button>
								</div>
							))}
						</div>
						<button
							onClick={() => setSeeAllCategories((prev) => !prev)}
							className="text-blue-400 hover:text-orange-400 hover:underline transition-all duration-300 text-sm capitalize cursor-pointer"
						>
							{/* {seeAllCategories ? "See less" : "See All"} */}
						</button>
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-2" className="flex flex-col gap-2">
					<AccordionTrigger
						className={
							'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
						}
					>
						Price
					</AccordionTrigger>

					<AccordionContent className={'w-full flex flex-col'}>
						<div>
							{priceOptions.map((item, index) => (
								<div className="flex items-center gap-2 py-2" key={index}>
									<div>
										{checked === item?.label ? (
											<MdCheckBox
												size={'15px'}
												color="#FEA000"
												className="cursor-pointer rounded"
												id="c1"
												onClick={() => {
													dispatch(setEnabled(false));
													setChecked('');
												}}
											/>
										) : (
											<MdCheckBoxOutlineBlank
												size={'15px'}
												color="#586283"
												onClick={() => {
													setEnabled(true);
													setPrice(item?.value);
													setChecked(item?.label);
												}}
												className="cursor-pointer"
											/>
										)}
									</div>
									<p className="text-[#586283] text-sm font-normal">{item.label}</p>
								</div>
							))}
							<div className="flex flex-row items-center">
								<input
									placeholder="min"
									className="border border-[#eae7e7] p-2 outline-none w-full"
								/>
								<input
									placeholder="max"
									className="border border-[#eeebeb] p-2 outline-none w-full"
								/>
								{/* <button className="bg-[#FEA000] text-white py-2 px-6 rounded-full">
                  Apply
                </button>
                <button className="bg-[#FEA000] text-white py-2 px-6 rounded-full">
                  Apply
                </button> */}
							</div>
						</div>
					</AccordionContent>
				</AccordionItem>

				<AccordionItem value="item-3" className="flex flex-col gap-2">
					<AccordionTrigger
						className={
							'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
						}
					>
						Brand
					</AccordionTrigger>

					<AccordionContent className={'w-full flex flex-col'}>
						{brandOptions.map((item, index) => (
							<div className="flex items-center gap-2 py-2" key={index}>
								<div>
									{checked === item?.label ? (
										<MdCheckBox
											size={'15px'}
											color="#FEA000"
											className="cursor-pointer rounded"
											id="c1"
											onClick={() => {
												setChecked('');
											}}
										/>
									) : (
										<MdCheckBoxOutlineBlank
											size={'15px'}
											color="#586283"
											onClick={() => {
												setChecked(item?.label);
											}}
											className="cursor-pointer"
										/>
									)}
								</div>
								<p className="text-[#586283] text-sm font-normal">{item.label}</p>
							</div>
						))}
					</AccordionContent>
				</AccordionItem>
				<AccordionItem value="item-6" className="flex flex-col gap-2">
					<AccordionTrigger
						className={
							'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
						}
					>
						Customer Review
					</AccordionTrigger>

					<AccordionContent className={'w-full flex flex-col'}>
						<div className="flex flex-col gap-2 mb-2 mt-1">
							{ratingSpec.map(({ value }, index) => {
								return (
									<div key={index} className="flex items-center gap-2">
										<Checkbox.Root
											className={`flex h-[16px] w-[16px] border border-afruna-blue appearance-none items-center justify-center rounded-[4px]  outline-none `}
											id="c1"
										>
											<Checkbox.Indicator className="bg-transparent">
												{/* <CheckIcon
                              className={`${
                                ratingValue > 0
                                  ? "text-white"
                                  : "text-transparent"
                              }`}
                            /> */}
											</Checkbox.Indicator>
										</Checkbox.Root>
										<div className="flex justify-center items-center gap-1 ">
											{Array(5)
												.fill('_')
												.map((star, index) => (
													<div
														className={`${
															index < value ? 'text-[#FF9E3A]' : 'text-slate-400'
														}  text-sm md:text-xs my-2`}
														key={index}
													>
														{index < value ? (
															index === Math.floor(value) && value % 1 !== 0 ? (
																<BsStarHalf />
															) : (
																<BsStarFill />
															)
														) : (
															<BsStar />
														)}
													</div>
												))}
										</div>
									</div>
								);
							})}
						</div>
					</AccordionContent>
				</AccordionItem>
			</Accordion.Root>

			<Popover>
				<PopoverTrigger asChild className="sm:hidden">
					<ChevronsRight className="text-[#959595] text-sm mt-15" />
				</PopoverTrigger>
				<PopoverContent className="bg-white rounded-lg shadow custom-input max-h-72 overflow-y-scroll no-scrollbar">
					<Accordion.Root className="flex-col" type="single" defaultValue="item-1" collapsible>
						<AccordionItem value="item-1" className="flex flex-col gap-2">
							<AccordionTrigger
								className={
									'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
								}
							>
								Category
							</AccordionTrigger>

							<AccordionContent className={'w-full flex flex-col border-none'}>
								<div className="flex flex-col gap-2 justify-start items-start">
									{allCategories?.data?.data.map((item, index) => (
										<div key={index} className="border-b border-slate-200 w-full">
											<button
												className="text-sm font-normal capitalize text-[#586283] cursor-pointer duration-300 transition-all py-3"
												onClick={() => {
													dispatch(setType(item?.name));
													dispatch(setEnabled(true));
													setCategory(item?._id);
												}}
											>
												<span>{item.name}</span>
											</button>
										</div>
									))}
								</div>
								<button
									onClick={() => setSeeAllCategories((prev) => !prev)}
									className="text-blue-400 hover:text-orange-400 hover:underline transition-all duration-300 text-sm capitalize cursor-pointer"
								>
									{/* {seeAllCategories ? "See less" : "See All"} */}
								</button>
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-2" className="flex flex-col gap-2">
							<AccordionTrigger
								className={
									'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
								}
							>
								Price
							</AccordionTrigger>

							<AccordionContent className={'w-full flex flex-col'}>
								<div>
									{priceOptions.map((item, index) => (
										<div className="flex items-center gap-2 py-2" key={index}>
											<div>
												{checked === item?.label ? (
													<MdCheckBox
														size={'15px'}
														color="#FEA000"
														className="cursor-pointer rounded"
														id="c1"
														onClick={() => {
															dispatch(setEnabled(false));
															setChecked('');
														}}
													/>
												) : (
													<MdCheckBoxOutlineBlank
														size={'15px'}
														color="#586283"
														onClick={() => {
															setEnabled(true);
															setPrice(item?.value);
															setChecked(item?.label);
														}}
														className="cursor-pointer"
													/>
												)}
											</div>
											<p className="text-[#586283] text-sm font-normal">{item.label}</p>
										</div>
									))}
									<div className="flex flex-row items-center">
										<input
											placeholder="min"
											className="border border-[#eae7e7] p-2 outline-none w-full"
										/>
										<input
											placeholder="max"
											className="border border-[#eeebeb] p-2 outline-none w-full"
										/>
										{/* <button className="bg-[#FEA000] text-white py-2 px-6 rounded-full">
                  Apply
                </button>
                <button className="bg-[#FEA000] text-white py-2 px-6 rounded-full">
                  Apply
                </button> */}
									</div>
								</div>
							</AccordionContent>
						</AccordionItem>

						<AccordionItem value="item-3" className="flex flex-col gap-2">
							<AccordionTrigger
								className={
									'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
								}
							>
								Brand
							</AccordionTrigger>

							<AccordionContent className={'w-full flex flex-col'}>
								{brandOptions.map((item, index) => (
									<div className="flex items-center gap-2 py-2" key={index}>
										<div>
											{checked === item?.label ? (
												<MdCheckBox
													size={'15px'}
													color="#FEA000"
													className="cursor-pointer rounded"
													id="c1"
													onClick={() => {
														setChecked('');
													}}
												/>
											) : (
												<MdCheckBoxOutlineBlank
													size={'15px'}
													color="#586283"
													onClick={() => {
														setChecked(item?.label);
													}}
													className="cursor-pointer"
												/>
											)}
										</div>
										<p className="text-[#586283] text-sm font-normal">{item.label}</p>
									</div>
								))}
							</AccordionContent>
						</AccordionItem>
						<AccordionItem value="item-6" className="flex flex-col gap-2">
							<AccordionTrigger
								className={
									'flex text-black font-semibold pt-3 justify-between items-center w-full pr-2 text-base'
								}
							>
								Customer Review
							</AccordionTrigger>

							<AccordionContent className={'w-full flex flex-col'}>
								<div className="flex flex-col gap-2 mb-2 mt-1">
									{ratingSpec.map(({ value }, index) => {
										return (
											<div key={index} className="flex items-center gap-2">
												<Checkbox.Root
													className={`flex h-[16px] w-[16px] border border-afruna-blue appearance-none items-center justify-center rounded-[4px]  outline-none `}
													id="c1"
												>
													<Checkbox.Indicator className="bg-transparent">
														{/* <CheckIcon
                              className={`${
                                ratingValue > 0
                                  ? "text-white"
                                  : "text-transparent"
                              }`}
                            /> */}
													</Checkbox.Indicator>
												</Checkbox.Root>
												<div className="flex justify-center items-center gap-1 ">
													{Array(5)
														.fill('_')
														.map((star, index) => (
															<div
																className={`${
																	index < value ? 'text-[#FF9E3A]' : 'text-slate-400'
																}  text-sm md:text-xs my-2`}
																key={index}
															>
																{index < value ? (
																	index === Math.floor(value) && value % 1 !== 0 ? (
																		<BsStarHalf />
																	) : (
																		<BsStarFill />
																	)
																) : (
																	<BsStar />
																)}
															</div>
														))}
												</div>
											</div>
										);
									})}
								</div>
							</AccordionContent>
						</AccordionItem>
					</Accordion.Root>
				</PopoverContent>
			</Popover>
			{/* </div> */}
		</>
	);
};

export const AccordionItem = forwardRef(
	(props: Accordion.AccordionItemProps, forwardedRef: Ref<HTMLDivElement>) => (
		//  focus-within:shadow-[0_0_0_2px]
		<Accordion.Item
			className={classNames(
				'overflow-hidden first:mt-0 focus-within:relative focus-within:z-10',
				props.className,
			)}
			{...props}
			ref={forwardedRef}
		>
			{props.children}
		</Accordion.Item>
	),
);
AccordionItem.displayName = 'MyComponent';

const AccordionTrigger = forwardRef(
	(props: Accordion.AccordionTriggerProps, forwardedRef: Ref<HTMLButtonElement>) => (
		<Accordion.Header className="w-full">
			<Accordion.Trigger
				className={classNames(
					'group cursor-pointer flex  leading-none outline-none grow',
					props.className,
				)}
				{...props}
				ref={forwardedRef}
			>
				{props.children}
				<ArrowDown2 size="12" aria-hidden />
			</Accordion.Trigger>
		</Accordion.Header>
	),
);
AccordionTrigger.displayName = 'AccordionTrigger';

export const AccordionContent = forwardRef(
	(props: Accordion.AccordionContentProps, forwardedRef: Ref<HTMLDivElement>) => (
		<Accordion.Content
			className={classNames(
				'data-[state=open]:animate-slideDown data-[state=closed]:animate-slideUp overflow-hidden',
				props.className,
			)}
			{...props}
			ref={forwardedRef}
		>
			<div className="">{props.children}</div>
		</Accordion.Content>
	),
);
AccordionContent.displayName = 'AccordionContent';
