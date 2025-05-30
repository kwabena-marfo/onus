import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "@/styles/globals.css";

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
}: Readonly<{
  children: React.ReactNode;
  signupModal: React.ReactNode;
  loginModal: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <NextTopLoader />
        {children}
      </body>
    </html>
  );
}
