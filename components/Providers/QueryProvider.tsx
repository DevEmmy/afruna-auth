'use client';

import { LayoutProps } from '@/components/utils/types/others';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient();

export default function QueryProvider({ children }: LayoutProps) {
	return (
		<QueryClientProvider client={queryClient}>
			{children}

			<ReactQueryDevtools initialIsOpen={false} buttonPosition="bottom-right" />
		</QueryClientProvider>
	);
}