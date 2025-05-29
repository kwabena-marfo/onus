import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import LayoutComp from "@/components/layoutComp";

const montserrat = Montserrat({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Onus",
  description: "Observing, Navigating and Understanding Scripture",
};

export default function RootLayout({
  children,
  signupModal,
  loginModal,
}: Readonly<{
  children: React.ReactNode;
  signupModal: React.ReactNode;
  loginModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${montserrat.variable} antialiased`}>
        <LayoutComp>{children}</LayoutComp>
        {signupModal}
        {loginModal}
      </body>
    </html>
  );
}
