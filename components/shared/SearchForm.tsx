import { Button } from '@nextui-org/react';
import { SearchNormal1 } from 'iconsax-react';
import React, { ChangeEvent, FormEvent } from 'react';

type Props = {
	search: string;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onSubmit: (event: FormEvent<HTMLFormElement>) => void;
	placeholder?: string;
	buttonLabel?: string;
	formClassName?: string;
	containerClassName?: string;
	inputClassName?: string;
	buttonClassName?: string;
	searchIcon?: React.ReactNode;
	children?: React.ReactNode;
	disabled?: boolean;
	searchClassName?: string;
};
const SearchForm = ({
	search,
	onChange,
	onSubmit,
	placeholder = 'Search for products',
	buttonLabel = 'Search',
	formClassName = '',
	inputClassName = '',
	buttonClassName = '',
	searchIcon,
	children,
	disabled = false,
	searchClassName = '',
	containerClassName,
  }: Props) => {
	const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
	  event.preventDefault(); // Prevents default form submission behavior
	  onSubmit(event); // Calls the passed onSubmit function
	};
  
	return (
	  <div className={`w-full ${containerClassName}`}>
		<form
		  onSubmit={handleSubmit} // Uses the new handleSubmit function
		  className={`flex rounded-full justify-between items-center w-full xl:w-[487px] sm:w-[400px] bg-[#F0F2F5] py-2 px-4 ${formClassName} ${searchClassName}`}
		>
		  {searchIcon ? <>{SearchNormal1}</> : <SearchNormal1 size="20" />}
  
		  <input
			type="text"
			value={search}
			onChange={onChange}
			placeholder={placeholder}
			className={`transition-all hover:scale-105 hover:ml-2 ease-in-out lg:placeholder:text-sm lg:placeholder:text-[#586283] lg:text-[0.8rem] duration-200 w-full outline-none text-xs rounded-l-md lg:p-3 px-5 border-none bg-transparent focus:border-none ${inputClassName}`}
		  />
		  {children || (
			<Button
			  variant="solid"
			  type="submit"
			  disabled={disabled || search === ''}
			  className={`text-white transition-all hover:scale-105 ease-in-out duration-200 flex items-center py-2 md:px-8 lg:px-6 md:px-6 px-5 bg-primary rounded-full font-semibold ${buttonClassName}`}
			>
			  {buttonLabel}
			</Button>
		  )}
		</form>
	  </div>
	);
  };
  

export default SearchForm;
