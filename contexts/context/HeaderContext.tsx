'use client';

import { createContext, useContext, ReactNode, useState } from 'react';

type THeader = {
	show: boolean;
	handleHeaderChange: (s: boolean) => void;
};

export const HeaderContext = createContext<THeader | null>(null);

const HeaderProvider = ({ children }: { children: ReactNode }) => {
	const [show, setShow] = useState<boolean>(true);

	const handleHeaderChange = (status: boolean): void => setShow(status);

	return (
		<HeaderContext.Provider value={{ show, handleHeaderChange }}>{children}</HeaderContext.Provider>
	);
};

export const useHeaderContext = () => {
	const context = useContext(HeaderContext);

	if (!context) {
		throw new Error('Please use Header Provider in parent compoenent');
	}

	return context;
};

export default HeaderProvider;
