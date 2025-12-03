"use client";

import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  PiCloudArrowUploadDuoStroke,
  PiDeleteDustbin01DuoSolid,
  PiFile02CheckDuoSolid,
  PiFilePdfFormatDuoSolid,
} from "../../icons/PikaIcons";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  name: Path<T>;
  extensions?: string[];
  multiple?: boolean;
  accept?: string;
};

interface ButtonProps {
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  icon: string;
}

export default function InputDropZoneFile<T extends FieldValues>({
  form,
  name,
  extensions,
  multiple = false,
  accept,
}: Props<T>) {
  function getPossibleExtensions(strings: string[] | undefined): string {
    // Déterminer les extensions possibles
    const extensions = strings || [];
    // Convertir les extensions en une string
    let extensionList = extensions.join(", ");
    // Remplacer la dernière virgule par "ou"
    if (extensions.length > 1) {
      extensionList = extensionList.replace(/,([^,]*)$/, " ou $1");
    }
    // Retourner la string
    return extensionList;
  }

  const [dragActive, setDragActive] = useState<boolean>(false);
  const inputRef = useRef<any>(null);
  const [files, setFiles] = useState<
    (File | { id: number; signedUrl: string; filename: string })[]
  >(form?.getValues(name) ? form?.getValues(name) : []);

  const handleFiles = (newFiles: File[]) => {
    if (multiple) {
      const updatedFiles = [...files, ...newFiles];
      setFiles(updatedFiles);
      // @ts-ignore TOIMPROVE remove ts-ignore and find a way to fix the type error
      if (form) form.setValue(name, updatedFiles);
    } else {
      setFiles(Array.from(newFiles));
      // @ts-ignore TOIMPROVE remove ts-ignore and find a way to fix the type error
      if (form) form.setValue(name, Array.from(newFiles));
    }
  };

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault();

    const files = e.target.files;
    if (files) handleFiles(Array.from(files));
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();

    const files = e.dataTransfer.files;
    if (files) handleFiles(Array.from(files));
  }

  function handleDragLeave(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }

  function handleDragOver(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleDragEnter(e: any) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }

  function handleRemoveFile(id: number) {
    const updatedFiles = files.filter((_, index) => index !== id);
    setFiles(updatedFiles);
    if (form) {
      form.setValue(name as Path<T>, updatedFiles as PathValue<T, Path<T>>);
    }
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  const isImageFile = (filename: string) =>
    /\.jpg$|\.jpeg$|\.png$/i.test(filename);
  const isPDFFile = (filename: string) => /\.pdf$/i.test(filename);
  const shortName = (filename: string) =>
    filename.length > 15 ? filename.substring(0, 15) + "..." : filename;

  return (
    <div className="flex  items-center justify-center col-span-full">
      <div
        className={`${
          dragActive ? "bg-slate-200" : "bg-slate-100"
        } w-full flex flex-col  gap-4 p-8 items-center justify-center h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden`}
        onDragEnter={handleDragEnter}
        onSubmit={(e) => e.preventDefault()}
        onDrop={handleDrop}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onClick={openFileExplorer}
      >
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input
          placeholder="fileInput"
          className="hidden"
          ref={inputRef}
          type="file"
          multiple={multiple}
          onChange={handleChange}
          accept={
            accept || ".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
          }
        />

        {!(files.length > 0) ? (
          <PiCloudArrowUploadDuoStroke className="w-12 h-12 text-gray-500" />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-center ">
            {files.map((file, index) => (
              // <div key={index} className="flex">
              <Card
                key={index}
                className={
                  "flex items-center aspect-square justify-center rounded-xl p-8"
                }
              >
                <CardContent
                  className={
                    "p-0 flex flex-col items-center justify-center relative"
                  }
                >
                  {file instanceof File && isImageFile(file.name) ? (
                    <img
                      key={index}
                      src={URL.createObjectURL(file)}
                      alt="Aperçu du fichier"
                      className="rounded-lg"
                      onLoad={(event) =>
                        URL.revokeObjectURL(
                          (event.target as HTMLImageElement).src
                        )
                      }
                    />
                  ) : "signedUrl" in file ? (
                    <img
                      key={index}
                      src={file.signedUrl}
                      alt="Aperçu du fichier"
                      className="rounded-lg"
                    />
                  ) : file instanceof File && isPDFFile(file.name) ? (
                    <div className="flex items-center flex-col text-xs text-slate-400 gap-2">
                      <PiFilePdfFormatDuoSolid className="w-12 h-12 text-slate-400" />
                      {shortName(file.name)}
                    </div>
                  ) : (
                    <div className="flex items-center flex-col text-xs text-slate-400 gap-2">
                      <PiFile02CheckDuoSolid className="w-12 h-12 text-slate-400" />
                      {shortName(file.name)}
                    </div>
                  )}

                  <div
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleRemoveFile(index);
                    }}
                    className="absolute top-0 right-0 bg-white p-1 rounded-full  cursor-pointer "
                  >
                    <PiDeleteDustbin01DuoSolid className="h-5 w-5 text-red-400 hover:text-red-600" />
                  </div>
                </CardContent>
              </Card>
              // </div>
            ))}
          </div>
        )}

        {files?.length === 0 && (
          <>
            <p>
              {multiple ? "Glissez vos fichiers" : "Glissez votre fichier"}{" "}
              <span className="font-bold text-primary cursor-pointer">
                <u>ou cliquez ici</u>
              </span>{" "}
              pour envoyer
            </p>
            <p className="text-xs text-slate-400">
              {extensions &&
                `Fichier de type : ${getPossibleExtensions(extensions)}`}
            </p>
          </>
        )}
      </div>
    </div>
  );
}
