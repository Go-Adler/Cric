import { File } from "../../../../shared/interfaces/file.interface";
import { UploadedFile } from "../../../../shared/interfaces/uploadFile.interface";

export interface FileUpload {
  upload: (files: File[]) => Promise<UploadedFile[]>;
}