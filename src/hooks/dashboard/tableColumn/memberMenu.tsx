import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { DropdownMenuArrow } from "@radix-ui/react-dropdown-menu";

import { HiOutlineMenu } from "react-icons/hi";
import { BsChat, BsTelephone, BsWhatsapp } from "react-icons/bs";
import EditMember from "./edit";
import Comment from "./comment";

export default function MemberMenu({
  member,
  mutateGetMembers,
  comments,
}: any) {
  return (
    <DropdownMenu modal={true}>
      <DropdownMenuTrigger asChild>
        <Button className="h-8 border-0" variant="outline" size="sm">
          <HiOutlineMenu className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuArrow />
        <DropdownMenuLabel>Actions</DropdownMenuLabel>

        {/* <DropdownMenuSeparator />
        <DropdownMenuItem className="flex items-center space-x-1">
          <BsTelephone />
          <p>Call</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-1">
          <BsWhatsapp />
          <p>WhatsApp</p>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex items-center space-x-1">
          <BsChat />
          <p>Text</p>
        </DropdownMenuItem>
        <DropdownMenuSeparator /> */}
        <div className="flex flex-col ">
          <Comment
            memberId={member.id}
            comments={comments}
            mutateGetMembers={mutateGetMembers}
          />
          <DropdownMenuSeparator />

          <EditMember member={member} mutateGetMembers={mutateGetMembers} />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
