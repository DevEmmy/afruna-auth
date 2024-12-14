import React, { ReactNode } from 'react';
import Footer from './Footer';
import Header from './Header';

const Index = ({
	children,
	className,
	fullScreen,
	
	headerClassName,
}: {
	children: ReactNode;
	className?: string;
		fullScreen?: boolean;
	headerClassName?: string
}) => {
	return (
		<div className={`${className}`}>
			<Header fullScreen={fullScreen} headerContainerClassName={`${headerClassName}`} />
			<main>{children}</main>
			<Footer />
		</div>
	);
};

export default Index;
