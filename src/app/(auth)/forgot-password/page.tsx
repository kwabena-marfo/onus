"use client";

import { Suspense } from "react";
import dynamic from "next/dynamic";

const ResetPasswordForm = dynamic(
  () => import("@/components/auth/forgot-password"),
  { ssr: false }
);
export default function ForgotPasswordPage() {
  return (
    <Suspense>
      <div className="justify-self-center items-center z-50 w-full  bg-white p-4 rounded-md border mt-4">
        <ResetPasswordForm />
      </div>
    </Suspense>
  );
}
