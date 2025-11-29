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
import NewQuizeForm from "./form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function NewQuizeModal({ TriggerComp, book }: any) {
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
          <DialogContent
            onInteractOutside={(event) => event.preventDefault()}
            className="min-w-2xl"
          >
            <ScrollArea className="min-h-[300px]  py-6 px-4">
              <div className="flex items-center gap-2">
                <NewQuizeForm book={book} />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger>
            <TriggerComp />
          </DrawerTrigger>
          <DrawerContent>
            <ScrollArea className="min-h-[300px] py-6 px-4">
              <NewQuizeForm book={book} />
            </ScrollArea>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild></DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
