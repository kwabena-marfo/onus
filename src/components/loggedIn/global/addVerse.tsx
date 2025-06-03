/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useMediaQuery } from "react-responsive";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { DialogTrigger } from "@radix-ui/react-dialog";
import { Input } from "@/components/ui/input";

export default function AddVerseModal({ TriggerComp }: any) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger className="cursor-pointer">
            <TriggerComp />
          </DialogTrigger>
          <DialogContent className="min-w-4xl">
            <div className="flex items-center gap-2">
              <Input />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger>
            <TriggerComp />
          </DrawerTrigger>
          <DrawerContent>
            <Input />

            <DrawerFooter className="pt-2">
              <DrawerClose asChild></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
