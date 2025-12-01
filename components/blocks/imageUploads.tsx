import { Button } from "primereact/button";
import {
  FileUpload,
  FileUploadHeaderTemplateOptions,
  ItemTemplateOptions,
} from "primereact/fileupload";
import React from "react";

export default function ImageUploads() {
  const itemTemplate = (inFile: object, props: ItemTemplateOptions) => {
    const file = inFile as File;
    return (
      // @ts-ignore
      <img
        alt={file.name}
        role="presentation"
        className="w-full aspect-square"
        src={file.objectURL}
        width={100}
      />
    );
  };
  const headerTemplate = (options: FileUploadHeaderTemplateOptions) => {
    return (
      <div className="flex gap-4 p-4 justify-end border border-b-0 border-gray-200">
        {options.chooseButton}
        {options.cancelButton}
      </div>
    );
  };
  return (
    <FileUpload
      name="demo[]"
      url={"/api/upload"}
      multiple
      headerTemplate={headerTemplate}
      accept="image/*"
      itemTemplate={itemTemplate}
      maxFileSize={1000000}
      emptyTemplate={
        <p className="m-0">Drag and drop files to here to upload.</p>
      }
    />
  );
}
