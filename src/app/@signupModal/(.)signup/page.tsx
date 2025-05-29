// import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  // DialogDescription,
  // DialogHeader,
  // DialogTitle,
} from "@/components/ui/dialog";
// import {
//   Drawer,
//   DrawerClose,
//   DrawerContent,
//   DrawerDescription,
//   DrawerFooter,
//   DrawerHeader,
//   DrawerTitle,
//   DrawerTrigger,
// } from "@/components/ui/drawer";

// import SignupForm from "@/app/signup/components/signup";

export default function SignupModal() {
  const router = useRouter();
  // const isDesktop = useMediaQuery({
  //   query: "(min-width: 1224px)",
  // });

  return (
    <Dialog
      modal={true}
      open={true}
      onOpenChange={(open) => {
        if (!open) {
          router.back();
        }
      }}
    >
      <DialogContent
        className="w-full max-w-[650px] py-10 my-10"
        onInteractOutside={(event) => event.preventDefault()}
      >
        sssssssssssssssss
      </DialogContent>
    </Dialog>
    // <>
    //   {isDesktop ? (
    //     <Dialog
    //       open={true}
    //       onOpenChange={(open) => {
    //         if (!open) {
    //           router.back();
    //         }
    //       }}
    //     >
    //       <DialogTrigger asChild>
    //         <Button variant="link">Sign Up</Button>
    //       </DialogTrigger>
    //       <DialogContent className="sm:max-w-[425px]">
    //         <DialogHeader>
    //           <DialogTitle>Edit profile</DialogTitle>
    //           <DialogDescription>
    //             Make changes to your profile here. Click save when done.
    //           </DialogDescription>
    //         </DialogHeader>
    //         <SignupForm />
    //       </DialogContent>
    //     </Dialog>
    //   ) : (
    //     <Drawer
    //       onOpenChange={(open) => {
    //         if (!open) {
    //           router.back();
    //         }
    //       }}
    //     >
    //       <DrawerTrigger asChild>
    //         <Button variant="link">Sign Up</Button>
    //       </DrawerTrigger>
    //       <DrawerContent>
    //         <DrawerHeader className="text-left">
    //           <DrawerTitle>Edit profile</DrawerTitle>
    //           <DrawerDescription>
    //             Make changes to your profile here. Click save when done.
    //           </DrawerDescription>
    //         </DrawerHeader>
    //         <SignupForm />
    //         <DrawerFooter className="pt-2">
    //           <DrawerClose asChild>
    //             <Button variant="outline">Cancel</Button>
    //           </DrawerClose>
    //         </DrawerFooter>
    //       </DrawerContent>
    //     </Drawer>
    //   )}
    // </>
  );
}
