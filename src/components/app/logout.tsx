/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { authClient } from "@/lib/authClient";
import { useRouter } from "next/navigation";

import { LucideLoader2 } from "lucide-react";
import { LuLogOut } from "react-icons/lu";

export default function Logout({ TriggerComp }: any) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);

    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          setOpen(false);
          router.push("/");
        },
      },
    });

    setLogoutLoading(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <TriggerComp />
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action will log you out of the app.
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={logoutLoading}
          >
            Cancel
          </Button>

          <Button
            onClick={handleLogout}
            disabled={logoutLoading}
            className="bg-red-900 hover:bg-red-800"
          >
            <div className="flex items-center gap-2">
              {logoutLoading ? (
                <LucideLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LuLogOut className="h-4 w-4" />
              )}
              <span>Continue</span>
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
