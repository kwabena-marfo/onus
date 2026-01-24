/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { BsTrash } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";
import { AxiosError } from "axios";

export default function DeleteVerse({
  ids,
  deletePost,
  deletePostLoading,
  deletePostError,
  isDeletePostError,
}: any) {
  const [open, setOpen] = useState(false);

  const handleDelete = async () => {
    try {
      await deletePost(ids);
      toast("Verse Deleted succesfully");
      // setOpen(false); // ✅ only close after success
    } catch (error) {
      console.log(error);
      toast("Sorry an error occured");
    }
  };

  return (
    <div className="flex justify-center">
      <Button
        size="sm"
        variant="ghost"
        onClick={() => setOpen(true)}
        className="text-red-800 justify-self-center"
      >
        Remove Verse <BsTrash className="w-4 h-4" />
      </Button>

      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete your
              selected item(s).
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setOpen(false)}>
              Cancel
            </AlertDialogCancel>
            <Button
              className="bg-red-600 text-white hover:bg-red-700"
              disabled={deletePostLoading}
              onClick={handleDelete}
            >
              {deletePostLoading ? (
                <>
                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Continue"
              )}
            </Button>
            {isDeletePostError ? (
              <p className="text-left text-red-500">
                {(deletePostError as AxiosError<{ error: string }>)?.response
                  ?.data?.error || "Something went wrong"}
              </p>
            ) : null}{" "}
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
