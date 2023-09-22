import { File } from "../../../../../shared/interfaces/file.interface";
import { UploadedFile } from "../../../../../shared/interfaces/uploadFile.interface";

export interface FileUploader {
  upload: (
    files: File | File[]
  ) => Promise<UploadedFile | UploadedFile[] | undefined>;
}