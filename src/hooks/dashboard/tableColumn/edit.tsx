import { Button } from "@/components/ui/button";

import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

import { BsPen } from "react-icons/bs";

import { ScrollArea } from "@/components/ui/scroll-area";
import CreateMemberComp from "../../components/createMember";

export default function EditMember({ member, mutateGetMembers }: any) {
  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer">
        <div className="flex gap-2 items-center px-2">
          <BsPen />
          <p>Edit Member</p>
        </div>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <ScrollArea className="h-full max-h-screen py-6 px-4">
          <CreateMemberComp
            member={member}
            mutateGetMembers={mutateGetMembers}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
