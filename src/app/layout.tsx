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

export const metadata: Metadata = {
  title: "Onus",
  description: "Observe, Navigate, Understand, Store",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
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
