export type LayoutProps = {
	children: React.ReactNode;
};

export type BaseApiResponse = {
	status: string;
	message: string;
};

export type TModal = React.PropsWithChildren & {
	open: boolean;
	handleClose?: () => void;
	title?: any;
	newTitle?: any;
	openModal?: () => void;
	closeModal?: () => void;
	size?: any;
	className?: string;
	classNames?: {
		body: string;
		backdrop?: string;
		base?: string;
		header?: string;
		footer?: string;
		closeButtton?: string;
	};
};

export type SignupApiCredentails = {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
	phoneNumber: string;
	country?: string;
};

export type UpdatePasswordApiCredentails = {
	oldPassword: string;
	password: string;
};

export type FollowuserApiCredentails = {
	userId: string;
};

export type DeliveryInforApiCredentails = {
	addressId: string;
	paymentMethod: string;
};

export type DeliveryInforResult = {
	payment: any;
	userId: string;
	total: number;
	_id: string;
	createdAt: string;
	updatedAt: string;
	customId: string;
	__v: number;
};

export type PaymentResult = {
	access_code: string;
	authorization_url: string;
	reference: string;
};

export type userDetailsTypes = {
	country: string | undefined;
	email: string;
	firstName: string;
	followers: string[];
	following: string[];
	isFollower: any;
	isFollowing: any;
	lastName: string;
	phoneNumber: string;
	role: string;
	createdAt: string;
	updatedAt: string;
	_id: string;
};

export type productDetailsProps = {
	blocked: boolean;
	brand: string;
	categoryId: {
		_id: string;
		createdAt: string;
		name: string;
		updatedAt: string;
	};
	condition: string;
	coverPhoto: string[];
	createdAt: string;
	customId: string;
	devliveryLocations: string[];
	desc: string;
	discount: number;
	frequency: number;
	images: string[];
	inWishlist: boolean;
	isOutOfStock: boolean;
	isPromoted: boolean;
	metaData: string[];
	name: string;
	options: {
		quantity: string;
		size: string;
	}[];
	price: number;
	quantity: number;
	ratedby: number;
	ratings: number;
	sold: number;
	updatedAt: string;
	vendorId: string;
	_v: number;
	_id: string;
};

export type OrderItemProps = {
	total: number;
	_id: string;
	createdAt: string;
	updatedAt: string;
	customId: string;
	__v: number;
	vendorId: string;
	devliveryStatus: string;
	icCancelled: boolean;
	isPaid: boolean;
	sessionId: string;
	options: any[];
	quantity: number;
	productId: {
		_id: string;
		name: string;
		images: string[];
	};
};

export type OrderItems = {
	quantity: number;
	productId: {
		blocked: boolean;
		brand: string;
		categoryId: string;
		condition: string;
		coverPhoto: string[];
		createdAt: string;
		customId: string;
		devliveryLocations: string[];
		desc: string;
		discount: number;
		frequency: number;
		images: string[];
		inWishlist: boolean;
		isOutOfStock: boolean;
		isPromoted: boolean;
		metaData: string[];
		name: string;
		options: {
			quantity: string;
			size: string;
		}[];
		price: number;
		quantity: number;
		ratedby: number;
		ratings: number;
		sold: number;
		updatedAt: string;
		vendorId: string;
		_v: number;
		_id: string;
	};
};

type Address = {
	address?: string;
	city?: string;
	state?: string;
	country?: string;
  };

export type OrdersDetailsProps = {
	total: number;
	_id: string;
	createdAt: any;
	updatedAt: string;
	customId: string;
	addressId: Address;
	paymentMethod: string;
	deliveryFee: string;
	orderNumber: number;
	deliveryStatus: string;
	isCancelled: boolean;
	isPaid: boolean;
	productId: string;
	quantity: number;
	sessionId: string;
	__v: number;
	options: any[];
	items: OrderItems[];
	vendorId: {
		firstName: string;
		lastName: string;
		_id: string;
	};
};

export type OrdersDetailProps = {
	createdAt: string;
	updatedAt: string;
	customId: string;
	userId: string;
	__v: number;
	__id: string;
	total: number;
	orders: OrdersDetailsProps[];
};

