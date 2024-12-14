'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState, useEffect } from 'react';
import Logo from '@/public/icons/afruna_orange.svg';
import { useRouter } from 'next/navigation';
import { Eye, EyeSlash } from 'iconsax-react';
import { useMutation } from '@tanstack/react-query';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { ResetPassword } from '@/lib/dataMutationFns';
import { ResetPasswordApiCredentails, resetPasswordApiResponse } from '@/lib/types';
import { AxiosError } from 'axios';
import { z } from 'zod';
import { useToast } from '@/components/ui/use-toast';
import passwordVerificationSchema from '@/schemas/passwordVerification.schema';
import { Loader2 } from 'lucide-react';
import { Button } from '@nextui-org/react';

type paswordCredentials = z.infer<typeof passwordVerificationSchema>;

const UpdatePassword = () => {
	const [open, setOpen] = useState(true);
	const router = useRouter();
	const { toast } = useToast();
	const [password, setPassword] = useState('');
	const [validations, setValidations] = useState({
		length: false,
		uppercase: false,
		lowercase: false,
		number: false,
	});

	const {
		handleSubmit,
		register,
		formState: { errors },
		watch,
	} = useForm<paswordCredentials>({
		resolver: zodResolver(passwordVerificationSchema),
	});

	const watchPassword = watch('password');

	useEffect(() => {
		setPassword(watchPassword || '');
		setValidations({
			length: watchPassword?.length >= 12,
			uppercase: /[A-Z]/.test(watchPassword),
			lowercase: /[a-z]/.test(watchPassword),
			number: /[0-9]/.test(watchPassword),
		});
	}, [watchPassword]);

	const mutation = useMutation({
		mutationFn: ResetPassword,
		onSuccess: (data) => {
			toast({
				title: 'Password updated.',
				description: 'Your password has been successfully updated.',
			});
			router.push('/auth/sign-in');
		},
		onError: (error: AxiosError<resetPasswordApiResponse>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function onSubmit(data: ResetPasswordApiCredentails) {
		mutation.mutate({
			password: data.password,
			token: data.token,
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
						<h5 className="text-[#1D2329] font-bold text-2xl">Update Password</h5>
						<p className="text-[#586283] font-normal text-sm mt-2">
							A new set of characters to login your account.
						</p>
						<div className="w-full mt-6">
							<p className="text-sm font-normal text-black mb-3">Token</p>
							<input
								{...register('token')}
								placeholder="Enter the code sent to your registered email"
								className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
							/>
							<span className="text-[12px] text-[#FF0000]">{errors?.token?.message}</span>
						</div>
						<div className="w-full mt-6 relative">
							<p className="text-sm font-normal text-black mb-3">Create Password</p>
							<input
								type={open ? 'password' : 'text'}
								{...register('password')}
								placeholder="Enter password (min. of 8 characters)"
								className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
							/>
							<span className="text-[12px] text-[#FF0000]">{errors?.password?.message}</span>
							{!open ? (
								<Eye
									className="absolute right-5 bottom-[21%] cursor-pointer"
									size="20"
									color="#586283"
									onClick={() => setOpen(true)}
								/>
							) : (
								<EyeSlash
									className="absolute right-5 bottom-[21%] cursor-pointer"
									size="20"
									color="#586283"
									onClick={() => setOpen(false)}
								/>
							)}
						</div>
						<div className="w-full mt-6 relative">
							<p className="text-sm font-normal text-black mb-3">Confirm Password</p>
							<input
								type={open ? 'password' : 'text'}
								{...register('confirmPassword')}
								placeholder="Enter password (min. of 8 characters)"
								className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
							/>
							{!open ? (
								<Eye
									className="absolute right-5 bottom-[21%] cursor-pointer"
									size="20"
									color="#586283"
									onClick={() => setOpen(true)}
								/>
							) : (
								<EyeSlash
									className="absolute right-5 bottom-[21%] cursor-pointer"
									size="20"
									color="#586283"
									onClick={() => setOpen(false)}
								/>
							)}
							<span className="text-[12px] text-[#FF0000]">{errors?.confirmPassword?.message}</span>
						</div>{' '}
						<div className="flex justify-between items-center my-[3rem]">
							<div className="text-center">
								<p
									className={`text-xs ${password.length >= 12 ? 'text-green-600 text-lg font-bold' : 'text-[#586283]'} font-normal mb-2`}
								>
									12+
								</p>
								<p className="text-xs text-[#586283] font-normal">Characters</p>
							</div>
							<div className="text-center">
								<p
									className={`text-xs ${/[A-Z]/.test(password) ? 'text-green-600 font-bold' : 'text-[#586283]'} font-normal mb-2`}
								>
									AA
								</p>
								<p className="text-xs text-[#586283] font-normal">Uppercase</p>
							</div>
							<div className="text-center">
								<p
									className={`text-xs ${/[a-z]/.test(password) ? 'text-green-600 font-bold' : 'text-[#586283]'} font-normal mb-2`}
								>
									Aa
								</p>
								<p className="text-xs text-[#586283] font-normal">Lowercase</p>
							</div>
							<div className="text-center">
								<p
									className={`text-xs ${/\d/.test(password) ? 'text-green-600 font-bold' : 'text-[#586283]'} font-normal mb-2`}
								>
									123
								</p>
								<p className="text-xs text-[#586283] font-normal">Numbers</p>
							</div>
						</div>
						<Button
							variant="solid"
							className="text-white bg-[#663300] w-full rounded-full px-6 py-4 h-[10] text-sm font-semibold mt-[1.5rem] flex justify-center items-center gap-2"
							type="submit"
						>
							{mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Update Password
						</Button>
					</div>
				</div>
			</form>
		</div>
	);
};

export default UpdatePassword;
