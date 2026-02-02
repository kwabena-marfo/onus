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

import { LucideLoader2, CheckCircle, XCircle } from "lucide-react";
import { LuLogOut } from "react-icons/lu";

export default function Logout({ TriggerComp }: any) {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [logoutLoading, setLogoutLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleLogout = async () => {
    setLogoutLoading(true);
    setError(null);
    setSuccess(false);

    try {
      await authClient.signOut();

      setSuccess(true);
      router.push("/");
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLogoutLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) {
          setError(null);
          setSuccess(false);
        }
      }}
    >
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

        {/* ✅ SUCCESS MESSAGE */}
        {success && (
          <div className="flex items-center gap-2 text-green-600 text-sm">
            <CheckCircle className="h-4 w-4" />
            Logged out successfully
          </div>
        )}

        {/* ❌ ERROR MESSAGE */}
        {error && (
          <div className="flex items-center gap-2 text-red-600 text-sm">
            <XCircle className="h-4 w-4" />
            {error}
          </div>
        )}

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
            disabled={logoutLoading || success}
            className="bg-red-900 hover:bg-red-800"
          >
            <div className="flex items-center gap-2">
              {logoutLoading ? (
                <LucideLoader2 className="h-4 w-4 animate-spin" />
              ) : (
                <LuLogOut className="h-4 w-4" />
              )}
              <span>
                {logoutLoading
                  ? "Logging out..."
                  : success
                    ? "Done"
                    : "Continue"}
              </span>
            </div>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
