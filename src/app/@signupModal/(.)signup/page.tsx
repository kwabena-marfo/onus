"use client";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";

import SignupForm from "@/components/signupForm";

export default function SignupModal() {
  const router = useRouter();
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
      {isDesktop ? (
        <Dialog
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              router.back();
            }
          }}
        >
          <DialogContent className="sm:max-w-[425px]">
            <SignupForm />
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer
          open={true}
          onOpenChange={(open) => {
            if (!open) {
              router.back();
            }
          }}
        >
          <DrawerContent>
            <SignupForm />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
