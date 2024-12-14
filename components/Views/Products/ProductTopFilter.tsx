import React from 'react';
import { Button, ButtonGroup } from '@nextui-org/react';
import { MdMenu } from 'react-icons/md';
import { PiGridFour } from 'react-icons/pi';

interface Props {
	activeFilter: string;
	setActiveFilter: Function;
	search_name?: any;
}

const ProductTopFilter = (props: Props) => {
	const { activeFilter, setActiveFilter, search_name } = props;
	return (
		<div className="flex justify-between items-center mb-4 pb-4 border-b-2 border-[#F0F2F5] md:mx-0 mx-[2rem]">
			<p className="text-[#586283] text-sm font-normal">All Results:{search_name}</p>
			<ButtonGroup variant="solid">
				<Button
					isIconOnly
					className={`${
						activeFilter === 'grid' ? 'bg-[#FEA000] text-white' : 'bg-white text-[#586283]'
					}`}
					onClick={() => setActiveFilter('grid')}
				>
					<PiGridFour className="text-[20px]" />
				</Button>
				<Button
					isIconOnly
					className={`${
						activeFilter === 'stacked' ? 'bg-[#FEA000] text-white' : 'bg-white text-[#586283]'
					}`}
					onClick={() => setActiveFilter('stacked')}
				>
					<MdMenu className="text-[20px]" />
				</Button>
			</ButtonGroup>
		</div>
	);
};

export default ProductTopFilter;
