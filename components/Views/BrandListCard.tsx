import { FC } from 'react';
import * as Checkbox from '@radix-ui/react-checkbox';
// import { CheckIcon } from "@radix-ui/react-icons";

interface BrandListCardProps {
	name: string;
}

export const BrandListCard: FC<BrandListCardProps> = ({ name }) => {
	return (
		<div className="flex items-center gap-2">
			<Checkbox.Root
				className={`flex h-[16px] w-[16px] border border-afruna-blue appearance-none items-center justify-center rounded-[4px]  outline-none `}
				id="c1"
			>
				<Checkbox.Indicator className="bg-transparent">
					{/* <CheckIcon
            className='text-transparent'
          /> */}
				</Checkbox.Indicator>
			</Checkbox.Root>
			<label className="text-[#0C0E3B] text-[0.77rem] leading-none" htmlFor="c1">
				{name}
			</label>
		</div>
	);
};
