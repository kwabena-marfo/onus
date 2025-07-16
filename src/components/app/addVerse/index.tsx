/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMediaQuery } from "react-responsive";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerTrigger,
} from "@/components/ui/drawer";

import AddVerseForm from "./form";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function AddVerseModal({ TriggerComp, verse }: any) {
  const isDesktop = useMediaQuery({
    query: "(min-width: 1224px)",
  });

  return (
    <>
      {isDesktop ? (
        <Dialog>
          <DialogTrigger>
            <TriggerComp />
          </DialogTrigger>
          <DialogContent className="min-w-2xl">
            <ScrollArea className="max-h-[80vh] py-6 px-4">
              <div className="flex items-center gap-2">
                <AddVerseForm verse={verse} />
              </div>
            </ScrollArea>
          </DialogContent>
        </Dialog>
      ) : (
        <Drawer>
          <DrawerTrigger>
            <TriggerComp />
          </DrawerTrigger>
          <DrawerContent className="h-screen max-h-screen flex flex-col">
            <ScrollArea className="flex-1 overflow-y-auto px-4 py-6">
              <AddVerseForm verse={verse} />
            </ScrollArea>
            <DrawerFooter className="pt-2">
              <DrawerClose asChild />
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
}
