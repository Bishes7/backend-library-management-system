// Multer setup
// const upload = multer({ dest: "uploads/" });

import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const filePath = uniqueSuffix + "-" + file.originalname;

    cb(null, filePath);
  },
});

// filter to allow images only
const fileFilter = (req, file, cb) => {
  const allowedFiletypes = /jpeg|jpg|png|webp/;
  const extName = path.extname(file.originalname).toLowerCase();
  const isAllowedExt = allowedFiletypes.test(extName);
  const mimetype = allowedFiletypes.test(file.mimetype);

  if (isAllowedExt && mimetype) {
    cb(null, true);
  } else {
    cb(new Error("Only jpeg|jpg|png|webp are allowed "), false);
  }
};

export const upload = multer({
  storage: storage,
  fileFilter,
  limits: { fileSize: 3 * 1024 * 1024 },
});
