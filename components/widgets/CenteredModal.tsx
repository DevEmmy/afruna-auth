import { TModal } from '@/lib/types';
import { Modal, ModalContent } from '@nextui-org/react';
import React from 'react';

const CenteredModal = (props: TModal): JSX.Element => {
	const { size, open, children, className } = props;

	return (
		<Modal
			className={`${className}`}
			isOpen={open}
			onClose={props.handleClose}
			hideCloseButton
			size={size || 'lg'}
		>
			<ModalContent>{() => <>{children}</>}</ModalContent>
		</Modal>
	);
};

export default CenteredModal;
