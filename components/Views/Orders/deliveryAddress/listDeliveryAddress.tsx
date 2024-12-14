import React, { useState } from 'react';
import AddressCard from '../addressCard';
import { useQuery } from '@tanstack/react-query';
import { RequestServices } from 'utils/requests';
import { DeliveryAddressResponse } from 'types/response.types';
import { useQueryState } from 'nuqs';

const DeliveryAddressList = ({ selectedAddressId, setSelectedAddressId }: any) => {
	const [selectedAddress, setSelectedAddress] = useState(null);

	const [query, setQuery] = useQueryState('update', { shallow: true });

	const { data, isLoading, isError } = useQuery({
		queryKey: ['delivery-address'],
		queryFn: async () => RequestServices.fetchDeliveryAddress(),
	});

	if (isLoading) return <div>Loading...</div>;
	if (isError) return <div>Error</div>;

	const responseData: DeliveryAddressResponse[] = data?.data || [];

	const handleEditAddress = (addressData: any) => {
		setSelectedAddress(addressData);
		setQuery('true');
	};

	const handleSelectAddress = (id: string) => {
		setSelectedAddressId(id);
	};

	return (
		<div className="flex flex-col gap-4">
			{responseData
				?.slice(-2)
				.map((items: any) => (
					<AddressCard
						key={items?.id}
						id={items?._id}
						name={items?.name}
						address={` ${items?.streetNumber}, ${items?.address}`}
						phone={items?.phoneNumber}
						location={`${items?.city}, ${items?.state}, ${items?.country}`}
						isDefault={items?.isDefault}
						onEdit={() => handleEditAddress(items)}
						onSelect={handleSelectAddress}
						selectedId={selectedAddressId}
						data={selectedAddress}
					/>
				))}
		</div>
	);
};

export default DeliveryAddressList;
