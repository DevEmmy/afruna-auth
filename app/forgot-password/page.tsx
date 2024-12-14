'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import Logo from '@/public/icons/afruna_orange.svg';
import { useRouter } from 'next/navigation';
import { useToast } from '@/components/ui/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import emailVerificationSchema from '@/schemas/emailVerification.schema';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { ForgotPasswordApiCredentails, ForgotPasswordApiResponse } from '@/lib/types';
import { ForgotPassword } from '@/lib/dataMutationFns';
import { Loader2 } from 'lucide-react';
import { Button } from '@nextui-org/react';

type emailCredentials = z.infer<typeof emailVerificationSchema>;

const ResetPassword = () => {
	const router = useRouter();
	const { toast } = useToast();

	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<emailCredentials>({
		resolver: zodResolver(emailVerificationSchema),
	});

	const mutation = useMutation({
		mutationFn: ForgotPassword,
		onSuccess: (data) => {
			toast({
				title: 'Reset link sent',
				description: 'A password reset link has been sent to your email.',
				variant: 'success',
			});
			router.push('/auth/update-password');
		},
		onError: (error: AxiosError<ForgotPasswordApiResponse>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function onSubmit(data: ForgotPasswordApiCredentails) {
		mutation.mutate({
			email: data.email,
		});
	}

	return (
		<div className="md:mx-[6rem] mx-[1.5rem] my-5">
			<div className="flex justify-between items-center">
				<Link href="/">
					<Image src={Logo} alt="logo" />
				</Link>
				<Button
					variant="solid"
					className="text-white bg-[#663300] rounded-full px-6 py-3 text-sm font-semibold"
					onClick={() => router.push('/auth/sign-in')}
				>
					Sign in
				</Button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-center items-center m-auto my-[4rem] bg-[#FBFBFB] rounded-2xl 2xl:w-[35%] xl:w-[40%] lg:w-[50%] py-6 px-6">
					<div className="text-left w-full ">
						<h5 className="text-[#1D2329] font-bold text-2xl text-left mt-5">Reset Password</h5>
						<p className="text-[#586283] font-normal text-sm mt-2">
							Enter the email address you used to register this account
						</p>
						<div className="w-full mt-6">
							<p className="text-sm font-normal text-black mb-3">Email Address</p>
							<input
								{...register('email')}
								placeholder="Enter your email address"
								className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
							/>
							<span className="text-[12px] text-[#FF0000]">{errors?.email?.message}</span>
						</div>
						<Button
							variant="solid"
							type="submit"
							className="text-white bg-[#663300] w-full rounded-full px-6 py-4 h-[10] text-sm font-semibold mt-[2rem] flex justify-center items-center gap-2"
						>
							{mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Get Reset
							Link
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default ResetPassword;
