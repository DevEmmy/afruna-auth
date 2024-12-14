import CustomDrawer from '@/components/widgets/CustomDrawer';
import React, { useState } from 'react';
import { BsStar, BsStarFill } from 'react-icons/bs';
import Textarea from '@/components/widgets/Textarea';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { CreateReview } from '@/lib/dataMutationFns';
import { ForgotPasswordApiResponse } from '@/lib/types';
import { AxiosError } from 'axios';
import { useToast } from '../ui/use-toast';
import { Loader2 } from 'lucide-react';
import { useAppSelector } from '@/lib/hooks.';


interface Props {
	handleClose: () => void;
	open: boolean;
	productId: string;
}

const DetailsDrawer = ({ ...props }: Props): JSX.Element => {
	const { open, handleClose, productId } = props;
	const userData = useAppSelector((state) => state.authentication?.userData);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState('');
	const [username, setUsername] = useState(userData?.firstName || '')
	const { toast } = useToast();
	const queryClient = useQueryClient();

	const mutation = useMutation({
		mutationFn: CreateReview,
		onSuccess: (data) => {
			queryClient.invalidateQueries({
				queryKey: ['product_reviews'],
			});
			setRating(0);
			setComment('');
			handleClose();
		},
		onError: (error: AxiosError<ForgotPasswordApiResponse>) => {
			toast({
				title: 'An error occurred.',
				description: error.response?.data.message || 'Please try again.',
				variant: 'destructive',
			});
		},
	});

	async function handleRatings() {
		mutation.mutate({
			rating,
			productId,
			username,
			comment,
		});
	}
	const onClose = () => {
		setRating(0);
		setComment('');
		handleClose();
	};

	return (
		<CustomDrawer
			isOpen={open}
			noClose
			title={
				<div className="flex items-center gap-3">
					<h4 className="text-[#1D2329] text-2xl text-semibold">Write a Review</h4>
				</div>
			}
			handleClose={onClose}
			className="h-screen max-h-screen w-full max-w-xl overflow-scroll rounded-md"
		>
			<div className="mt-7 mx-[2rem]">
				<div>
					<h2 className="text-black font-normal">{userData?.firstName}</h2>
					<p className="text-black text-sm font-normal">Your Rating</p>

					<div className="flex justify-left items-center gap-2 mx-auto my-3">
						{Array(5)
							.fill('_')
							.map((star, index) => (
								<div
									className={`cursor-pointer ${
										index < rating ? 'text-[#FF9E3A]' : 'text-[#FF9E3A]'
									}  `}
									key={index}
									onClick={() => setRating(index + 1)}
								>
									{rating > index ? <BsStarFill size={30} /> : <BsStar size={30} />}
								</div>
							))}
					</div>
					<div className="mt-[2rem]">
						<Textarea
							label="Your Review"
							id="comments"
							value={comment}
							handleChange={(event) => setComment(event.target.value)}
						/>
					</div>
					<div className="flex justify-end items-center mt-6 gap-3">
						<button className="px-6 py-4 rounded-full bg-white text-black border border-[#F0F2F5] shadow-md">
							Cancel
						</button>
						<button
							className="px-6 py-3 rounded-full bg-[#EF8D1B] text-white flex justify-center items-center gap-"
							disabled={rating === 0}
							onClick={handleRatings}
						>
							{' '}
							{mutation.isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />} Rate Product
						</button>
					</div>
				</div>
			</div>
		</CustomDrawer>
	);
};

export default DetailsDrawer;
