/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Metadata } from "next";

import Header from "@/components/loggedIn/header";
import Aside from "@/components/loggedIn/aside";
import Footer from "@/components/loggedIn/footer";

export const metadata: Metadata = {
  title: "Onus",
  description: "Observing, Navigating and Understanding Scripture",
};

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Aside />
      {children}
      <Footer />
    </>
  );
}
