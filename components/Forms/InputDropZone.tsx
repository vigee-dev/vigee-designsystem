import React from "react";
import { UseFormReturn, FieldValues, Path } from "react-hook-form";
import { useRef, useState } from "react";

type Props<T extends FieldValues> = {
  form?: UseFormReturn<T>;
  name: Path<T>;
  extensions?: string[];
  multiple?: boolean;
};

export default function InputDropZoneFile<T extends FieldValues>({
  form,
  name,
  extensions,
  multiple = false,
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
  const [files, setFiles] = useState<any>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  function handleChange(e: any) {
    e.preventDefault();

    if (e.target.files && e.target.files[0]) {
      console.log(e.target.files);

      for (let i = 0; i < e.target.files["length"]; i++) {
        setFiles((prevState: File[]) => [e.target.files[i]]);
      }
      form?.setValue(name, e.target.files);

      const fileType = e.target.files[0].type;
      if (fileType.startsWith("image/") || fileType.startsWith("video/")) {
        const fileUrl = URL.createObjectURL(e.target.files[0]);
        setPreviewUrl(fileUrl); // Stocker l'URL pour l'aperçu
      } else {
        // Si le fichier n'est pas une image ou une vidéo, ne pas définir l'aperçu
        setPreviewUrl(null); // Ou gérer comme approprié, par exemple, montrer un message d'erreur ou un placeholder.
      }
    }
  }

  function handleDrop(e: any) {
    e.preventDefault();
    e.stopPropagation();

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      for (let i = 0; i < e.dataTransfer.files["length"]; i++) {
        setFiles((prevState: any) => [e.dataTransfer.files[i]]);
      }
    }
    form?.setValue(name, e.dataTransfer.files);
    const fileUrl = URL.createObjectURL(e.dataTransfer.files[0]);
    setPreviewUrl(fileUrl); // Stocker l'URL pour l'aperçu
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

  function removeFile(fileName: any, idx: any) {
    const newArr = [...files];
    newArr.splice(idx, 1);
    setFiles([]);
    setFiles(newArr);
    setPreviewUrl(null);
  }

  function openFileExplorer() {
    inputRef.current.value = "";
    inputRef.current.click();
  }

  return (
    <div className="flex items-center justify-center col-span-full">
      <div
        className={`${
          dragActive ? "bg-gray-200" : "bg-gray-100"
        } w-full  flex flex-col p-8 items-center justify-center  h-48 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600`}
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
          accept=".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"
        />

        {!previewUrl ? (
          <svg
            className="w-8 h-8 mb-4 text-gray-400 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
            />
          </svg>
        ) : (
          <img
            src={previewUrl}
            alt="Aperçu du fichier"
            className="h-32 w-32 rounded-lg"
          />
        )}

        {files?.length === 0 && (
          <p>
            Glissez vos fichiers{" "}
            <span className="font-bold text-primary cursor-pointer">
              <u>ou cliquez ici</u>
            </span>{" "}
            pour envoyer
          </p>
        )}

        <div className="flex flex-col items-center p-3">
          {files.map((file: any, idx: any) => (
            <div key={idx} className="flex flex-row space-x-5">
              <span>{file.name}</span>
              <span
                className="text-red-500 cursor-pointer"
                onClick={() => removeFile(file.name, idx)}
              >
                supprimer
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
