import ForgotPasswordForm from "@/components/auth/forgot-password";
import { Suspense } from "react";

export default function ForgotPasswordPage() {
  return (
    <Suspense
      fallback={
        <div className="flex justify-center items-center min-h-[200px]">
          Loading...
        </div>
      }
    >
      <div className="justify-self-center items-center z-50 w-full bg-white p-4 rounded-md border mt-4">
        <ForgotPasswordForm />
      </div>
    </Suspense>
  );
}
