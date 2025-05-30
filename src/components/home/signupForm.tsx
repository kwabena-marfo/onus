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
        "grid w-full gap-3 z-50 bg-white p-4 rounded-md",
        className
      )}
    >
      <div className="flex flex-col gap-0 justify-center items-center ">
        <p className="text-3xl md:text-6xl font-bold">Get Started</p>
        <p className="text-center">
          Your Journey to Spritual Growth Begins here
        </p>
      </div>
      <div className="grid gap-1">
        <Label htmlFor="name">Your Name</Label>
        <Input id="name" />
      </div>
      <div className="grid gap-1">
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
      <div className="flex flex-col">
        <Button type="submit" className="rounded-md bg-[#fa9a40]">
          Submit
        </Button>
        <p className="text-center ">Or</p>
        <Button type="submit" variant="outline" className="rounded-md ">
          <FaGoogle /> Sign Up With Google
        </Button>
      </div>
    </form>
  );
}
