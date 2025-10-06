import type { Metadata } from "next";

import "@/styles/globals.css";
import LayoutComp from "@/components/home/layoutComp";

export const metadata: Metadata = {
  title: "Onus",
  description: "Observing, Navigating and Understanding Scripture",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <LayoutComp>{children}</LayoutComp>;
}
