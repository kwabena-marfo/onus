import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "@/components/ui/sonner";
import "@/styles/globals.css";
import AuthGuard from "@/components/home/authGuard";
import { ThemeProvider } from "@/components/home/theme-provider";
import QueryClientComp from "@/components/home/queryClient";

const montserrat = Poppins({
  weight: ["100"],
  subsets: ["latin"],
});

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Onus",
  description: "Observe, Navigate, Understand, Store",
  openGraph: {
    type: "website",
    siteName: "Onus",
    title: "Onus",
    description: "Observe, Navigate, Understand, Store",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
    title: "Onus",
    description: "Observe, Navigate, Understand, Store",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat} antialiased`}>
        <ThemeProvider>
          <NextTopLoader />
          <QueryClientComp>
            <AuthGuard>{children}</AuthGuard>
          </QueryClientComp>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  );
}
