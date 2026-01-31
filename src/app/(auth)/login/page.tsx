"use client";

import LoginForm from "@/components/auth/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <div className="justify-self-center items-center z-50 w-full bg-gray-800 p-4 rounded-md border border-gray-700 mt-4 shadow-lg">
        <LoginForm />
      </div>
    </Suspense>
  );
}
