'use client';

import store from '@/contexts/store';
import { LayoutProps } from '@/components/utils/types/others';
import { Provider } from 'react-redux';
import { persistStore } from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

export default function StoreProvider({ children }: LayoutProps) {
	let persistor = persistStore(store);

	return (
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				{children}
			</PersistGate>
		</Provider>
	);
}
