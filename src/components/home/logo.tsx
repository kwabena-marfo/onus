"use client";

import Image from "next/image";
import { useTheme } from "next-themes";

export default function Logo() {
  const { resolvedTheme } = useTheme();

  if (!resolvedTheme) return null;

  const isDark = resolvedTheme === "dark";

  return (
    <Image
      priority
      width={36}
      height={36}
      src={
        isDark
          ? "/imgs/logos/onusLogoWhite.png"
          : "/imgs/logos/onusLogoChosen.png"
      }
      alt="Onus logo"
    />
  );
}
