import { TTextArea } from '@/components/utils/types/cls';
import { Textarea as Wrapper } from '@nextui-org/react';

export default function Textarea(props: TTextArea): JSX.Element {
	const {
		placeholder,
		value,
		label,
		handleChange,
		errorMessage,
		startDecorator,
		endDecorator,
		required,
		readOnly,
		disabled = false,
		classNames,
		className,
		name,
		id,
		isInvalid,
	} = props;

	return (
		<>
			{/* <label className="text-sm pb-1 text-gray-500">{label}</label> */}
			<Wrapper
				name={name}
				id={id}
				placeholder={placeholder}
				value={value}
				label={label}
				labelPlacement="outside"
				onChange={handleChange}
				className={`bg-white ${className}`}
				radius="none"
				size="lg"
				errorMessage={errorMessage}
				startContent={startDecorator}
				endContent={endDecorator}
				fullWidth
				isRequired={required}
				isReadOnly={readOnly}
				isDisabled={disabled}
				isInvalid={isInvalid}
				classNames={{
					base: 'rounded-md',
					label: 'text-sm pb-3 text-[1D2329] font-normal',
					inputWrapper: [
						'bg-white',
						'!placeholder:text-gray-400',
						'text-gray-400',
						'rounded-sm',
						`border border-solid border-[#F0F2F5] ${isInvalid && 'group-data-[focus=true]:!outline-error-60'} 
          group-data-[focus=true]:!border-transparent group-data-[focus=true]:!ring-offset-0 
          group-data-[hover=true]:!bg-transparent
          group-data-[focus-visible=true]:!ring-0 group-data-[focus=true]:!bg-transparent`,
					],
					...classNames,
				}}
			/>
		</>
	);
}
