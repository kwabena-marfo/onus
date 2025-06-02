import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaGoogle } from "react-icons/fa";
import Link from "next/link";
import { LuLogIn } from "react-icons/lu";

export default function LoginForm({ className }: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(
        "grid w-full gap-3 z-50 bg-white p-4 rounded-md",
        className
      )}
    >
      <div className="flex flex-col gap-1 justify-center items-center">
        <p className="text-3xl md:text-6xl font-bold">Login</p>
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
        <Link href="/dashboard" className="w-full">
          <Button type="submit" className="rounded-md bg-[#fa9a40] w-full">
            Login <LuLogIn className="" />
          </Button>
        </Link>
        <p className="text-center">Or</p>
        <Button type="submit" variant="outline" className="rounded-md ">
          <FaGoogle /> Continue With Google
        </Button>
      </div>
    </form>
  );
}
