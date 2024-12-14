import { getCartCredentails, getWishlistCredentails, productDetailsProps } from '@/lib/types';
import { PayloadAction, createSlice } from '@reduxjs/toolkit';

interface ProductsStates {
	category: string;
	type: string;
	product: string;
	hypeProducts: productDetailsProps[];
	trendingProducts: productDetailsProps[];
	frequentProducts: productDetailsProps[];
	wishlistPrices: any[];
	wishlistProducts: productDetailsProps[];
	allProducts: productDetailsProps[];
	oneProduct: productDetailsProps;
	cartItems: getCartCredentails;
	wishlistItems: getWishlistCredentails;
	redirect_url: string;
	enabled: boolean;
}

const initialState: ProductsStates = {
	category: '',
	type: '',
	product: '',
	hypeProducts: [],
	trendingProducts: [],
	frequentProducts: [],
	wishlistProducts: [],
	wishlistPrices: [],
	allProducts: [],
	oneProduct: {} as productDetailsProps,
	cartItems: {} as getCartCredentails,
	wishlistItems: {} as getWishlistCredentails,
	redirect_url: '',
	enabled: false,
};

const landingpageSlice = createSlice({
	name: 'landingpage',
	initialState,
	reducers: {
		setCategoryId(state, action: PayloadAction<string>) {
			state.category = action.payload;
		},
		setProducId(state, action: PayloadAction<string>) {
			state.product = action.payload;
		},
		getTrendingProductData(state, action: PayloadAction<any>) {
			state.trendingProducts = action.payload;
		},
		getFrequentProductData(state, action: PayloadAction<productDetailsProps[]>) {
			state.frequentProducts = action.payload;
		},
		getHypeProductData(state, action: PayloadAction<productDetailsProps[]>) {
			state.hypeProducts = action.payload;
		},
		getWishlistProductData(state: ProductsStates, action: PayloadAction<productDetailsProps[]>) {
			state.wishlistProducts = action.payload;
		},
		removeWishlistProductData(state, action: PayloadAction<string>) {
			const removeItem = state.wishlistProducts?.filter(
				(product) => product?._id !== action.payload,
			);
			state.wishlistProducts = removeItem;
		},
		WishlistProductPricesData(state, action: PayloadAction<any[]>) {
			state.wishlistPrices = action.payload;
		},
		clearWishlist(state) {
			state.wishlistProducts = [];
			state.wishlistPrices = [];
		},
		getAllProductData(state, action: PayloadAction<productDetailsProps[]>) {
			state.allProducts = action.payload;
		},
		getOneProductData(state, action: PayloadAction<productDetailsProps>) {
			state.oneProduct = action.payload;
		},
		getCartItemData(state, action: PayloadAction<getCartCredentails>) {
			state.cartItems = action.payload;
		},

		getWishlistItemData(state, action: PayloadAction<getWishlistCredentails>) {
			state.wishlistItems = action.payload;
		},
		setType(state, action: PayloadAction<string>) {
			state.type = action.payload;
		},
		setRedirectUrl(state, action: PayloadAction<string>) {
			state.redirect_url = action.payload;
		},
		setEnabled(state, action: PayloadAction<boolean>) {
			state.enabled = action.payload;
		},
		logoutAction_: (state) => {
			state.wishlistProducts = [];
			state.hypeProducts = [];
			state.trendingProducts = [];
			state.frequentProducts = [];
			state.wishlistPrices = [];
			state.allProducts = [];
			state.category = '';
			state.product = '';
			(state.enabled = false), (state.oneProduct = {} as productDetailsProps);
		},
	},
});

export const {
	setCategoryId,
	setProducId,
	getTrendingProductData,
	getFrequentProductData,
	getHypeProductData,
	getWishlistProductData,
	removeWishlistProductData,
	WishlistProductPricesData,
	clearWishlist,
	getAllProductData,
	getOneProductData,
	getCartItemData,
	getWishlistItemData,
	logoutAction_,
	setType,
	setRedirectUrl,
	setEnabled,
} = landingpageSlice.actions;

export default landingpageSlice.reducer;
