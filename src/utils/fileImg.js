import { unlink } from "fs";
import { resolve } from "path";

// Function  to delete the file
export const deleteFile = (filepath) => {
  try {
    unlink(resolve(filepath), () => {});
  } catch (error) {
    console.log(error);
  }
};

export const deleteUploadedFiles = (req) => {
  // single file usecase
  if (req.file) {
    return deleteFile(req.file.path);
  }
  if (req.files) {
    req.files.map((file) => deleteFile(file.path));
  }
};
