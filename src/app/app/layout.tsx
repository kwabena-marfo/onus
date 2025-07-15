/* eslint-disable @typescript-eslint/no-explicit-any */

import type { Metadata } from "next";

import Header from "@/components/app/header";
import Aside from "@/components/app/aside";

export const metadata: Metadata = {
  title: "Onus",
  description: "Observing, Navigating and Understanding Scripture",
};

export default function LoggedInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
  newQuize: React.ReactNode;
}>) {
  return (
    <>
      <Header />
      <Aside />
      {children}
    </>
  );
}
