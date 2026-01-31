import SignupForm from "@/components/auth/signupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense>
      <div className="justify-self-center items-center z-50 w-full bg-gray-800 p-4 rounded-md border border-gray-700 mt-4 shadow-lg">
        <SignupForm />
      </div>
    </Suspense>
  );
}
