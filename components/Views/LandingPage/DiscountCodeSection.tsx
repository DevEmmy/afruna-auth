import React from 'react';

const DiscountCodeSection = () => {
	return (
		<section className="w-[93%] md:w-[90%] mx-auto bg-[#FFE4DF] md:flex justify-center hidden items-center gap-4 py-3 rounded-2xl my-[2rem]">
			<p className="text-sm text-[#000000] font-medium">Super discount for your first purchase</p>
			<p className="bg-[#FFF6F4] rounded-full px-3 text-[#FF6242] text-title-sm py-2">FREE24NGN</p>
			<p className="text-sm font-300 text-[#000000]">Use discount code in the checkout</p>
		</section>
	);
};
export default DiscountCodeSection;
