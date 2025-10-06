import LoginForm from "@/components/auth/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <div className="justify-self-center items-center z-50  md:w-4/6">
        <LoginForm />
      </div>
    </Suspense>
  );
}
