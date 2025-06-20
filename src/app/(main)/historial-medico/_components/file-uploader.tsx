"use client";

import "filepond/dist/filepond.min.css";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";

import { setOptions } from "filepond";
import esES from "filepond/locale/es-es.js";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileValidateType from "filepond-plugin-file-validate-type";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import { useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileValidateType,
);
setOptions(esES);

interface FileUploaderProps {
  onFileSelect: (file: File | undefined) => void;
}

const FileUploader = ({ onFileSelect }: FileUploaderProps) => {
  const [files, setFiles] = useState<File[]>([]);

  return (
    <FilePond
      files={files}
      onupdatefiles={(fileItems) => {
        const file = fileItems[0]?.file as File | undefined;
        setFiles(fileItems as any);
        onFileSelect(file);
      }}
      allowMultiple={false}
      acceptedFileTypes={[
        "image/jpeg",
        "image/jpg",
        "image/png",
        "image/webp",
        "application/pdf",
      ]}
      labelIdle='Arrastra tu archivo o <span class="filepond--label-action">explora</span>'
      maxFileSize="10MB"
      allowReorder={false}
      allowProcess={false}
      allowRemove={true}
      allowReplace={true}
    />
  );
};

export default FileUploader;
