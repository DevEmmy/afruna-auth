import React from 'react';
import { Modal, ModalContent, ModalHeader } from '@nextui-org/react';
import { CloseCircle } from 'iconsax-react';
import CloseIcon from '@/public/icons/icon.svg';
import Image from 'next/image';

interface Props extends React.HTMLProps<HTMLDivElement> {
	isOpen: boolean;
	onOpenChange?: (open: boolean) => void;
	noClose?: boolean;
	title: any;
	handleClose: () => void;
	endDecorator?: JSX.Element;
	footer?: JSX.Element | null;
	className?: any;
}

const CustomDrawer: React.FC<Props> = ({ ...props }) => {
	return (
		<Modal
			scrollBehavior="inside"
			isOpen={props.isOpen}
			onOpenChange={props.onOpenChange}
			onClose={props.handleClose}
			placement="center"
			backdrop="opaque"
			size="full"
			hideCloseButton={props.noClose}
			classNames={{
				wrapper: 'flex justify-end',
			}}
			motionProps={{
				variants: {
					enter: {
						x: 0,
						opacity: 1,
						transition: {
							duration: 0.3,
							ease: 'easeOut',
						},
					},
					exit: {
						x: 50,
						opacity: 0,
						transition: {
							duration: 0.2,
							ease: 'easeIn',
						},
					},
				},
			}}
			className={props.className}
		>
			<ModalContent>
				{() => (
					<>
						<ModalHeader className="flex items-center justify-between gap-2 p-0 py-4 mt-[7%] sm:mt-0 md:mx-[2rem] mx-[1rem]">
							{props.title}
							<Image
								src={CloseIcon}
								alt={CloseIcon}
								className="cursor-pointer"
								onClick={props.handleClose}
							/>
						</ModalHeader>
						<div className="h-[90vh] overflow-auto">{props.children}</div>
						{props.footer}
					</>
				)}
			</ModalContent>
		</Modal>
	);
};

export default CustomDrawer;
