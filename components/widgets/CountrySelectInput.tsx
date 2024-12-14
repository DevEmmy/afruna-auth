import { countries } from '@/components/constants';
import {
	Avatar,
	Dropdown,
	DropdownTrigger,
	DropdownMenu,
	DropdownItem,
	Button,
} from '@nextui-org/react';
import React from 'react';
import { ArrowDown2 } from 'iconsax-react';

interface Props {
	country_code: any;
	setCountryCode: any;
}

const CountrySelectInput = (props: Props) => {
	const { country_code, setCountryCode } = props;

	const modified_countries = countries.map((country) => {
		return {
			code: country.code,
			value: `+${country.phone}`,
			label: country.label,
		};
	});
	return (
		<div className="flex gap-1 items-center">
			<Dropdown
				classNames={{
					base: 'h-[300px] w-[200px] overflow-scroll', // change arrow background
					content: 'h-[300px] overflow-scroll',
				}}
			>
				<DropdownTrigger>
					<Button
						variant="light"
						startContent={
							<img
								alt={country_code?.label}
								className="w-4 h-4 rounded-full hover:bg-none"
								width={0}
								height={0}
								src={`https://flagcdn.com/w20/${country_code?.code?.toLowerCase()}.png`}
							/>
						}
						endContent={<ArrowDown2 size="15" color="#663300" />}
					>
						{country_code?.value}
					</Button>
				</DropdownTrigger>
				<DropdownMenu aria-label="Static Actions">
					{modified_countries.map((country) => (
						<DropdownItem
							key={country.value}
							onClick={() => setCountryCode(country)}
							startContent={
								<Avatar
									alt="Argentina"
									className="w-6 h-6"
									src={`https://flagcdn.com/w20/${country.code?.toLowerCase()}.png`}
								/>
							}
						>
							{country.label}
						</DropdownItem>
					))}
				</DropdownMenu>
			</Dropdown>
		</div>
	);
};

export default CountrySelectInput;
