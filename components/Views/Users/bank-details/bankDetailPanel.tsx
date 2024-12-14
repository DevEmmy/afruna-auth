import React, { useState } from 'react';
import { PenLine, SeparatorHorizontal, Trash2 } from 'lucide-react';
import {
	Modal,
	ModalContent,
	ModalHeader,
	ModalBody,
	useDisclosure,
	Button,
} from '@nextui-org/react';
import AddBank from 'app/user/profile/components/form/addBank';
import DeleteDataPanel from '@/components/shared/deleteData';
import { toast } from '@/components/ui/use-toast';
import axios from 'axios';
import https from '@/lib/https';

interface ProfileAddressBookProps {
	id: string;
	name: string;
	accountName: string;
	accountNumber: string;
	bankName: string;
	bankCode: string;
	phone: string;
	location?: string;
	isDefault: boolean;
	onEdit: () => void;
	data?: any;
	onAddressDeleted: () => void;
}

const BankDetailPanel: React.FC<ProfileAddressBookProps> = ({
	id,
	name,
	accountName,
	accountNumber,
	bankName,
	bankCode,
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

	const handleEdit = () => {
		onOpen();
		onEdit();
	};

	const handleDelete = async () => {
		try {
			setIsDeleting(true);
			await https().delete(`/address/${id}`);
			onDeleteClose();
			onAddressDeleted();
		} catch (error) {
			console.error('Error deleting Bank details:', error);
			toast({ title: 'Error deleting Bank details.', variant: 'destructive' })
		} finally {
			setIsDeleting(false);
		}
	};

	return (
		<>
			<div className="flex w-full md:w-[360px] flex-col gap-4 p-5 md:p-[25px] bg-white border rounded-[20px]">
				<div className="flex border-b pb-2">
					<div>
						<h4 className="text-sm text-gray-800">{name}</h4>
						<p className="text-sm font-semibold text-gray-500">{accountName}</p>
						<p className="text-sm text-gray-500">{bankName}</p>
						<p className="text-sm text-gray-500">{accountNumber}</p>
						<p className="text-sm text-gray-500">{location}</p>
						<p className="text-sm text-gray-500">{phone}</p>
					</div>
				</div>
				
				<div className="flex justify-end gap-2">
					{/* <PenLine
						onClick={handleEdit}
						className="cursor-pointer text-gray-500 hover:text-blue-500"
					/> */}
					<Trash2
						onClick={onDeleteOpen}
						className="cursor-pointer text-red-500 w-11 h-11 rounded-full p-3 border"
					/>
				</div>
			</div>

			{/* Modal for Editing Bank Details */}
			{/* <Modal isOpen={isOpen} onClose={onClose} size="2xl">
				<ModalContent>
					{(onClose) => (
						<>
							<ModalHeader className="flex flex-col gap-1">Edit Bank Detail</ModalHeader>
							<ModalBody>
								<AddBank data={data} onClose={onClose} /> 
							</ModalBody>
						</>
					)}
				</ModalContent>
			</Modal> */}

			{/* Modal for Deleting Bank Details */}
			<Modal isOpen={isDeleteOpen} onClose={onDeleteClose} size="sm">
				<ModalContent>
					<ModalBody>
						<DeleteDataPanel
							title="Delete Address"
							description="Are you sure you want to remove this address? Deleting it will impact any pending or future deliveries linked to it."
							onDelete={handleDelete}
							onCancel={onDeleteClose} 
							isLoading={isDeleting}
						/>
					</ModalBody>
				</ModalContent>
			</Modal>
		</>
	);
};

export default BankDetailPanel;
