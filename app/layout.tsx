import { Quicksand } from "next/font/google";
import "./globals.css";
import Footer from "@/components/Footer/Footer";
import Nav from "@/components/Nav/Nav";
import Sidenav from "@/components/Sidenav/Sidenav";
import { AuthProvider } from "@/auth/AuthContext";
import { GlobalContext } from "@/store/GlobalStore";
import { Metadata } from "next";

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
        className={`${quicksand.variable} grid w-full flex-shrink-0 place-items-center scroll-smooth bg-black font-quicksand antialiased`}
      >
        <div className="max-h-auto relative flex min-h-[100dvh] w-full max-w-[2160px] flex-shrink-0 flex-col items-center justify-start overflow-x-hidden">
          <Nav />
          <AuthProvider>
            <GlobalContext>
              <Sidenav />
              {children}
            </GlobalContext>
          </AuthProvider>
          <Footer />
        </div>
      </body>
    </html>
  );
}
