import React from 'react';
import { ArrowRight2 } from 'iconsax-react';
import Link from 'next/link';

const EssentialsSection = () => {
	return (
		<section className="w-[93%] md:w-[90%] mx-auto py-5">
			<div className="flex justify-between items-center md:pb-4 relative">
				<h4 className="md:text-2xl text-xl font-bold text-black">Essentials</h4>
				<div className="md:block hidden absolute border-b-2 border-[#FF9E3A] w-[150px] bottom-0"></div>
				<div className="flex justify-between items-center gap-4">
					<Link href="/product" className="flex gap-2 items-center cursor-pointer py-2.5 px-5">
						<p className="text-base text-[#586283] text-normal">See more</p>
						<ArrowRight2 size="10" color="#586283" />
					</Link>
				</div>
			</div>
			{/* <div className="md:grid hidden 2xl:grid-cols-5 xl:grid-cols-5 md:grid-cols-4 grid-cols-2 gap-5 md:mt-[3rem]">
        {EssentialsProducts.map((product: productDetailsProps, idx) => (
          <ProductsCard key={idx} item={product} />
        ))}
      </div>
      <div className="md:hidden grid grid-cols-2 gap-5 md:mt-[3rem] mt-[1.5rem]">
        {EssentialsProducts?.slice(0, 4).map((product: productDetailsProps, idx) => (
          <ProductsCard key={idx} item={product} />
        ))}
      </div> */}
		</section>
	);
};
export default EssentialsSection;
