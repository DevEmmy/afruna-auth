'use client';
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';
import { ScrollArea } from '@/components/ui/scroll-area';
import { LayoutProps } from '@/lib/types';
import SidebarMobile from './SidebarMobile';

const Layout = ({ children }: LayoutProps) => {
	const [sidebarMobile, setSidebarMobile] = useState(false);
	const openSidebar = () => {
		setSidebarMobile(true);
	};
	return (
		<div className="h-fit md:overflow-hidden">
			<div className="flex items-center">
				<div className="[@media(min-width:1200px)]:block hidden 2xl:w-[18%] xl:w-[22%] [@media(min-width:1200px)]:w-[25%] relative">
					<Sidebar />
				</div>
				<div className="w-full h-screen">
					<div className="overflow-hidden">
						<Header openSidebar={openSidebar} />
					</div>
					<ScrollArea className="mt-6 h-[85vh]">{children}</ScrollArea>
				</div>
			</div>
			<div className="">
				<SidebarMobile isOpen={sidebarMobile} handleClose={() => setSidebarMobile(false)} />
			</div>
		</div>
	);
};

export default Layout;
