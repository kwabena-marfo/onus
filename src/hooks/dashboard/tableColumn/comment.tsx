import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import useTriggerRequest from "@/hooks/global/useTriggerRequest";
import { useToast } from "@/components/ui/use-toast";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
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

import { Button } from "@/components/ui/button";
import {
  BsArchive,
  BsCardList,
  BsMessenger,
  BsPen,
  BsTrash,
} from "react-icons/bs";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { LuLoader } from "react-icons/lu";
import { format } from "date-fns";
import { Separator } from "@/components/ui/separator";

export default function Comment({ memberId, comments, mutateGetMembers }: any) {
  const { toast } = useToast();

  const [showNewComment, setShowNewComment] = useState<Boolean>(false);
  const [showComments, setShowComments] = useState<any>(false);
  const [showDeleteComment, setShowDeleteComment] = useState<any>(false);

  const {
    reqFunction: delComment,
    reqState: delCommentState,
    setReqState: resetDelCommentState,
  } = useTriggerRequest("secured");

  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    control,
    formState: { errors, isDirty },
  } = useForm({
    mode: "onChange",
    shouldUnregister: true,
  });

  const commentId = watch("commentId");

  const {
    reqFunction: createMember,
    reqState: createMemberStates,
    setReqState: resetCreateMemberStates,
  } = useTriggerRequest("secured");

  const onSubmit = async (data: any) => {
    await createMember({
      route: commentId
        ? "/api/update-member-comment"
        : "/api/create-member-comment",
      reqType: "post",
      data: { ...data, memberId, commentId },
    });
  };

  useEffect(() => {
    if (createMemberStates?.data) {
      resetCreateMemberStates(null);
      reset();
      mutateGetMembers();

      toast({
        variant: "default",
        title: "Comment Successfully added",
        description: "Congrats! Your upload has been succesful",
      });
      setShowComments(false);
    }
  }, [createMemberStates]);

  useEffect(() => {
    if (delCommentState?.data) {
      resetDelCommentState(null);
      reset();
      mutateGetMembers();

      toast({
        variant: "default",
        title: "Comment Successfully deleted",
        description: "Congrats! Your action has been succesful",
      });
      setShowComments(false);
      setShowDeleteComment(false);
    }
  }, [delCommentState]);

  return (
    <Dialog onOpenChange={setShowComments} open={showComments}>
      <DialogTrigger>
        <div className="flex gap-2 items-center px-2">
          <BsCardList />
          <p>Comment</p>
        </div>
        {/* <Button className="h-8" variant="outline" size="sm">
          <BsCardList />
        </Button> */}
      </DialogTrigger>
      <DialogContent
        className="pt-20 "
        onInteractOutside={(event) => event.preventDefault()}
      >
        <ScrollArea className="h-full max-h-screen px-2 flex flex-col gap-3">
          {showNewComment ? (
            <form
              id="addComment"
              className="flex flex-col gap-2 "
              onSubmit={handleSubmit(onSubmit)}
            >
              <Controller
                control={control}
                name="comment"
                rules={{ required: "Required" }}
                render={({
                  field: { onChange, value },
                  fieldState: { error },
                }: any) => {
                  return (
                    <>
                      <Label htmlFor="comment">
                        {commentId ? "Edit Comment" : "Type Comment"}{" "}
                      </Label>
                      <Textarea onChange={onChange} value={value || ""} />
                      {error && (
                        <p className="text-red-500 text-sm">{error.message}</p>
                      )}
                    </>
                  );
                }}
              />{" "}
              <div>
                <Button
                  disabled={createMemberStates?.pending || !isDirty}
                  className="w-full text-gray-900"
                >
                  {createMemberStates?.pending && (
                    <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {commentId ? "Edit Comment" : "Submit Comment"}
                </Button>
                {createMemberStates?.error ? (
                  <p className="text-red-500 text-sm text-center">
                    Sorry, an error occured.
                  </p>
                ) : null}
              </div>
            </form>
          ) : null}
          <div className="my-4 mt-2">
            <Button
              variant="outline"
              size="sm"
              type="button"
              className="w-full "
              onClick={() => {
                reset();
                setShowNewComment((OS: any) => !OS);
              }}
            >
              {!showNewComment ? "Add Comment" : "Cancel"}
            </Button>
          </div>

          {comments?.length ? (
            <>
              <p className="text-md font-bold text-left">Added Comments</p>
              <Accordion type="single" collapsible className="w-full">
                {comments?.map(({ comment, date, id }: any, index: any) => (
                  <AccordionItem
                    className="border p-0 px-2 rounded-md mb-1"
                    value={date}
                    key={id}
                  >
                    <AccordionTrigger className="">
                      <div className="flex flex-col justify-start items-start ">
                        <p className="font-bold text-gray-800 text-left line-clamp-1">
                          {comment}
                        </p>
                        <p className="text-xs">
                          {format(new Date(date), "MM/dd/yy")}{" "}
                        </p>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-3">
                      {comment}
                      <Separator />
                      <div className="flex justify-end gap-2">
                        <Button
                          onClick={() => {
                            setShowNewComment(true);
                            setValue("comment", comment);
                            setValue("commentId", id);

                            document
                              .getElementById("addComment")
                              ?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                              });
                          }}
                          variant="outline"
                          size="sm"
                          className="h-8"
                        >
                          <BsPen />
                        </Button>

                        <Dialog
                          onOpenChange={setShowDeleteComment}
                          open={showDeleteComment}
                        >
                          <DialogTrigger>
                            <Button variant="outline" size="sm" className="h-8">
                              <BsTrash className="text-red-400" />
                            </Button>
                          </DialogTrigger>
                          <DialogContent>
                            <p className="text-center">
                              This action cannot be undone. This will
                              permanently delete this comment
                            </p>
                            <DialogFooter className="flex justify-center flex-row gap-2">
                              <Button
                                onClick={async () => {
                                  await delComment({
                                    route: `/api/delete-member-comment/?commentId=${id}`,
                                    reqType: "post",
                                  });
                                  mutateGetMembers();
                                }}
                                type="button"
                                className="text-gray-800"
                              >
                                {delCommentState?.pending && (
                                  <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                                )}
                                Continue
                              </Button>
                              <Button
                                variant="outline"
                                onClick={() => setShowDeleteComment(false)}
                                className="text-gray-800"
                              >
                                Cancel
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </>
          ) : (
            <p className="text-center">No Comments Added</p>
          )}
        </ScrollArea>
      </DialogContent>
    </Dialog>
  );
}
