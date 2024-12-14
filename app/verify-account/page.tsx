'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import Logo from '@/public/icons/afruna_orange.svg';
import Mail from '@/public/icons/mail_.svg';
import { Sms, ArrowRotateLeft, MessageQuestion } from 'iconsax-react';
import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import OtpInput from 'react-otp-input';
import { useQuery, useMutation } from '@tanstack/react-query';
import { VerifyEmail, resendOtp } from '@/lib/dataFetchingFns';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useAppSelector } from '@/lib/hooks.';
import { DEFAULT_BUTTON_STYLE } from '@/constant/style_constant';

const Signin = () => {
	const [code, setCode] = useState('');
	const Router = useRouter();
	const { toast } = useToast();
	const user_name = useAppSelector((state) => state.authentication?.user_name);
	const user_email =
		typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get('email') : null;
	const { data, refetch, error, isLoading } = useQuery({
		queryKey: ['verify-email', code],
		queryFn: () => VerifyEmail(code),
		enabled: false,
	});

	const resendOtpMutation = useMutation({
		mutationFn: resendOtp,
		onSuccess: () => {
			toast({
				title: 'OTP Resent',
				description: 'A new OTP has been sent to your email.',
				variant: 'success',
			});
		},
		onError: (error) => {
			toast({
				title: 'Error',
				description: 'Failed to resend OTP. Please try again.',
				variant: 'destructive',
			});
		},
	});

	const handleSubmit = () => {
		refetch();
	};

	const handleResendOtp = () => {
		if (user_email) {
			resendOtpMutation.mutate(user_email);
		} else {
			toast({
				title: 'Error',
				description: 'User email not found. Please try signing in again.',
				variant: 'destructive',
			});
		}
	};

	useEffect(() => {
		if (error) {
			toast({
				title: 'An error occurred.',
				description: error.message || 'Please try again.',
				variant: 'destructive',
			});
		} else if (data) {
			toast({
				title: 'Successful.',
				description: 'Account Verification Successful.',
				variant: 'success',
			});
			Router.push('/sign-in');
		}
	}, [error, data]);

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
						You've got mail, <span className="text-[#586283]">{user_name}</span>
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
									<input
										{...props}
										className={`${props?.value ? 'shadow' : ''} text-center`}
										style={{
											display: 'flex !important',
											justifyContent: 'center !important',
											alignItems: 'center !important',
											width: '50px',
											height: '50px',
											border: props?.value ? '1px solid #FEA000' : '1px solid #F0F2F5',
											borderRadius: '13.41px',
										}}
									/>
								);
							}}
							containerStyle={{
								width: '100% !important',
							}}
						/>
					</div>

					<div className="flex justify-between items-center mt-[2rem]">
						<p className="text-[#586283] font-normal text-sm">Didn't receive code?</p>
						<div
							className="flex items-center gap-2 bg-white rounded-full px-6 py-3 cursor-pointer"
							onClick={handleResendOtp}
						>
							<ArrowRotateLeft size="20" color="#663300" />
							<p className="text-[#663300] font-normal text-sm">
								{resendOtpMutation.isPending ? 'Resending...' : 'Resend Code'}
							</p>
						</div>
					</div>

					<button
						className={DEFAULT_BUTTON_STYLE}
						type="button"
						onClick={handleSubmit}
						disabled={isLoading || code.length === 0}
					>
						{isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : null}
						{isLoading ? 'Verifying...' : 'Verify Email'}
					</button>
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

export default Signin;
