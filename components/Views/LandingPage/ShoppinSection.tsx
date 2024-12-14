import Image from 'next/image';
import React from 'react';
import BlackAppStore from '@/public/icons/blackAppstore.svg';
import BlackPlaystore from '@/public/icons/playstore.png';
import Iphone from '@/public/images/iphone.svg';
import { Button } from '@nextui-org/react';

const ShoppingSection = () => {
	return (
		<section className="my-[4rem] w-[93%] md:w-[90%] h-max mx-auto bg-[#ECF0F4] md:rounded-[40px] md:px-[3.5rem] px-[1.5rem] md:pt-[3rem] pt-[1.5rem] md:grid grid-cols-2 flex justify-center items-center flex-col md:gap-5">
			<div className="flex items-center justify-center flex-col">
				<p className="md:text-5xl text-[39px] font-semibold md:text-left text-center leading-snug">
					Simplify your shopping <br /> with the Afruna app 
				</p>
				<p className="md:text-[15px] lg:text-xl font-normal text-black mt-4 md:text-left text-center ">
					Shopping on the go is fast and easy with our free app.
				</p>
				<div className="flex items-center md:flex-row flex-col gap-2 p-2">
					<Image src={BlackAppStore} alt="BlackAppStore" />
					<Image src={BlackPlaystore} alt="BlackPlaystore" />
				</div>
				<div className="md:block hidden mt-2">
					<p className="text-xl font-medium text-black">Receive a download link</p>
					<div
						className={
							'flex rounded-full justify-between items-center w-full bg-white py-1'
							// focus-within:border focus-within:border-afruna-blue
						}
					>
						<input
							className={
								'transition-all hover:scale-105 hover:ml-2 ease-in-out lg:placeholder:text-[14px] lg:placeholder:text-[#586283] lg:text-[0.8rem] duration-200 w-full outline-none text-xs rounded-l-md p-2 lg:p-3 px-5 border-none bg-transparent focus:border-none'
							}
							type={'search'}
							placeholder="Enter your email address"
						/>
						<Button
							variant="solid"
							className={
								'transition-all hover:scale-105 ease-in-out duration-200 flex items-center px-2 py-1 lg:py-[0.7rem] lg:px-5 bg-[#FEA000] rounded-full space-x-2 text-white text-[14.17px] font-600 mr-[0.7rem]'
							}
						>
							Subscribe
						</Button>
					</div>
				</div>
			</div>
			<div>
				<Image src={Iphone} alt="iphone" className="float-right md:mt-0 mt-5" />
			</div>
		</section>
	);
};
export default ShoppingSection;
