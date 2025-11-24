import SignupForm from "@/components/auth/signupForm";
import { Suspense } from "react";

export default function SignupPage() {
  return (
    <Suspense>
      <div className="justify-self-center items-center z-50 w-full  bg-white p-4 rounded-md border mt-4">
        <SignupForm />
      </div>{" "}
    </Suspense>
  );
}
