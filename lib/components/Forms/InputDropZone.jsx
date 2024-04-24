"use strict";
"use client";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = __importDefault(require("react"));
var react_2 = require("react");
var card_1 = require("../ui/card");
var PikaIcons_1 = require("../../icons/PikaIcons");
var Button_1 = require("../Buttons/Button");
function InputDropZoneFile(_a) {
    var form = _a.form, name = _a.name, extensions = _a.extensions, _b = _a.multiple, multiple = _b === void 0 ? false : _b, accept = _a.accept;
    function getPossibleExtensions(strings) {
        // Déterminer les extensions possibles
        var extensions = strings || [];
        // Convertir les extensions en une string
        var extensionList = extensions.join(", ");
        // Remplacer la dernière virgule par "ou"
        if (extensions.length > 1) {
            extensionList = extensionList.replace(/,([^,]*)$/, " ou $1");
        }
        // Retourner la string
        return extensionList;
    }
    var _c = (0, react_2.useState)(false), dragActive = _c[0], setDragActive = _c[1];
    var inputRef = (0, react_2.useRef)(null);
    var _d = (0, react_2.useState)((form === null || form === void 0 ? void 0 : form.getValues(name)) ? form === null || form === void 0 ? void 0 : form.getValues(name) : []), files = _d[0], setFiles = _d[1];
    var handleFiles = function (newFiles) {
        if (multiple) {
            var updatedFiles = __spreadArray(__spreadArray([], files, true), newFiles, true);
            setFiles(updatedFiles);
            // @ts-ignore TOIMPROVE remove ts-ignore and find a way to fix the type error
            if (form)
                form.setValue(name, updatedFiles);
        }
        else {
            setFiles(Array.from(newFiles));
            // @ts-ignore TOIMPROVE remove ts-ignore and find a way to fix the type error
            if (form)
                form.setValue(name, Array.from(newFiles));
        }
    };
    function handleChange(e) {
        e.preventDefault();
        var files = e.target.files;
        if (files)
            handleFiles(Array.from(files));
    }
    function handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        var files = e.dataTransfer.files;
        if (files)
            handleFiles(Array.from(files));
    }
    function handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }
    function handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }
    function handleDragEnter(e) {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }
    function handleRemoveFile(id) {
        var updatedFiles = files.filter(function (_, index) { return index !== id; });
        setFiles(updatedFiles);
        if (form) {
            form.setValue(name, updatedFiles);
        }
    }
    function openFileExplorer() {
        inputRef.current.value = "";
        inputRef.current.click();
    }
    var isImageFile = function (filename) {
        return /\.jpg$|\.jpeg$|\.png$/i.test(filename);
    };
    var isPDFFile = function (filename) { return /\.pdf$/i.test(filename); };
    var shortName = function (filename) {
        return filename.length > 15 ? filename.substring(0, 15) + "..." : filename;
    };
    return (<div className="flex  items-center justify-center col-span-full">
      <div className={"".concat(dragActive ? "bg-gray-200" : "bg-gray-100", " w-full flex flex-col  gap-4 p-8 items-center justify-center h-fit border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50  dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600 overflow-hidden")} onDragEnter={handleDragEnter} onSubmit={function (e) { return e.preventDefault(); }} onDrop={handleDrop} onDragLeave={handleDragLeave} onDragOver={handleDragOver} onClick={openFileExplorer}>
        {/* this input element allows us to select files for upload. We make it hidden so we can activate it when the user clicks select files */}
        <input placeholder="fileInput" className="hidden" ref={inputRef} type="file" multiple={multiple} onChange={handleChange} accept={accept || ".xlsx,.xls,image/*,.doc, .docx,.ppt, .pptx,.txt,.pdf"}/>

        {!(files.length > 0) ? (<svg className="w-12 h-12 text-gray-400 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>) : (<div className="grid grid-cols-1 md:grid-cols-3 gap-4  items-center ">
            {files.map(function (file, index) { return (<div key={index} className="flex gap-4 ">
                <card_1.Card className="rounded-xl w-36 h-36 p-1 ">
                  <div onClick={function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    handleRemoveFile(index);
                }}>
                    <Button_1.Button icon="trash"/>
                  </div>
                  <card_1.CardContent className="flex aspect-square items-center justify-center ">
                    {file instanceof File && isImageFile(file.name) ? (<img key={index} src={URL.createObjectURL(file)} alt="Aperçu du fichier" className="rounded-lg" onLoad={function (event) {
                        return URL.revokeObjectURL(event.target.src);
                    }}/>) : "signedUrl" in file ? (<img key={index} src={file.signedUrl} alt="Aperçu du fichier" className="rounded-lg"/>) : file instanceof File && isPDFFile(file.name) ? (<div className="flex items-center flex-col text-xs  text-gray-400 gap-2">
                        <PikaIcons_1.PiFilePdfFormatDuoSolid className="w-12 h-12 text-gray-400"/>
                        {shortName(file.name)}
                      </div>) : (<div className="flex items-center flex-col text-xs  text-gray-400 gap-2">
                        <PikaIcons_1.PiFile02CheckDuoSolid className="w-12 h-12 text-gray-400"/>
                        {shortName(file.name)}
                      </div>)}
                  </card_1.CardContent>
                </card_1.Card>
              </div>); })}
          </div>)}

        {(files === null || files === void 0 ? void 0 : files.length) === 0 && (<p>
            Glissez vos fichiers{" "}
            <span className="font-bold text-primary cursor-pointer">
              <u>ou cliquez ici</u>
            </span>{" "}
            pour envoyer
          </p>)}
      </div>
    </div>);
}
exports.default = InputDropZoneFile;
