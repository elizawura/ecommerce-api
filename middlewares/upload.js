import multer from "multer";
import { multerSaveFilesOrg } from "multer-savefilesorg";

export const localUpload = multer({ dest: "uploads" });

export const remoteUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/ecommerce-api/*",

    //* means let the files go into a folder
  }),
});

export const productImageUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/ecommerce-api/product-images/*",

    //* means let the files go into a folder
  }),
});

export const productPicturesUpload = multer({
  storage: multerSaveFilesOrg({
    apiAccessToken: process.env.SAVEFILESORG_API_KEY,
    relativePath: "/ecommerce-api/product-pictures/*",

    //* means let the files go into a folder
  }),
});
