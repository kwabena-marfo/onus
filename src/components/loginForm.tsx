import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";

export default function LoginForm({ className }: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(
        "grid justify-self-center items-center bg-white/90  gap-4 shadow-lg rounded-md p-5 z-50",
        className
      )}
    >
      <div className="flex flex-col gap-0 justify-center items-center">
        <p className="text-3xl font-bold">Login</p>
        <p className="text-center">Continue Your Journey to Spritual Growth.</p>
      </div>
      <div className="grid gap-2">
        <div className="grid gap-1">
          <Label htmlFor="name">Your Name</Label>
          <Input id="name" />
        </div>
        <div className="grid gap-1">
          <Label htmlFor="password">Password</Label>
          <Input id="password" />
        </div>{" "}
      </div>

      <div className="flex flex-col p-1">
        <Button type="submit">Login</Button>
        <p className="text-center">Or</p>
        <Button type="submit">
          <FaGoogle /> Continue With Google
        </Button>
      </div>
    </form>
  );
}
