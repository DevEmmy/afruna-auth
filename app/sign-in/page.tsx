'use client';
import Image from 'next/image';
import Link from 'next/link';
import React, { useState } from 'react';
import Logo from '@/public/icons/afruna_orange.svg';
import Facebook from '@/public/icons/facebook_.svg';
import Google from '@/public/icons/googrle.svg';
import { Eye, EyeSlash } from 'iconsax-react';
import { useRouter } from 'next/navigation';
import { MdCheckBox, MdCheckBoxOutlineBlank } from 'react-icons/md';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch, useAppSelector } from '@/lib/hooks.';
import { SignIn } from '@/lib/dataMutationFns';
import { useToast } from '@/components/ui/use-toast';
import { setUserData } from '@/contexts/features/authentication/authenticationSlice';
import { AxiosError } from 'axios';
import { SigninApiCredentails } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import signinCredentialsSchema from '@/schemas/signinCredentials.schema';
import { setToken } from '@/lib/utils';
import { Button } from '@nextui-org/react';
import { fetchRedirect } from '@/components/utils/fetchRedirect';
// import { baseUrl } from 'constant';

type signinCredentials = z.infer<typeof signinCredentialsSchema>;

const Signin = () => {
	// States
	const [open, setOpen] = useState(true);
	const [checked, setChecked] = useState(false);

	// next router
	const router = useRouter();

	// Toast Notifcation
	const { toast } = useToast();

	// Redux
	const dispatch = useAppDispatch();
	const redirect_url = fetchRedirect()

	// use form
	const {
		handleSubmit,
		register,
		formState: { errors },
	} = useForm<signinCredentials>({
		resolver: zodResolver(signinCredentialsSchema),
	});

	// Async functions
	const mutation = useMutation({
		mutationFn: SignIn,
		onSuccess: (data) => {
			dispatch(setUserData(data?.data?.user));
			setToken(data?.data?.token);
			if (redirect_url) {
				router.push(redirect_url);
			} else {
				router.back();
			}
		},
		onError: (error: AxiosError<any>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function onSubmit(data: SigninApiCredentails) {
		mutation.mutate({
			email: data.email,
			password: data.password,
		});
	}

	const socialAuthUrl = `https://dev.afruna.com/api/v1`;

	const redirectToGithub = () => {
		if (typeof window !== 'undefined') {
			window.location.href = `${socialAuthUrl}/social/google`;
		}
	};

	return (
		<div className="md:mx-[6rem] mx-[1.5rem] my-5">
			<div className="flex justify-between items-center">
				<Link href="/">
					<Image src={Logo} alt="logo" />
				</Link>
				<Button
					variant="solid"
					className="text-white bg-[#663300] rounded-full px-6 py-3 text-sm font-semibold"
					onClick={() => router.push('/sign-up')}
				>
					Create Account
				</Button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-center items-center m-auto my-[2rem] bg-[#FBFBFB] rounded-2xl 2xl:w-[40%] xl:w-[50%] lg:w-[60%] md:w-[60%] py-6 px-6 shadow">
					<div className="text-left w-full ">
						<h5 className="text-[#1D2329] font-bold text-2xl text-center">Welcome Back 👋🏽</h5>
						<div className="w-full mt-6">
							<p className="text-sm font-normal text-black mb-3">Email</p>
							<input
								{...register('email')}
								placeholder="Enter your email address"
								className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
							/>
							<span className="text-[12px] text-[#FF0000]">{errors?.email?.message}</span>
						</div>
						<div className="w-full mt-6 relative">
							<p className="text-sm font-normal text-black mb-3">Password</p>
							<input
								type={open ? 'password' : 'text'}
								{...register('password')}
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
						</div>
						<span className="text-[12px] text-[#FF0000]">{errors?.password?.message}</span>
						<div className="flex justify-between items-center mt-5">
							<div className="flex items-start gap-2">
								{checked ? (
									<MdCheckBox
										onClick={() => {
											setChecked(false);
										}}
										size={'25px'}
										color="#663300"
										className="cursor-pointer rounded"
									/>
								) : (
									<MdCheckBoxOutlineBlank
										size={'25px'}
										color="#663300"
										onClick={() => {
											setChecked(true);
										}}
										className="cursor-pointer rounded"
									/>
								)}
								<p className="text-xs font-normal text-[#586283] leading-6">Remember me</p>
							</div>
							<Link href="/auth/forgot-password">
								<p className="text-sm font-normal text-[#586283]">Forgot Password?</p>
							</Link>
						</div>
						<Button
							variant="solid"
							className="text-white bg-[#663300] w-full rounded-full px-6 py-4 h-[10] text-sm font-semibold mt-[1.5rem] flex justify-center items-center gap-2"
							type="submit"
						>
							{mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Sign In
						</Button>
						<p className="text-center text-[#586283] font-normal text-xs my-4">or</p>
						<div className="flex justify-between items-center gap-3">
							<div
								onClick={redirectToGithub}
								className="bg-white rounded-3xl flex justify-center items-center gap-2 py-4 px-3 w-full cursor-pointer border border-[#FCF9F7]"
							>
								<Image src={Google} alt="Google " />
								<p className=" text-[#1D2329] font-normal text-sm">Continue with Google</p>
							</div>
							{/* <div className="bg-white rounded-3xl flex justify-center items-center gap-2 py-4 px-3 w-[50%] cursor-pointer border border-[#FCF9F7]">
                <Image src={Facebook} alt="Facebook" />
                <p className=" text-[#1D2329] font-normal text-sm">
                  Continue with Facebook
                </p>
              </div> */}
						</div>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Signin;
