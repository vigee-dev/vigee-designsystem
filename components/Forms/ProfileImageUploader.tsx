"use client";
import React, { useRef } from "react";
import { UseFormReturn, Path } from "react-hook-form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../../components/ui/avatar";
import {
  PiUploadUpContrast,
  PiUserCircleDuoSolid,
} from "../../icons/PikaIcons";

interface ProfileImageUploaderProps<
  TFormValues extends { profileImageUrl?: string | null }
> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
}

export const ProfileImageUploader = <
  TFormValues extends { profileImageUrl?: string | null }
>({
  form,
  name,
  label,
}: ProfileImageUploaderProps<TFormValues>) => {
  const { watch, setValue } = form;
  const profileImage = watch(name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        if (typeof e.target?.result === "string") {
          // @ts-ignore TOIMPROVE remove ts-ignore and find a way to fix the type error
          setValue(name, e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar
        className="border shadow w-16 h-16 flex justify-center items-center cursor-pointer"
        onClick={handleAvatarClick}
      >
        {profileImage ? (
          <AvatarImage src={profileImage} alt="Profile" />
        ) : (
          <AvatarFallback>
            <PiUserCircleDuoSolid className="text-gray-400 w-full h-full" />
          </AvatarFallback>
        )}
        <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
          <PiUploadUpContrast className="text-white w-8 h-8" />
        </div>
      </Avatar>
      <input
        type="file"
        accept="image/*"
        className="hidden"
        name="profileImageUrl"
        ref={fileInputRef}
        onChange={onProfileImageChange}
      />
      {<p className="text-sm text-gray-500">{label}</p>}
    </div>
  );
};
