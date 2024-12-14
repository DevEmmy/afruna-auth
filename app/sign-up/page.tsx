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
import CountrySelectInput from '@/components/widgets/CountrySelectInput';
import { useForm } from 'react-hook-form';
import signupCredentialsSchema from '@/schemas/signupCredentials.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { useAppDispatch } from '@/lib/hooks.';
import { Signup } from '@/lib/dataMutationFns';
import { useToast } from '@/components/ui/use-toast';
import { AxiosError } from 'axios';
import { SignupApiCredentails, SignupApiResponse } from '@/lib/types';
import { Loader2 } from 'lucide-react';
import { setUser_name } from '@/contexts/features/authentication/authenticationSlice';
import { Button } from '@nextui-org/react';

type signupCredentials = z.infer<typeof signupCredentialsSchema>;

const Signin = () => {
	const [open, setOpen] = useState(true);
	const [checked, setChecked] = useState(false);
	const [country_code, setCountryCode] = useState({
		label: 'Nigeria',
		value: '+234',
		code: 'ng',
	});
	const router = useRouter();
	const dispatch = useAppDispatch();
	const { toast } = useToast();

	const {
		handleSubmit,
		register,
		setValue,
		formState: { errors },
	} = useForm<signupCredentials>({
		resolver: zodResolver(signupCredentialsSchema),
	});

	const mutation = useMutation({
		mutationFn: Signup,
		onSuccess: (data, variables) => {
			router.push(`/auth/verify-account?email=${encodeURIComponent(variables.email)}`);
		},
		onError: (error: AxiosError<SignupApiResponse>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function onSubmit(data: SignupApiCredentails) {
		mutation.mutate({
			firstName: data.firstName,
			lastName: data.lastName,
			email: data.email,
			password: data.password,
			phoneNumber: `${country_code.value} ${data.phoneNumber}`,
			country: country_code.code,
		});
		dispatch(setUser_name(data.firstName));
	}

	const socialAuthUrl = `https://dev.afruna.com/api/v1`;
	const windowWidthAndHeight = 'width=600,height=600';

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
					onClick={() => router.push('/auth/sign-in')}
				>
					Sign In
				</Button>
			</div>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="flex justify-center items-center m-auto my-[2rem] bg-[#FBFBFB] rounded-2xl 2xl:w-[40%] xl:w-[50%] lg:w-[60%] md:w-[60%] py-6 px-6 shadow">
					<div className="text-left w-full ">
						<h5 className="text-[#1D2329] font-bold text-2xl text-center">Create an Account ✨</h5>
						<div className="flex justify-between items-center gap-3">
							<div className="w-full mt-6">
								<p className="text-sm font-normal text-black mb-3">First Name</p>
								<input
									placeholder="Dominic"
									{...register('firstName')}
									className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
								/>
								<span className="text-[12px] text-[#FF0000]">{errors?.firstName?.message}</span>
							</div>
							<div className="w-full mt-6">
								<p className="text-sm font-normal text-black mb-3">Last Name</p>
								<input
									placeholder="praise"
									{...register('lastName')}
									className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 outline-none focus:outline focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
								/>
								<span className="text-[12px] text-[#FF0000]">{errors?.lastName?.message}</span>
							</div>
						</div>
						<div className="w-full mt-6">
							<p className="text-sm font-normal text-black mb-3">Email</p>
							<input
								{...register('email')}
								placeholder="Enter your email address"
								className="shadow-md border border-[#F0F2F5] w-full rounded-lg py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] px-3"
							/>
							<span className="text-[12px] text-[#FF0000]">{errors?.email?.message}</span>
						</div>
						<div>
							<div className="w-full mt-6">
								<p className="text-sm font-normal text-black mb-3">Phone number</p>
								<div className="w-full bg-white flex item-center shadow-md rounded-lg border border-[#F0F2F5]">
									<CountrySelectInput country_code={country_code} setCountryCode={setCountryCode} />
									<input
										type="text"
										{...register('phoneNumber')}
										placeholder="Enter your phone number"
										className="pl-3 py-4 focus:outline-none border-none outline-none placeholder:text-sm placeholder:text-[#586283] w-full"
									/>
								</div>
								<span className="text-[12px] text-[#FF0000]">{errors?.phoneNumber?.message}</span>
							</div>
						</div>
						<div className="w-full mt-6 relative">
							<p className="text-sm font-normal text-black mb-3">Create Password</p>
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
						<div className="flex items-start mt-5 flex items-center gap-2">
							{checked ? (
								<MdCheckBox
									onClick={() => {
										setValue('agree_to_terms', false);
										setChecked(false);
									}}
									size={'30px'}
									color="#663300"
									className="cursor-pointer"
								/>
							) : (
								<MdCheckBoxOutlineBlank
									size={'30px'}
									color="#663300"
									onClick={() => {
										setValue('agree_to_terms', true);
										setChecked(true);
									}}
									className="cursor-pointer"
								/>
							)}
							<p className="text-xs font-normal text-[#586283] leading-6">
								By clicking on Create Account, you agree to our Terms and acknowledge our company's
								Conditions.
							</p>
						</div>
						<span className="text-[12px] text-[#FF0000]">{errors?.agree_to_terms?.message}</span>
						<Button
							variant="solid"
							className="text-white bg-[#663300] w-full rounded-full px-6 py-4 h-[10] text-sm font-semibold mt-[1.5rem] flex justify-center items-center gap-2"
							type="submit"
						>
							{mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
							Create Account
						</Button>
						<p className="text-center text-[#586283] font-normal text-xs my-4">or</p>
						<div className="flex justify-between items-center gap-3">
							<div
								onClick={redirectToGithub}
								className="bg-white rounded-3xl flex justify-center items-center gap-2 py-4 px-3 w-full cursor-pointer border border-[#FCF9F7]"
							>
								<Image src={Google} alt="Google" />
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
