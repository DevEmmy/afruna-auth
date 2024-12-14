import React, { ReactNode } from 'react';
type Props = {
	children?: ReactNode;
};

const IconButton = (props: Props) => {
	const { children } = props;
	return (
		<div className="bg-[#FEA000] bg-opacity-10 h-[50px] w-[50px] rounded-full flex justify-center items-center">
			{children}
		</div>
	);
};

export default IconButton;
