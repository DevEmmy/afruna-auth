import { ReactElement, ReactNode } from 'react';

export interface IItemPicker {
	items?: {
		title: string;
		sub_title?: string;
		icon?: any;
	}[];
	icon_position?: string;
	contentClassName?: string;
	getSelected?: (value: string) => void;
	leftTriggerIcon?: ReactElement;
	placeholder?: any;
	triggerClassName?: string;
	extraComponent?: ReactNode | ReactElement;
	mobileView?: boolean;
	color?: boolean;
	profileLinks?:
		| {
				name: string;
				href: string;
				icon?: any;
		  }[]
		| null;
}
