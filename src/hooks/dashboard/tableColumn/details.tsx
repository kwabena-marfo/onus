import Highlighter from "react-highlight-words";

import MemberInfo from "../../components/memberInfo";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";

export default function Details({
  data: { mutateGetMembers, member, searchQuery },
}: any) {
  const { fullname, memberID, membershipType, officerRank } = member;
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex  flex-col md:flex-row items-start md:items-center gap-0 md:gap-1 md:divide-x-2">
          <p className="line-clamp-1 text-left">
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={fullname}
            />
          </p>
          <p className="text-xs line-clamp-1 text-left md:pl-1">
            <Highlighter
              searchWords={[searchQuery]}
              autoEscape={true}
              textToHighlight={memberID}
            />{" "}
            -
            {membershipType == "Officer" ? (
              <Highlighter
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={officerRank}
              />
            ) : (
              <Highlighter
                searchWords={[searchQuery]}
                autoEscape={true}
                textToHighlight={membershipType}
              />
            )}
          </p>
        </div>
      </DialogTrigger>
      <DialogContent onInteractOutside={(event) => event.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="text-center">Member Details</DialogTitle>
        </DialogHeader>
        <ScrollArea className="h-full max-h-screen py-6 px-4">
          <MemberInfo
            mutateGetMembers={mutateGetMembers}
            searchQuery={searchQuery}
            info={member}
          />
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
