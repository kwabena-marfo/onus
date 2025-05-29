import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";

export default function SignupForm({
  className,
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(
        "grid justify-self-center md:max-w-2/3 max-w-7/8 w-full  items-center bg-white/90  gap-4 shadow-lg rounded-md p-5 z-50",
        className
      )}
    >
      <div className="flex flex-col gap-0 justify-center items-center">
        <p className="text-3xl font-bold">Get Started</p>
        <p className="text-center">
          Your Journey to Spritual Growth Begins here
        </p>
      </div>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" />
        </div>
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" />
      </div>
      <div className="grid gap-1">
        <Label htmlFor="password">Choose Password</Label>
        <Input id="password" />
      </div>{" "}
      <div className="grid gap-1">
        <Label htmlFor="password">Confirm Password</Label>
        <Input id="password" />
      </div>{" "}
      <div className="flex flex-col p-1">
        <Button type="submit">Submit</Button>
        <p className="text-center">Or</p>
        <Button type="submit">
          <FaGoogle /> Sign Up With Google
        </Button>
      </div>
    </form>
  );
}
