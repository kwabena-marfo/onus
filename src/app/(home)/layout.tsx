import type { Metadata } from "next";

import LayoutComp from "@/components/home/layoutComp";

export const metadata: Metadata = {
  title: "Onus",
  description: "Observing, Navigating and Understanding Scripture",
};

export default function HomeLayout({
  children,
  signupModal,
  loginModal,
}: Readonly<{
  children: React.ReactNode;
  signupModal: React.ReactNode;
  loginModal: React.ReactNode;
}>) {
  return (
    <>
      <LayoutComp>
        {children}
        {!!children && signupModal}
        {!!children && loginModal}
      </LayoutComp>
    </>
  );
}
