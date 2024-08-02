"use client";

import { UseFormReturn, FieldValues, Path, PathValue } from "react-hook-form";
import { useRef, useState } from "react";
import { Card, CardContent } from "../ui/card";
import {
  PiDeleteBackwardLeftDuoSolid,
  PiDeleteDustbin01DuoSolid,
  PiDeleteDustbin02Solid,
  PiFile02CheckDuoSolid,
  PiFilePdfFormatDuoSolid,
  PiMedicalCrossContrast,
} from "../../icons/PikaIcons";
import { Button } from "../Buttons/Button";

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
          dragActive ? "bg-gray-200" : "bg-gray-100"
        } w-full flex flex-col  gap-4 p-8 items-center justify-center h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden`}
        onDragEnter={handleDragEnter}
        onSubmit={e => e.preventDefault()}
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
          <svg
            className="w-12 h-12 text-gray-400 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4  items-center ">
            {files.map((file, index) => (
              <div key={index} className="flex gap-4 ">
                <Card className="rounded-xl p-1">
                  <CardContent className="flex flex-col aspect-square items-center justify-center relative">
                    {file instanceof File && isImageFile(file.name) ? (
                      <img
                        key={index}
                        src={URL.createObjectURL(file)}
                        alt="Aperçu du fichier"
                        className="rounded-lg"
                        onLoad={event =>
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
                      <div className="flex items-center flex-col text-xs  text-gray-400 gap-2">
                        <PiFilePdfFormatDuoSolid className="w-12 h-12 text-gray-400" />
                        {shortName(file.name)}
                      </div>
                    ) : (
                      <div className="flex items-center flex-col text-xs  text-gray-400 gap-2">
                        <PiFile02CheckDuoSolid className="w-12 h-12 text-gray-400" />
                        {shortName(file.name)}
                      </div>
                    )}

                    <div
                      onClick={e => {
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
              </div>
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
              <p className="text-xs text-gray-400">
                {extensions &&
                    `Fichier de type : ${getPossibleExtensions(extensions)}`}
              </p>
            </>
        )}
      </div>
    </div>
  );
}
