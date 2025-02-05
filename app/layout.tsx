"use client";

import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import Sidenav from "@/components/Sidenav/Sidenav";
import { createContext, useEffect, useState } from "react";

// import Profile from "../components/Profile/Profile";
import { usePathname } from "next/navigation";
import { LayoutContextTypes } from "@/types/LayoutTypes";

const quicksand = Quicksand({
	variable: "--font-quicksand",
	display: "swap",
	subsets: ["latin"],
});

export const LayoutContext = createContext<LayoutContextTypes | null>(null);
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	const [name, setName] = useState<string>("");
	const [profilePage, setProfilePage] = useState(false);
	const [sideNav, setSideNav] = useState(false);
	const path = usePathname();
	const [svg, setSvg] = useState<number>(0);

	// useEffect(() => {
	// 	window.scrollTo({
	// 		top: 0,
	// 		behavior: "smooth",
	// 	});
	// }, [path]);

	useEffect(() => {
		const number = Math.floor(Math.random() * 2000) + 1;
		setSvg(number);
	}, []);

	return (
		<html lang='en'>
			<body
				className={`${quicksand.variable} bg-black scroll-smooth w-full font-quicksand antialiased grid place-items-center`}>
				<div className='flex max-h-auto min-h-[100dvh] w-full relative max-w-[2160px] flex-col items-center justify-start overflow-x-hidden'>
					<LayoutContext.Provider
						value={{
							name,
							setName,
							profilePage,
							setProfilePage,
							sideNav,
							setSideNav,
						}}>
						{path !== "/search" && <Nav />}
						<Sidenav svg={svg} />
						{children}
						{/* <Profile svg={svg} /> */}
					</LayoutContext.Provider>
					<Footer />
				</div>
			</body>
		</html>
	);
}
