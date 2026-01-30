/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import Content from "@/components/app/content";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";

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
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [avatarFile, setAvatarFile] = useState<File | null>(null);

  /* ---------------- PROFILE FORM ---------------- */
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    reset: resetProfileForm,
    formState: { isSubmitting: isUpdatingProfile },
  } = useForm<ProfileForm>({
    defaultValues: {
      name: "",
    },
  });

  /* ---------------- PASSWORD FORM ---------------- */
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    reset: resetPasswordForm,
    formState: { isSubmitting: isUpdatingPassword },
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

    // Preview locally
    const reader = new FileReader();
    reader.onload = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  };

  /* ---------------- UPDATE PROFILE ---------------- */
  const updateProfile = async (data: ProfileForm) => {
    try {
      let imageUrl: string | undefined;

      // Upload to Cloudinary if avatarFile exists
      if (avatarFile) {
        console.log(avatarFile);

        const uploadImage: any = await axios.post(
          "https://api.cloudinary.com/v1_1/kalakap/image/upload",
          {
            file: avatarFile,
            upload_preset: "gtConnect",
            folder: "/gtConnect/membersPhoto",
            quality: 80,
          },
        );

        console.log(uploadImage);

        imageUrl = uploadImage.secure_url;
      }

      // Update profile in auth
      await authClient.updateUser(
        { name: data.name, image: imageUrl },
        { disableSignal: true },
      );

      toast.success("Profile updated successfully", { position: "top-right" });
    } catch (error: any) {
      console.error(error);
      toast.error(error?.message || "Failed to update profile");
    }
  };

  /* ---------------- UPDATE PASSWORD ---------------- */
  const updatePassword = async (data: PasswordForm) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await authClient.changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
      });

      toast.success("Password updated successfully");
      resetPasswordForm();
    } catch (error: any) {
      toast.error(error?.message || "Failed to update password");
    }
  };

  return (
    <Content tittle="My Account" Icon={BsPerson}>
      <div className="flex w-full justify-center mt-6">
        <div className=" md:max-w-lg flex flex-col gap-6 rounded-lg p-4 bg-gray-50/30 border w-full">
          {/* Avatar */}
          <div className="flex flex-col items-center gap-2">
            {/* <Avatar className="w-32 h-32">
              {avatarPreview ? (
                <AvatarImage src={avatarPreview} alt="user avatar" />
              ) : (
                <AvatarFallback>
                  <BsPerson className="w-20 h-20 text-gray-700" />
                </AvatarFallback>
              )}
            </Avatar> */}

            {/* Change avatar button */}
            {/* <Label htmlFor="avatar-upload">Change Avatar</Label>
            <input
              type="file"
              id="avatar-upload"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            /> */}
          </div>

          {/* ---------------- EDIT PROFILE ---------------- */}
          <form
            onSubmit={handleProfileSubmit(updateProfile)}
            className="flex flex-col gap-4"
          >
            <div className="grid gap-1">
              <Label>Full Name</Label>
              <Input
                placeholder="Enter your full name"
                {...registerProfile("name", { required: true })}
              />
            </div>

            <Button
              disabled={isUpdatingProfile}
              className="bg-[#fa9a40] text-gray-900"
            >
              {isUpdatingProfile && (
                <LuLoader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Profile
            </Button>
          </form>

          <Separator />

          {/* ---------------- CHANGE PASSWORD ---------------- */}
          <form
            onSubmit={handlePasswordSubmit(updatePassword)}
            className="flex flex-col gap-4"
          >
            <h2 className="text-lg font-semibold">Change Password</h2>

            <div className="grid gap-1">
              <Label>Current Password</Label>
              <Input
                type="password"
                {...registerPassword("currentPassword", { required: true })}
              />
            </div>

            <div className="grid gap-1">
              <Label>New Password</Label>
              <Input
                type="password"
                {...registerPassword("newPassword", { required: true })}
              />
            </div>

            <div className="grid gap-1">
              <Label>Confirm New Password</Label>
              <Input
                type="password"
                {...registerPassword("confirmPassword", { required: true })}
              />
            </div>

            <Button
              disabled={isUpdatingPassword}
              variant="outline"
              className="border-[#fa9a40] text-[#fa9a40]"
            >
              {isUpdatingPassword && (
                <LuLoader className="mr-2 h-4 w-4 animate-spin" />
              )}
              Update Password
            </Button>
          </form>
        </div>
      </div>
    </Content>
  );
}
