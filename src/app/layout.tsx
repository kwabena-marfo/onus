import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Provider from "@/components/home/provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const montserrat = Roboto({
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
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} antialiased`}>
        <NextTopLoader />
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
