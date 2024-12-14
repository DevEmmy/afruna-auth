import type { Metadata } from 'next';
import { Outfit } from 'next/font/google';
import './globals.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import StoreProvider from '@/components/Providers/StoreProvider';
import { NextUIProvider } from '@nextui-org/react';
import QueryProvider from '@/components/Providers/QueryProvider';
import { Toaster } from '@/components/ui/toaster';
import RedirectLogicLayout from '@/components/layouts/RedirectLogicLayout';

const outfit = Outfit({
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-outfit',
	weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
	title: 'Afruna Website',
	description: 'Afruna Website',
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
			<body className={outfit.className}>
				<RedirectLogicLayout />
				<StoreProvider>
					<QueryProvider>
						<NextUIProvider>{children}</NextUIProvider>
					</QueryProvider>
				</StoreProvider>
				<Toaster />
			</body>
		</html>
	);
}
