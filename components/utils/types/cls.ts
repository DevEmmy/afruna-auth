import { ChangeEvent, HTMLProps } from 'react';
import { SlotsToClasses } from '@nextui-org/react';

export type TWClassNames = HTMLProps<HTMLElement>['className'];

export type TTextArea = {
	placeholder?: string;
	value?: any;
	label?: string;
	handleChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
	errorMessage?: string;
	startDecorator?: React.ReactNode;
	endDecorator?: React.ReactNode;
	required?: boolean;
	readOnly?: boolean;
	disabled?: boolean;
	classNames?:
		| SlotsToClasses<
				| 'input'
				| 'base'
				| 'label'
				| 'description'
				| 'errorMessage'
				| 'mainWrapper'
				| 'inputWrapper'
				| 'innerWrapper'
				| 'clearButton'
				| 'helperWrapper'
		  >
		| undefined;
	className?: string;
	name?: string;
	id?: string;
	isInvalid?: boolean;
};
