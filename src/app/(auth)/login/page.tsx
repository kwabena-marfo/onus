import LoginForm from "@/components/auth/loginForm";
import { Suspense } from "react";

export default function LoginPage() {
  return (
    <Suspense>
      <div className="justify-self-center items-center z-50   bg-white p-4 px-8 rounded-md border mt-4">
        <LoginForm />
      </div>
    </Suspense>
  );
}
