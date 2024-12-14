import React, { useRef } from 'react';
import { sliderOptions } from '@/components/constants';
import Image from 'next/image';
import Slider from 'react-slick';
import banner_chair from '@/public/icons/banner_chair.svg';
import banner_basket from '@/public/icons/banner_basket.svg';
import banner_sandal from '@/public/icons/banner_sandal.svg';
import { Button } from '@nextui-org/react';

const Banner = () => {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		autoplaySpeed: 2000,
		pauseOnHover: true,
		nextArrow: <></>,
		prevArrow: <></>,
		appendDots: (dots: any) => (
			<div
				style={{
					borderRadius: '10px',
					padding: '4px',
					marginLeft: '10rem !important',
				}}
			>
				<ul style={{ margin: '0px', marginTop: '-4rem' }}> {dots} </ul>
			</div>
		),
	};
	const slider = useRef(null) as any;

	return (
		<div className="bg-[#F0F2F5]">
			<div className="flex flex-row h-90 md:h-[460px] w-[93%] mx-auto">
				<div className="relative bg-[#F4E9BC] w-full md:w-[53%] md:full rounded-2xl md:rounded-r-none md:rounded-l-2xl ">
					<Slider {...settings} ref={slider}>
						{sliderOptions?.slice(0, 3)?.map((slide, index) => (
							<div
								key={index}
								className={` !min-w-full h-full relative !flex flex-row-reverse md:flex-row items-center my-auto sm:justify-evenly md:justify-center px-4 rounded-l-2xl md:gap-x-5`}
							>
								<div className=" w-64 md:w-96 h-full max-w-md relative">
									<div className="relative w-full pt-[115%] md:pt-[120%]">
										{' '}
										{/* 4:5 aspect ratio on mobile, 1:1 on larger screens */}
										<Image
											alt="slide"
											src={slide.image}
											layout="fill"
											objectFit="cover"
											priority
											quality={100}
											className="absolute left-0 w-full h-full object-contain"
										/>
									</div>
								</div>

								<div className="flex flex-col gap-y-3 md:gap-y-5 relative w-28 md:w-[200px] items-start justify-center">
									<p className="text-neutral-95 font-normal text-xs sm:text-base">{slide.title}</p>

									<h2 className="text-black font-bold md:font-medium xl:text-3xl md:text-2xl ">
										African Combo 5x Pillows Color
									</h2>
									<div className="">
										<p className="text-[#53575E] font-normal text-[12px] uppercase">Discount</p>
										<p className="text-[#648014] font-medium text-base md:text-[30px]">
											{slide.discount}
										</p>
									</div>
									<Button
										variant="solid"
										className="bg-[#FEA000] text-white rounded-full !px-5 md:!px-12 md:!w-9 py-[0.6rem] text-[14px]"
									>
										Shop Now
									</Button>
								</div>
							</div>
						))}
					</Slider>
				</div>

				<section className="relative border w-full h-full hidden md:grid grid-cols-2 grid-rows-2">
					<div className="relative bg-white text-[#1D1D1A]  w-full h-full">
						<div className="absolute top-3 left-7 ">
							<p className="z-10 text-[#1D1D1A] text-2xl font-medium m-0 p-0 text-capitalize">
								Local Leather <br /> Made Chair
							</p>
							<p className="z-10 text-[#586283] text-[13px] font-light mt-2 uppercase">
								Discount: <span className="text-[#FF3333]">30%</span>
							</p>
						</div>
						<div className=" absolute -right-3 bottom-0 w-52">
							<div className="relative w-full pt-[103%]">
								{' '}
								{/* 4:5 aspect ratio on mobile, 1:1 on larger screens */}
								<Image
									alt="slide"
									src="/images/chair.png"
									layout="fill"
									objectFit="cover"
									priority
									quality={100}
									className="absolute bottom-0 right-0 w-full h-full object-contain md:object-contain"
								/>
							</div>
						</div>
					</div>{' '}
					<div className="bg-[#1D2329] text-white p-[1.5rem] w-full h-full rounded-tr-2xl relative  text-capitalize">
						<div>
							<p className=" text-2xl font-medium m-0 p-0">
								Local <br />
								Footwear
							</p>
							<div className="mt-2">
								<p className="text-[14px] font-medium">₦40,000</p>
								<p className="text-[14px] font-light line-through">₦55,000</p>
							</div>
						</div>
						<div className=" absolute -right-0 bottom-0 w-48">
							<div className="relative w-full pt-[105%]">
								{' '}
								{/* 4:5 aspect ratio on mobile, 1:1 on larger screens */}
								<Image
									alt="slide"
									src="/images/slip.png"
									layout="fill"
									objectFit="cover"
									priority
									quality={100}
									className="absolute bottom-0 right-0 w-full h-full object-contain md:object-contain"
								/>
							</div>
						</div>
					</div>
					<div className="flex flex-row justify-between items-start col-span-2 row-start-2 bg-[#663300] py-[1.5rem] px-[2rem] rounded-br-2xl relative text-capitalize w-full h-full">
						<div>
							<p className=" text-white text-2xl font-medium m-0 p-0">
								Local Bounty Bliss, <br />
								Handcrafted Harvest <br />
								Haven basket
							</p>
							<p className="absolute bottom-5 text-[13px] text-white">
								{' '}
								Discount: <span className="text-[#FF3333] font-light">30%</span>
							</p>
						</div>
						<div className=" w-48 max-w-md relative">
							<div className="relative w-full pt-[109%] md:pt-[100%]">
								{' '}
								{/* 4:5 aspect ratio on mobile, 1:1 on larger screens */}
								<Image
									alt="slide"
									src="/images/basket.png"
									layout="fill"
									objectFit="cover"
									priority
									quality={100}
									className="absolute right-0 w-full h-full object-contain md:object-contain"
								/>
							</div>
						</div>
					</div>
				</section>
			</div>
		</div>
	);
};

export default Banner;
