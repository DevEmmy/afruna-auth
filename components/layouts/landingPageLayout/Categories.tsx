import { setCategoryId } from '@/contexts/features/landingpage/landingpage';
import { GetProductsCategories } from '@/lib/dataFetchingFns';
import { Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { ArrowDown2, ArrowUp2, HambergerMenu } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useDispatch } from 'react-redux';
import SubCategories from './SubCategory';

const Categories = () => {
	const [isOpen, setIsOpen] = React.useState(false);
	const Router = useRouter();
	const dispatch = useDispatch();

	const allCategories = useQuery({
		queryKey: ['all-categories'],
		queryFn: () => GetProductsCategories(),
	});
	return (
		<div className="md:flex hidden items-center p-0">
			<div className="bg-[#663300] flex items-center py-5 px-3.5 w-[28%] ">
				<div className="flex flex-row items-center justify-between w-full shop-class">
					<div className="flex flex-row items-center gap-x-2 w-full">
						<HambergerMenu size="15.11" color="#FFFFFF" />
						<p className="text-white  text-sm font-medium shop-class-hover">
							Shop By Department
						</p>
					</div>
					<ArrowDown2 size="16" variant="Linear" color="#FFFFFF" className="arrow_down" />
					<ArrowUp2 size="16" variant="Linear" color="#FFFFFF" className="arrow_up" />
					<section className="menu-class shadow-md pb-5">
						{allCategories?.data?.data.map((menu, index) => (
							<div
								key={index}
								onClick={() => {
									dispatch(setCategoryId(menu._id));
									Router.push(`/category/${menu.name}`);
								}}
								className="flex justify-between items-center py-[1rem] cursor-pointer hover:bg-[#FEA000] hover:bg-opacity-10 px-[2rem]"
							>
								<div className="flex items-center gap-5">
									{/* <menu.icon size="13" /> */}
									<p className="text-sm font-normal text-black">{menu.name}</p>
								</div>
							</div>
						))}
					</section>
				</div>
			</div>
			<div className="bg-[#FEA000] flex justify-between items-center py-5 px-[1.5rem] gap-2 w-full rounded-br-2xl">
				<p className="text-white text-sm font-medium">Clearance Sales</p>
				<p className="text-white text-sm font-medium">Special Offers</p>
				<p className="text-white text-sm font-medium">Made in Africa</p>
				<p className="text-white text-sm font-medium">Afruna Fashion</p>
				<p className="text-white text-sm ffont-medium ">Home & Kitchen</p>

				<Popover
					isOpen={isOpen}
					onOpenChange={(open) => setIsOpen(open)}
					placement="bottom-end"
					radius="none"
					className="py-5"
				>
					<PopoverTrigger className=" flex hover:brightness-75 items-center gap-3">
						<div className="flex items-center gap-2 ">
							<p className="text-white text-sm font-medium ">Other Categories</p>
							<ArrowDown2
								size="16"
								variant="Linear"
								color="#FFFFFF"
								className={`${isOpen && 'rotate-180'} 
                cursor-pointer`}
							/>
						</div>
					</PopoverTrigger>

				<PopoverContent className="mt-4 2xl:w-[84vw] xl:w-[87vw] md:w-[100vw] border-transparent bg-[#FFFFFF] xl:px-[4rem] md:px-[2rem] z-10 rounded-b-3xl shadow-lg">
						<div className=" flex items-start gap-5 w-full pb-5">
							{allCategories?.data?.data?.slice(0, 5)?.map((category) => {
								return (
									<div className="w-full" key={category?._id}>
										<h6 className="text-black text-lg font-medium py-2.5">{category?.name}</h6>
										<SubCategories category={category?._id} />
									</div>
								);
							})}
				<div className="w-full">
                <h6 className="text-black text-lg font-medium py-2.5">
                  Traditional Clothing
                </h6>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  African Dashikis
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  African Kaftans
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  African Agbadas
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  African Boubous
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Gele Headwraps
                </p>
              </div>{" "}
				<div className="w-full">
                <h6 className="text-black text-lg font-medium py-2.5">
                  Clothing & Accessories
                </h6>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  T-Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Casual Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Formal Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Sweat Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Sweaters
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Jackets
                </p>
              </div>{" "}
              <div className="w-full">
                <h6 className="text-black text-lg font-medium py-2.5">
                  Kids and Babies
                </h6>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  T-Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Casual Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Formal Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Sweat Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Sweaters
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Jackets
                </p>
              </div>{" "}
              <div className="w-full">
                <h6 className="text-black text-lg font-medium py-2.5">
                  Home Decor
                </h6>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  T-Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Casual Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Formal Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Sweat Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Sweaters
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Jackets
                </p>
              </div>
              <div className="w-full">
                <h6 className="text-black text-lg font-medium py-2.5">
                  Beauty & Personal Care
                </h6>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  T-Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Casual Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Formal Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Sweat Shirts
                </p>
                <p className="text-[#586283] text-sm font-normal  py-2.5">
                  Sweaters
                </p>
                <p className="text-[#586283] text-sm font-normal py-2.5">
                  Jackets
                </p>
              </div>
				</div>
					</PopoverContent>
				</Popover>
			</div>
		</div>
	);
};
export default Categories;