export type TransactionsDetailsProps = {
	_id: string;
	success: boolean;
	userId: string;
	amount: number;
	date: string;
	description: string;
	reference: string;
	event: string;
	createdAt: string;
	updatedAt: string;
	customId: string;
	__v: string;
};

export type SigninApiCredentails = {
	email: string;
	password: string;
};

export type ForgotPasswordApiCredentails = {
	email: string;
};

export type ResetPasswordApiCredentails = {
	password: string;
	token: string;
};

export type addToCartCredentails = {
	productId: string;
	quantity: number;
};

export type createReviewtCredentails = {
	productId: string;
	comment: string;
	rating: number;
	username: string;
};

export type cartDetailProps = {
	_id: string;
	sessionId: string;
	productId: {
		_id: string;
		images: string[];
		name: string;
		brand: string;
		isOutOfStock: boolean;
		vendorId: {
			_id: string;
			firstName: string;
			lastName: string;
		};
	};
	quantity: number;
	total: number;
	vendorId: string;
	createdAt: string;
	updatedAt: string;
	custom: string;
	__v: number;
};

export type getWishlistCredentails = {
	_id: string;
	productsId: string[];
	sessionId: string;
	createdAt: string;
	updatedAt: string;
	__v: number;
};

export type getCartCredentails = {
	find(arg0: (product: { id: string; }) => boolean): any;
	_id: string;
	customId: string;
	total: number;
	createdAt: string;
	updatedAt: string;
	custom: string;
	__v: number;
	items: cartDetailProps[];
};

export type categoriesProps = {
	_id: string;
	createdAt: string;
	updatedAt: string;
	name: string;
	options: any[];
	parent: {
		_id: string;
		createdAt: string;
		updatedAt: string;
		name: string;
		parent: string;
		__v: number;
		options: any[];
		children: string[];
	};
	__v: number;
};

export type SignupApiResponse = {
	data: SignupApiCredentails & {};
} & BaseApiResponse;

export type CartApiResponse = {
	data: addToCartCredentails & {};
} & BaseApiResponse;

export type SigninApiResponse = {
	success: boolean;
	message: string;
	data: {
		token: string;
		user: userDetailsTypes;
	};
} & BaseApiResponse;

export type ForgotPasswordApiResponse = {
	data: ForgotPasswordApiCredentails & {
		id: number;
	};
} & BaseApiResponse;

export type resetPasswordApiResponse = {
	data: ResetPasswordApiCredentails & {
		id: number;
	};
} & BaseApiResponse;

export type GetAUserApiResponse = {
	data: userDetailsTypes;
} & BaseApiResponse;

export type GetProductApiResponse = {
	data: productDetailsProps[];
} & BaseApiResponse;

export type GetOrderApiResponse = {
	data: OrdersDetailProps;
} & BaseApiResponse;

export type GetOrdersApiResponse = {
	limit: number;
	page: number;
	totalDocs: number;
	totalPages: number;
	data: OrdersDetailsProps[];
} & BaseApiResponse;

export type GetTransactionsApiResponse = {
	limit: number;
	page: number;
	totalDocs: number;
	totalPages: number;
	data: TransactionsDetailsProps[];
} & BaseApiResponse;

export type GetOneProductApiResponse = {
	data: productDetailsProps;
} & BaseApiResponse;

export type GetCartApiResponse = {
	data: getCartCredentails;
} & BaseApiResponse;

export type GetWishlistApiResponse = {
	data: getWishlistCredentails;
} & BaseApiResponse;

export type UpdatePasswordApiResponse = {
	data: UpdatePasswordApiCredentails & {};
} & BaseApiResponse;

export type FollowuserApiResponse = {
	data: FollowuserApiCredentails & {};
} & BaseApiResponse;

export type CategoriesResponse = {
	data: categoriesProps[] & {};
} & BaseApiResponse;

export type DeliveryinfoApiResponse = {
	success: boolean;
	message: string;
	data: DeliveryInforResult;
} & BaseApiResponse;

export type PaymentApiResponse = {
	success: boolean;
	message: string;
	data: PaymentResult;
} & BaseApiResponse;
