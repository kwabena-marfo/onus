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

import { BsTrash, BsX } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";

export default function Delete({
  table,
  // setQueryBuilder,
  onusId,
  mutateGetOnus,
  delMember,
  delMemberState,
}: any) {
  const [delDialogueToggle, setDelDialogueToggle] = useState<any>();

  return (
    <Dialog open={delDialogueToggle} onOpenChange={setDelDialogueToggle}>
      <DialogTrigger asChild>
        <Button size="sm" variant="ghost">
          {table ? (
            <BsTrash className="w-4 h-4 text-red-800" />
          ) : (
            <BsX className="w-4 h-4 text-red-800" />
          )}
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
            type="button"
            disabled={delMemberState?.pending}
            className="text-black bg-red-400"
            onClick={async () => {
              try {
                await delMember({
                  route: `/api/app/delete-onus?ids=${JSON.stringify(
                    table
                      ? table
                          ?.getFilteredSelectedRowModel()
                          ?.rows?.map(({ original }: any) => original?._id)
                      : [onusId]
                  )}`,
                  reqType: "delete",
                });

                mutateGetOnus();
                // setDelDialogueToggle(false); // ✅ close after mutation
              } catch (error) {
                console.error("Delete failed:", error);
                // optionally show error message to user here
              }
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
