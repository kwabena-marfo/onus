"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { authClient } from "@/lib/authClient";

const PUBLIC_ROUTES = ["/", "/login", "/register", "/forgot-password"];

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const session = await authClient.getSession();

        const isPublic = PUBLIC_ROUTES.includes(pathname);

        // ❌ Not logged in & trying to access protected route
        if (!session?.data?.user && !isPublic) {
          router.replace("/");
          return;
        }

        // ✅ Logged in & trying to access auth pages
        if (session?.data?.user && isPublic && pathname !== "/") {
          router.replace("/app/dashboard");
          return;
        }
      } catch {
        router.replace("/login");
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [pathname, router]);

  // Prevent flash of protected content
  if (loading) return null;

  return <>{children}</>;
}
