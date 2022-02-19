import multer from "multer";

const storageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads"); //important this is a direct path fron our current file to storage location
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "_" + file.originalname);
    },
});

export const upload = multer({ storage: storageEngine })