/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from "@/components/ui/button";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { RiRestartLine } from "react-icons/ri";

export default function Reset({
  data: {
    table,
    setSortingToggle,
    setshowSelectToggle,
    setQueryBuilder,
    setQueryMembersResults,
  },
}: any) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button size="sm" variant="ghost">
          <RiRestartLine className="w-4 h-4" />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will reset all states associated
            with this table.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => {
              table.resetColumnVisibility();
              table.resetSorting();
              table.resetRowSelection();
              setSortingToggle(false);
              setshowSelectToggle(false);
              setQueryBuilder();
              setQueryMembersResults({});
            }}
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
