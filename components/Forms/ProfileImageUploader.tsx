"use client";
import React, { useRef } from "react";
import {
  UseFormReturn,
  Path,
  PathValue,
  FieldValues,
  FieldPath,
} from "react-hook-form";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  PiUploadUpContrast,
  PiUserCircleDuoSolid,
} from "../../icons/PikaIcons";
import { cn } from "../lib/utils";

interface ProfileImageUploaderProps<TFormValues extends FieldValues> {
  form: UseFormReturn<TFormValues>;
  name: Path<TFormValues>;
  label?: string;
  disabled?: boolean;
  className?: string;
  required?: boolean;
}

export const ProfileImageUploader = <TFormValues extends FieldValues>({
  form,
  name,
  label,
  disabled = false,
  className,
  required,
}: ProfileImageUploaderProps<TFormValues>) => {
  const { watch, setValue, formState: { errors } } = form;
  const fieldError = errors[name];
  const profileImage:
    | File
    | { id: number; signedUrl: string; filename: string } = watch(name);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const onProfileImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // @ts-ignore
      setValue(name, file as PathValue<TFormValues, FieldPath<TFormValues>>);
    }
  };

  const handleAvatarClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <Avatar
        className={cn(
          "border shadow w-16 h-16 flex justify-center items-center",
          !disabled && "cursor-pointer",
          fieldError && "border-red-400 ring-2 ring-red-100",
        )}
        onClick={handleAvatarClick}
      >
        {profileImage ? (
          profileImage instanceof File ? (
            <AvatarImage
              src={URL.createObjectURL(profileImage)}
              alt="Profile picture"
            />
          ) : (
            "signedUrl" in profileImage && (
              <AvatarImage src={profileImage.signedUrl} alt="Profile picture" />
            )
          )
        ) : (
          <AvatarFallback>
            <PiUserCircleDuoSolid className="text-slate-400 w-full h-full" />
          </AvatarFallback>
        )}
        {!disabled && (
          <div
            className={`absolute inset-0 flex justify-center items-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300`}
          >
            <PiUploadUpContrast className="text-white w-8 h-8" />
          </div>
        )}
      </Avatar>
      {!disabled && (
        <input
          type="file"
          accept="image/*"
          className="hidden"
          name={name}
          ref={fileInputRef}
          onChange={onProfileImageChange}
        />
      )}
      <div className="flex flex-col gap-1">
        {label && (
          <p className="text-sm text-gray-500">
            {label}
            {required && <span className="text-red-400 ml-0.5">*</span>}
          </p>
        )}
        {fieldError && (
          <p className="text-xs text-red-500">
            {fieldError.message as string}
          </p>
        )}
      </div>
    </div>
  );
};
