/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";

import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BsTrash } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";

export default function Delete({
  table,
  setQueryBuilder,
  mutateGetMembers,
  delMember,
  delMemberState,
}: any) {
  const [delDialogueToggle, setDelDialogueToggle] = useState<any>();

  return (
    <Dialog open={delDialogueToggle} onOpenChange={setDelDialogueToggle}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <BsTrash className="w-4 h-4 text-red-800" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you sure absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            className="text-black"
            onClick={async () => {
              await delMember({
                route: `/api/app/member?ids=${JSON.stringify(
                  table
                    .getFilteredSelectedRowModel()
                    ?.rows?.map(({ original }: any) => original?._id)
                )}`,
                reqType: "delete",
              });
              mutateGetMembers();
              setQueryBuilder((state: any) => {
                return {
                  ...state,
                };
              });
              setDelDialogueToggle(false);
            }}
          >
            {delMemberState?.pending ? (
              <>
                <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                Sending Request
              </>
            ) : (
              "Continue"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
