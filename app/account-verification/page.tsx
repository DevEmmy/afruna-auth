'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '@/public/icons/afruna_orange.svg';
import Mail from '@/public/icons/mail_.svg';
import { Sms, ArrowRotateLeft, MessageQuestion } from 'iconsax-react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import OtpInput from 'react-otp-input';

const AccountVerification = () => {
	const [code, setCode] = useState('');
	const Router = useRouter();
	return (
		<div className="md:mx-[6rem] mx-[1.5rem] my-5">
			<div className="flex justify-between items-center">
				<Link href="/">
					<Image src={Logo} alt="logo" />
				</Link>
				<Button
					variant="solid"
					className="text-white bg-[#663300] rounded-full px-6 py-3 text-sm font-semibold"
					onClick={() => Router.push('/auth/sign-in')}
				>
					Sign In
				</Button>
			</div>
			<div className="flex justify-center items-center m-auto my-[4rem] bg-[#FBFBFB] rounded-2xl 2xl:w-[40%] xl:w-[40%] lg:w-[50%] py-6 px-6 shadow">
				<div className="text-left w-full ">
					<Sms size="40" color="#1D2329" className=" my-2" />
					<h6 className="text-[1D2329] font-medium text-[32px]">
						You’ve got mail, <span className="text-[#586283]">Dominic</span>
					</h6>
					<p className="text-[#586283] text-base font-normal mb-5">
						Please, enter the 6 digit OTP code sent to your email to continue.
					</p>
					{/* <Button
            startContent={<Image src={Mail} alt="mail" />}
            radius="full"
            className="bg-[#F0F2F5] border border-[#FCF9F7]"
          >
            Open Gmail
          </Button> */}
					<div className=" mt-[3rem]">
						<OtpInput
							value={code}
							onChange={setCode}
							numInputs={6}
							renderSeparator={<span style={{ padding: '0 0.5rem' }}></span>}
							renderInput={(props) => {
								return (
									// <div
									// style={{
									//   display: 'flex !important',
									//   justifyContent: 'center !important',
									//   alignItems: 'center !important',
									//   width: "50px",
									//   height: "50px",
									//   border: props?.value ? "1px solid #235094" : '1px solid #F0F2F5',
									//   borderRadius: "13.41px",
									// }}>
									<input
										{...props}
										className={`${props?.value ? 'shadow' : ''} text-center`}
										style={{
											display: 'flex !important',
											justifyContent: 'center !important',
											alignItems: 'center !important',
											width: '50px',
											height: '50px',
											border: props?.value ? '1px solid #235094' : '1px solid #F0F2F5',
											borderRadius: '13.41px',
										}}
									/>
									// </div>
								);
							}}
							containerStyle={{
								width: '100% !important',
							}}
							// onFocus={(e) => e.target.select}
							// autoFocus={index === 0}
							// inputStyle={{
							//   width: "50px",
							//   height: "50px",
							//   border: "1px solid #235094",
							//   borderRadius: "13.41px",
							// }}
						/>
					</div>
					<div className="flex justify-between items-center mt-[4rem]">
						<p className="text-[#586283] font-normal text-sm">Didn’t recieve code?</p>
						<div className="flex itmes-center gap-2 bg-white rounded-full px-6 py-3">
							<ArrowRotateLeft size="20" color="#663300" />
							<p className="text-[#663300] font-normal text-sm">Resend Code</p>
						</div>
					</div>
					<div className="flex items-center gap-1 mt-[4rem]">
						<MessageQuestion size="12" />
						<p className="text-[#586283] text-sm font-normal">
							Having issues? Please reach out to our support team here
						</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default AccountVerification;
