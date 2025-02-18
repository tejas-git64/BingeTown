import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import Sidenav from "@/components/Sidenav/Sidenav";
import { GlobalContext } from "@/store/GlobalStore";
import { Metadata } from "next";
import { AuthProvider } from "@/auth/AuthContext";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

const quicksand = Quicksand({
  variable: "--font-quicksand",
  display: "swap",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "BingeTown",
  description: "Watch Movies, TV Shows, and more!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${quicksand.variable} grid w-full place-items-center scroll-smooth bg-neutral-950 font-quicksand antialiased`}
      >
        <div className="relative flex h-auto min-h-[100dvh] w-full max-w-[2160px] flex-col items-center justify-start overflow-x-hidden border-2 border-black">
          <GlobalContext>
            <AuthProvider>
              <Nav />
              <Sidenav />
              <div className="h-full w-full overflow-hidden">
                {children}
                <Analytics />
                <SpeedInsights />
              </div>
            </AuthProvider>
          </GlobalContext>
          <Footer />
        </div>
      </body>
    </html>
  );
}
