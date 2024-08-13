"use client";
import React, { useRef } from "react";
import {UseFormReturn, Path, PathValue, FieldValues, FieldPath} from "react-hook-form";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "../ui/avatar";
import {
  PiUploadUpContrast,
  PiUserCircleDuoSolid,
} from "../../icons/PikaIcons";

interface ProfileImageUploaderProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label?: string
  disabled?: boolean
}

export const ProfileImageUploader = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  disabled = false
}: ProfileImageUploaderProps<TFormValues>) => {
  const { watch, setValue } = form;
  const profileImage: File | { id: number; signedUrl: string; filename: string } = watch(name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setValue(name, file as PathValue<TFormValues, FieldPath<TFormValues>>)
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex items-center gap-2">
      <Avatar
        className={`border shadow w-16 h-16 flex justify-center items-center ${!disabled ? 'cursor-pointer' : ''}`}
        onClick={handleAvatarClick}
      >
        {profileImage ? (
          profileImage instanceof File ? (
            <AvatarImage src={URL.createObjectURL(profileImage)} alt="Profile picture" />
          ) : (
            ("signedUrl" in profileImage) && <AvatarImage src={profileImage.signedUrl} alt="Profile picture" />
          )
        ) : (
          <AvatarFallback>
            <PiUserCircleDuoSolid className="text-gray-400 w-full h-full" />
          </AvatarFallback>
        )}
        {!disabled && <div className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300`}>
          <PiUploadUpContrast className="text-white w-8 h-8"/>
        </div>}
      </Avatar>
      {!disabled && <input
        type="file"
        accept="image/*"
        className="hidden"
        name={name}
        ref={fileInputRef}
        onChange={onProfileImageChange}
      />}
      {<p className="text-sm text-gray-500">{label}</p>}
    </div>
  );
};
