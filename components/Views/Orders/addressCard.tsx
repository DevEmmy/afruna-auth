import React, { useEffect } from 'react';
import { PenLine } from 'lucide-react';
import { Modal, ModalContent, ModalHeader, ModalBody, useDisclosure , Radio} from '@nextui-org/react';
import AddDeliveryAddress from './addDeliveryAddress';

interface AddressCardProps {
	id?: string;
	name: string;
	address: string;
	phone: string;
	location?: string;
	isDefault: boolean;
	onEdit: () => void;
	data?: any;
	onSelect: (id: string) => void; 
	selectedId?: string | null; 
}

const AddressCard: React.FC<AddressCardProps> = ({
	id,
	name,
	address,
	phone,
	location,
	isDefault,
	onEdit,
	data,
	onSelect,
	selectedId,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();

	useEffect(() => {
		if (isDefault) {
			onSelect(id!);
		}
	}, [id, onSelect]);

	return (
		<>
			<div className="flex justify-between p-4 md:p-[25px] bg-white border rounded-[20px]">
				<div className="flex space-x-4">
					<input
						type="radio"
						name="addressId"
						value={id}
						className="form-radio h-5 w-5 text-orange-500"
						onChange={() => onSelect(id!)}
						defaultChecked={isDefault}
						checked={selectedId === id} // Check if this is the selected address
					/>
					<div>
						<h4 className="text-sm text-gray-800">{name}</h4>
						<p className="text-sm text-gray-500">{address}</p>
						<p className="text-sm text-gray-500">{location}</p>
						<p className="text-sm text-gray-500">{phone}</p>

						{isDefault && (
							<span className="inline-block mt-2 px-3 py-2 text-xs text-orange-600 bg-orange-50 rounded-full">
								Default Address
							</span>
						)}
					</div>
				</div>
				<div>
					<button
						onClick={() => {
							onEdit();
							onOpen();
						}}
						className="flex items-center space-x-1 text-gray-600 hover:text-orange-600 focus:outline-none border rounded-full py-2 px-3"
					>
						<PenLine size={'18px'} />
						<span>Edit</span>
					</button>
				</div>
			</div>

			<Modal isOpen={isOpen} onClose={onClose} size="2xl">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit Delivery Address</ModalHeader>
							<ModalBody>
								<AddDeliveryAddress data={data} />
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal>
		</>
	);
};

export default AddressCard;
