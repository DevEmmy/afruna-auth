import React from 'react';
import { DeliverySteps } from '@/components/constants';

const DeliverySection = () => {
	return (
		<section className="bg-[#F0F2F5] pb-[2rem]">
			<div className="bg-white flex justify-between items-center md:flex-nowrap flex-wrap rounded-2xl py-[1.5rem] md:px-[3rem] px-4 gap-3 w-[93%] mx-auto">
				{DeliverySteps.map((step, idx) => (
					<div className="flex items-center gap-3 md:mb-0 mb-3" key={idx}>
						<step.image color="#586283" className="md:text-[35px] text-[17.8px] w-8 h-8" />
						<div>
							<h5 className="md:text-base text-[10.39px] font-semibold text-[#1D2329]">
								{step.name}
							</h5>
							<p className="md:text-sm text-[8.9px] text-[#586283]">{step.description}</p>
						</div>
					</div>
				))}
			</div>
		</section>
	);
};

export default DeliverySection;
