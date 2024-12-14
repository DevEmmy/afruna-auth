import React, { useState } from 'react';
import { PenLine, Trash2Icon } from 'lucide-react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Button,
} from '@nextui-org/react';
import AddDeliveryAddress from '../Orders/addDeliveryAddress';
import DeleteDataPanel from '@/components/shared/deleteData';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import https from '@/lib/https';

interface ProfileAddressBookProps {
	id: string;
	name: string;
	address: string;
	phone: string;
	location?: string;
	isDefault: boolean;
	onEdit: () => void;
	data?: any;
	onAddressDeleted: () => void;
}

const ProfileAddressBook: React.FC<ProfileAddressBookProps> = ({
	id,
	name,
	address,
	phone,
	location,
	isDefault,
	onEdit,
	data,
	onAddressDeleted,
}) => {
	const { isOpen, onOpen, onClose } = useDisclosure();
	const { isOpen: isDeleteOpen, onOpen: onDeleteOpen, onClose: onDeleteClose } = useDisclosure();
	const [isDeleting, setIsDeleting] = useState(false);
	const queryClient = useQueryClient();

	const deleteAddressMutation = useMutation({
		mutationFn: async () => {
			await https().delete(`/address/${id}`);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['delivery-address'],
			});
			onDeleteClose();
			onAddressDeleted();
		},
		onError: (error) => {
			console.error('Error deleting address:', error);
		},
		onSettled: () => {
			setIsDeleting(false);
		},
	});

	const handleEdit = () => {
		onOpen();
		onEdit();
	};
	console.log(id);

	const handleDelete = () => {
		setIsDeleting(true);
		deleteAddressMutation.mutate();
	};

	return (
		<>
			<div className="flex w-full md:w-[360px] flex-col gap-4 p-5 md:p-[25px] bg-white border rounded-[20px]">
				<div className="flex ">
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
				<div className="h-[1.5px] w-full bg-gray-200 my-2"></div>
				<div className="flex  items-center justify-between">
					<Button className="text-white  border-[#F0F2F5] text-sm font-normal  flex gap-2 items-center px-3 py-2 rounded-full bg-primary">
						Default Address
					</Button>

					<div className="flex items-center gap-2">
						<div
							onClick={handleEdit}
							className="flex cursor-pointer w-[40px] h-[40px] items-center justify-center text-gray-600 hover:text-red-600 focus:outline-none border rounded-full"
							style={{
								backgroundColor: '#F0F2F5',
								borderRadius: '50%',
							}}
						>
							<PenLine size={'15px'} />
						</div>
						<div
							onClick={onDeleteOpen}
							className="flex cursor-pointer w-[40px] h-[40px] items-center justify-center text-gray-600 hover:text-red-600 focus:outline-none border rounded-full"
							style={{
								backgroundColor: '#F0F2F5',
								borderRadius: '50%',
							}}
						>
							<Trash2Icon size={'15px'} color="red" />
						</div>
					</div>
				</div>
			</div>

			<div></div>

			<Modal isOpen={isOpen} onClose={onClose} size="2xl">
				<ModalContent className="h-5/6 lg:h-fit p-3 overflow-y-scroll no-scrollbar">
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

			<Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="sm">
				<ModalContent>
					<>
						<ModalBody>
							<DeleteDataPanel
								title="Delete Address"
								description="Are you sure you want to remove this address? Deleting it will impact any pending or future deliveries linked to it."
								onDelete={handleDelete}
								onCancel={onDeleteClose}
								isLoading={isDeleting}
							/>
						</ModalBody>
					</>
				</ModalContent>
			</Modal>
		</>
	);
};

export default ProfileAddressBook;
