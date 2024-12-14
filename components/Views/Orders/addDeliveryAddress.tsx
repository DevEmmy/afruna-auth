import { countries } from '@/components/constants';
import { toast } from '@/components/ui/use-toast';
import deliveryInfoSchema from '@/schemas/addressBook.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Checkbox, Select, SelectItem } from '@nextui-org/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RequestServices } from 'utils/requests';
import { z } from 'zod';

export type DeliveryInfoCredentials = z.infer<typeof deliveryInfoSchema>;

interface AddDeliveryAddressProps {
	data: any;
	onClose: () => void;
}

const AddDeliveryAddress = ({ data, onClose }: any) => {
	const queryClient = useQueryClient();
	const searchParams = useSearchParams();
	const isUpdate = searchParams.get('update') === 'true';

	const {
		handleSubmit,
		register,
		formState: { errors },
		control,
		setValue,
	} = useForm<DeliveryInfoCredentials>({
		resolver: zodResolver(deliveryInfoSchema),
		defaultValues: {
			isDefault: false,
		},
	});

	useEffect(() => {
		if (isUpdate && data) {
			setValue('name', data.name);
			setValue('address', data?.address);
			setValue('streetNumber', data?.streetNumber);
			setValue('postCode', data?.postCode);
			setValue('city', data?.city);
			setValue('state', data.state);
			setValue('country', data.country);
			setValue('lga', data?.lga);
			setValue('phoneNumber', data?.phoneNumber);
			setValue('isDefault', data?.isDefault || false);
		}
	}, [isUpdate, data, setValue]);

	const mutation = useMutation({
		mutationFn: (formData: DeliveryInfoCredentials) => {
			if (isUpdate) {
				return RequestServices.updateDeliveryAddress(data._id, formData);
			} else {
				return RequestServices.addDeliveryAddress(formData);
			}
		},
		onSuccess: () => {
			toast({
				title: isUpdate ? 'Address updated successfully' : 'Address added successfully',
				variant: 'success',
			});
			onClose();
			queryClient.invalidateQueries({ queryKey: ['delivery-address'] });
		},
		onError: (err) => {
			console.log(err);
			toast({
				title: isUpdate ? 'Error updating address' : 'Error adding address',
				variant: 'destructive',
			});
			onClose();
		},
	});

	const onSubmit = (formData: DeliveryInfoCredentials) => {
		mutation.mutate(formData);
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="px-2 overflow-scroll no-scrollbar h-full">
			<div className="flex flex-wrap -mx-3">
				<div className="w-full px-3 mt-2">
					<p className="text-sm font-normal text-black mb-3">Full Name</p>
					<input
						{...register('name')}
						placeholder="First Name & Last Name"
						className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
					/>
					<span className="text-[12px] text-[#FF0000]">{errors?.name?.message}</span>
				</div>

				<div className="w-full md:w-1/2 px-3 mt-6">
					<p className="text-sm font-normal text-black mb-3">Street Number</p>
					<input
						{...register('streetNumber')}
						placeholder="Street Number"
						className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
					/>
					<span className="text-[12px] text-[#FF0000]">{errors?.streetNumber?.message}</span>
				</div>

				<div className="w-full md:w-1/2 px-3 mt-6">
					<p className="text-sm font-normal text-black mb-3">Address</p>
					<input
						{...register('address')}
						placeholder="Address"
						className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
					/>
					<span className="text-[12px] text-[#FF0000]">{errors?.address?.message}</span>
				</div>

				<div className="w-full md:w-1/2 px-3 mt-6">
					<p className="text-sm font-normal text-black mb-3">Post Code</p>
					<input
						{...register('postCode')}
						placeholder="Post Code"
						className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
					/>
					<span className="text-[12px] text-[#FF0000]">{errors?.postCode?.message}</span>
				</div>

				<div className="w-full md:w-1/2 px-3 mt-6">
					<p className="text-sm font-normal text-black mb-3">City</p>
					<input
						{...register('city')}
						placeholder="City"
						className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
					/>
					<span className="text-[12px] text-[#FF0000]">{errors?.city?.message}</span>
				</div>

				<div className="w-full md:w-1/2 px-3 mt-6">
					<p className="text-sm font-normal text-black mb-3">State</p>
					<input
						{...register('state')}
						placeholder="State"
						className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
					/>
					<span className="text-[12px] text-[#FF0000]">{errors?.state?.message}</span>
				</div>

				<div className="w-full md:w-1/2 px-3 mt-6">
					<p className="text-sm font-normal text-black mb-3">Country</p>
					<Controller
						name="country"
						control={control}
						render={({ field }) => (
							<Select
								items={countries}
								placeholder="Select a Country"
								labelPlacement="outside"
								{...field}
								classNames={{
									base: 'w-full border border-solid border-gray-200 mb-0 rounded-none bg-transparent shadow-md rounded-lg',
									trigger: 'min-h-12 py-2 bg-transparent rounded-none focus:bg-transparent',
									listbox: 'w-full p-0 bg-transparent',
									listboxWrapper: 'p-0 bg-transparent',
									mainWrapper: 'hover:bg-none',
								}}
								fullWidth
							>
								{(item) => (
									<SelectItem
										key={item.code}
										value={item.label}
										className="!hover:text-gray-400 !rounded-lg !px-3 !py-2 text-gray-400 focus:rounded-lg focus:bg-gray-100 focus:text-gray-400"
									>
										{item.label}
									</SelectItem>
								)}
							</Select>
						)}
					/>
					<span className="text-[12px] text-[#FF0000]">{errors?.country?.message}</span>
				</div>

				<div className="flex w-full px-3 mt-6">
					<div className="w-full md:w-1/2 pr-2">
						<p className="text-sm font-normal text-black mb-3">LGA</p>
						<input
							{...register('lga')}
							placeholder="LGA"
							className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
						/>
						<span className="text-[12px] text-[#FF0000]">{errors?.lga?.message}</span>
					</div>
					<div className="w-full md:w-1/2 pl-2">
						<p className="text-sm font-normal text-black mb-3">Phone Number</p>
						<input
							{...register('phoneNumber')}
							placeholder="Phone Number"
							className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-3 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3 custom-input"
						/>
						<span className="text-[12px] text-[#FF0000]">{errors?.phoneNumber?.message}</span>
					</div>
				</div>

				<div className="flex mt-3 items-center gap-2">
					<Controller
						name="isDefault"
						control={control}
						render={({ field }) => (
							<Checkbox
								{...field}
								className="text-orange-500"
								isSelected={field.value}
								onValueChange={(checked) => field.onChange(checked)}
							>
								Set address as default
							</Checkbox>
						)}
					/>
				</div>
			</div>

			<div className="flex items-center gap-2 my-[2em] justify-end">
				{/* <Button type="button" className="rounded-full bg-white border">
					Cancel
				</Button> */}
				<Button
					type="submit"
					color="primary"
					className="rounded-full"
					isLoading={mutation.isPending}
					disabled={mutation.isPending}
				>
					{mutation.isPending ? 'Saving...' : isUpdate ? 'Update Address' : 'Save Address'}
				</Button>
			</div>
		</form>
	);
};

export default AddDeliveryAddress;
