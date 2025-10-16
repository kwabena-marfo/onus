import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import Provider from "@/components/home/provider";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";

const montserrat = Poppins({
  weight: ["100"],
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
      <body className={`${montserrat} antialiased`}>
        <NextTopLoader />
        <Provider>{children}</Provider>
        <Toaster />
      </body>
    </html>
  );
}
