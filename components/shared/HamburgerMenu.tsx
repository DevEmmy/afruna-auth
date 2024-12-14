import { Button, Popover, PopoverContent, PopoverTrigger } from '@nextui-org/react';
import { HambergerMenu } from 'iconsax-react';
import React, { Children } from 'react';

type Props = {
	popOverClassName?: string;
	popOverTriggerClassName?: string;
	popOverIcon?: React.ReactNode;
	openPopover: boolean;
	setOpenPopOver: React.Dispatch<React.SetStateAction<boolean>>;
	children: React.ReactNode;
};

const HamburgerMenu = ({
	openPopover,
	setOpenPopOver,
	popOverClassName,
	popOverTriggerClassName,
	popOverIcon,
	children,
}: Props) => {
	return (
		<Popover
			className={`flex md:hidden ${popOverClassName}`}
			isOpen={openPopover}
			onOpenChange={setOpenPopOver}
		>
			<PopoverTrigger
				className={`flex md:hidden hover:brightness-75 items-center gap-3 ${popOverTriggerClassName}`}
			>
				{popOverIcon || <HambergerMenu size={20} color="#1D2329" />}
			</PopoverTrigger>

			<>{children}</>
		</Popover>
	);
};

export default HamburgerMenu;
