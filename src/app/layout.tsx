import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "./Header/Header";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ben Shephard",
  description: "",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' className='scroll-smooth'>
      <body className={inter.className}>
        <div className="">
          
          <Header />

          <div className="h-[calc(100vh-2.5rem)] w-full">
            {/* <main id='main'> */}
              {children}
            {/* </main> */}
          </div>

        </div>
      </body>
    </html>
  );
}
