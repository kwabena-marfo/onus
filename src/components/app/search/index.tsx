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
import SearchForm from "./form";

export default function Search({ TriggerComp }: any) {
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
          <DialogContent className="min-w-2xl">
            <div className="flex items-center gap-2">
              <SearchForm />
            </div>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger>
            <TriggerComp />
          </DrawerTrigger>
          <DrawerContent>
            <SearchForm />

            <DrawerFooter className="pt-2">
              <DrawerClose asChild></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
