"use client";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";

import LoginForm from "@/components/home/loginForm";

export default function LoginModal() {
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
          <DialogTitle></DialogTitle>
          <DialogContent className="sm:max-w-[500px]  ">
            <LoginForm />
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
            <LoginForm />
            <DrawerFooter className="pt-2">
              <DrawerClose asChild></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
