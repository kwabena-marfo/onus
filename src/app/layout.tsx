import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "@/styles/globals.css";
import LayoutComp from "@/components/home/layout";

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
}: Readonly<{
  children: React.ReactNode;
  signupModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={` ${montserrat.variable} antialiased`}>
        {signupModal}
        <LayoutComp>{children}</LayoutComp>
      </body>
    </html>
  );
}
