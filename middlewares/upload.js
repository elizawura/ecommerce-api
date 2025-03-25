import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import { multerSaveFilesOrg } from "multer-savefilesorg";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const productPicturesUpload = multer({
  storage: new CloudinaryStorage({
    cloudinary,
    params: {
      folder: "/ecommerce-api/product-images",
      // format: async (req, file) => "png", // supports promises as well
      public_id: (req, file) => {
        console.log(file);
        return file.originalname;
      },
    },
  }),
});
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

// export const productPicturesUpload = multer({
//   storage: multerSaveFilesOrg({
//     apiAccessToken: process.env.SAVEFILESORG_API_KEY,
//     relativePath: "/ecommerce-api/product-pictures/*",

//     //* means let the files go into a folder
//   }),
// });
