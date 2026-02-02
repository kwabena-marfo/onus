/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import Content from "@/components/app/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { BsPerson } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";

import { authClient } from "@/lib/authClient";
import axios from "axios";

type ProfileForm = {
  name: string;
};

type PasswordForm = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export default function MyAccount() {
  const router = useRouter();
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  const [loadingPassword, setLoadingPassword] = useState(false);

  /* ---------------- PROFILE FORM ---------------- */
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,
    formState: { isSubmitting: isUpdatingProfile },
  } = useForm<ProfileForm>({
    defaultValues: { name: "" },
  });

  /* ---------------- PASSWORD FORM ---------------- */
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { errors, isValid, isSubmitting: isUpdatingPassword },
  } = useForm<PasswordForm>();

  /* ---------------- LOAD SESSION ---------------- */
  useEffect(() => {
    const loadSession = async () => {
      try {
        const session = await authClient.getSession();
        if (session?.data?.user.name) {
          resetProfileForm({ name: session.data.user.name });
        }
        if (session?.data?.user.image) {
          setAvatarPreview(session.data.user.image);
        }
      } catch (error: any) {
        toast.error("Failed to load session data");
      }
    };
    loadSession();
  }, [resetProfileForm]);

  /* ---------------- HANDLE AVATAR CHANGE ---------------- */
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);

    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ---------------- UPDATE PROFILE ---------------- */
  const updateProfile = async (data: ProfileForm) => {
    try {
      let imageUrl: string | undefined;

      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        formData.append("upload_preset", "gtConnect");
        formData.append("folder", "/gtConnect/membersPhoto");

        const uploadImage: any = await axios.post(
          "https://api.cloudinary.com/v1_1/kalakap/image/upload",
          formData,
        );
        imageUrl = uploadImage.data.secure_url;
      }

      await authClient.updateUser(
        { name: data.name, image: imageUrl },
        { disableSignal: true },
      );

      toast.success("Profile updated successfully", { position: "top-right" });
    } catch (error: any) {
      toast.error(error?.message || "Failed to update profile");
    }
  };

  /* ---------------- HANDLE PASSWORD CHANGE ---------------- */
  const handlePasswordChange = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoadingPassword(true);
    try {
      await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        fetchOptions: {
          onSuccess: async () => {
            toast.success(
              "Password updated successfully! You will be logged out.",
              { position: "top-right" },
            );
            resetPasswordForm();
            setPasswordDialogOpen(false);

            // Logout user and redirect to login page
            await authClient.signOut();
            router.push("/");
          },
          onError: (error: any) => {
            toast.error(error?.error?.message || "Failed to update password");
          },
        },
      });
    } catch (error: any) {
      toast.error(error?.message || "Failed to update password");
    } finally {
      setLoadingPassword(false);
    }
  };

  return (
    <Content tittle="My Account" Icon={BsPerson}>
      <div className="flex w-full justify-center mt-6">
        <div
          className="md:max-w-lg flex flex-col gap-6 rounded-lg p-4 w-full
          bg-white/90 border border-gray-200 dark:bg-gray-900/80 dark:border-gray-700"
        >
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            <Avatar className="w-32 h-32">
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} alt="user avatar" />
              ) : (
                <AvatarFallback>
                  <BsPerson className="w-20 h-20 text-gray-700 dark:text-gray-300" />
                </AvatarFallback>
              )}
            </Avatar>
          </div>

          {/* ---------------- EDIT PROFILE ---------------- */}
          <form
            onSubmit={handleProfileSubmit(updateProfile)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-1">
              <Label className="dark:text-gray-200">Full Name</Label>
              <Input
                placeholder="Enter your full name"
                {...registerProfile("name", { required: true })}
                className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
            </div>

            <Button
              disabled={isUpdatingProfile}
              className="bg-[#fa9a40] text-gray-900 dark:text-gray-100"
            >
              {isUpdatingProfile && (
                <LuLoader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Profile
            </Button>
          </form>

          <Separator className="dark:border-gray-700" />

          {/* ---------------- CHANGE PASSWORD ---------------- */}
          {/* ---------------- CHANGE PASSWORD ---------------- */}
          <h2 className="text-lg font-semibold dark:text-gray-100">
            Change Password
          </h2>

          <form className="flex flex-col gap-4">
            <div className="grid gap-1">
              <Label className="dark:text-gray-200">Current Password</Label>
              <Input
                type="password"
                {...registerPassword("currentPassword", {
                  required: "Current password is required",
                })}
                className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
              {errors.currentPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.currentPassword.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Label className="dark:text-gray-200">New Password</Label>
              <Input
                type="password"
                {...registerPassword("newPassword", {
                  required: "New password is required",
                })}
                className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
              {errors.newPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.newPassword.message}
                </p>
              )}
            </div>

            <div className="grid gap-1">
              <Label className="dark:text-gray-200">Confirm New Password</Label>
              <Input
                type="password"
                {...registerPassword("confirmPassword", {
                  required: "Please confirm your new password",
                })}
                className="dark:bg-gray-800 dark:text-gray-100 dark:border-gray-600"
              />
              {errors.confirmPassword && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* ---------------- CONFIRM DIALOG ---------------- */}
            <Dialog
              open={passwordDialogOpen}
              onOpenChange={setPasswordDialogOpen}
            >
              <DialogTrigger asChild>
                <Button
                  disabled={isUpdatingPassword}
                  variant="outline"
                  className="border-[#fa9a40] text-[#fa9a40] dark:border-orange-400 dark:text-orange-400"
                  onClick={async (e) => {
                    e.preventDefault();
                    // Validate all fields first
                    await handlePasswordSubmit(async () => true)();

                    if (isValid) setPasswordDialogOpen(true);
                  }}
                >
                  {isUpdatingPassword && (
                    <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  Update Password
                </Button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Confirm Password Change</DialogTitle>
                  <DialogDescription>
                    Are you sure you want to change your password? You will be
                    logged out and need to log in again.
                  </DialogDescription>
                </DialogHeader>
                <DialogFooter className="gap-2">
                  <Button
                    variant="outline"
                    onClick={() => setPasswordDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={handlePasswordSubmit(handlePasswordChange)}
                    className="bg-[#fa9a40] hover:bg-orange-500 text-white"
                    disabled={loadingPassword}
                  >
                    {loadingPassword && (
                      <LuLoader className="mr-2 h-4 w-4 animate-spin" />
                    )}
                    Confirm
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </form>
        </div>
      </div>
    </Content>
  );
}
