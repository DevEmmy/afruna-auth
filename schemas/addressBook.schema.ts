import { z } from 'zod';
const deliveryInfoSchema = z.object({
	name: z.string().min(1, 'Last name is required').optional(),
	address: z.string().min(1, 'Address is required'),
	streetNumber: z.string().min(1, 'Street number is required'),
	postCode: z.string().min(1, 'Post code is required').optional(),
	city: z.string().min(1, 'City is required'),
	state: z.string().min(1, 'State is required'),
	country: z.string().min(1, 'Country is required'),
	lga: z.string().min(1, 'LGA is required'),
	phoneNumber: z
		.string()
		.min(1, 'Phone number is required')
		.regex(/^\+?[0-9]{10,14}$/, 'Invalid phone number format'),
	isDefault: z.boolean().optional(),
});

export default deliveryInfoSchema;