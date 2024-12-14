import { FC, useState } from 'react';
import classnames from 'classnames';
import * as Select from '@radix-ui/react-select';
import { IItemPicker } from '../interfaces/item-picker.interface';
import Link from 'next/link';
import { ArrowDown2 } from 'iconsax-react';

export const ItemPicker: FC<IItemPicker> = ({
	extraComponent,
	contentClassName,
	getSelected,
	items,
	placeholder,
	triggerClassName,
	leftTriggerIcon,
	mobileView,
	profileLinks,
	icon_position,
	color,
}) => {
	const [isOpen, setIsOpen] = useState(false);
	return (
		<Select.Root onValueChange={getSelected} onOpenChange={setIsOpen}>
			<Select.Trigger
				className={classnames(
					'p-1 font-bold border-none placeholder:text-gray-400',
					triggerClassName && triggerClassName,
				)}
			>
				{leftTriggerIcon ? <Select.Icon>{leftTriggerIcon}</Select.Icon> : null}
				{mobileView ? null : (
					<>
						<Select.Value
							className="text-gray-400 placeholder:text-gray-400 hover:border-none focus:border-none"
							placeholder={placeholder ?? 'Select'}
						/>
						<Select.Icon>
							<ArrowDown2
								size="15"
								color="#FF8A65"
								className={`${
									isOpen && 'rotate-180'
								} text-lg transition ease-linear duration-300 font-bold ${
									color ? 'text-afruna-orange' : ''
								}`}
							/>
						</Select.Icon>
					</>
				)}
				{/* <div className="hidden md:flex justify-center items-center gap-1">
          
        </div> */}
			</Select.Trigger>
			<Select.Portal>
				<Select.Content
					position="popper"
					dir="ltr"
					className={classnames(contentClassName && contentClassName)}
				>
					{/* {items &&
            items.map((item, id) => <SelectItem value={item.name} key={id} />)} */}
					{items &&
						items.map((item, id) => (
							<Select.Item
								value={item.title}
								key={id}
								className="flex justify-between items-center py-3 px-2 cursor-pointer hover:border-none focus:border-none"
							>
								<Select.ItemText className="flex justify-between items-center">
									<div className="flex justify-between items-center">
										{icon_position === 'start' && <span className="ml-[0.5rem]">{item.icon}</span>}
										<div>
											<span className="text-[#1D2329] text-[14px] font-500">{item.title}</span>{' '}
											<br />
											<span className="text-[#586283] text-[14px] font-500">
												{item.sub_title}
											</span>{' '}
										</div>
										{icon_position === 'end' && <span className="ml-[0.5rem]">{item.icon}</span>}{' '}
									</div>
								</Select.ItemText>
							</Select.Item>
						))}

					{profileLinks && (
						<div className="flex flex-col gap-1">
							{profileLinks.map(({ name, href, icon }) => (
								<Link
									key={name}
									href={href}
									className={`flex gap-1 justify-start items-center hover:bg-orange-200 text-afruna-blue text-xs font-semibold rounded-md hover:cursor-pointer hover:scale-105 transition ease-in duration-300 w-full mx-auto py-[0.4rem] px-2 max-w-[90%]`}
								>
									<span className="text-base">{icon}</span>
									<span>{name}</span>
								</Link>
							))}
						</div>
					)}
					{extraComponent}
				</Select.Content>
			</Select.Portal>
		</Select.Root>
	);
};
