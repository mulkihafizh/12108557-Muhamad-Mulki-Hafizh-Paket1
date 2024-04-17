import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("public", "uploads"));
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    cb(null, `${req.body.title}.jpg`);
  },
});

const upload = multer({
  storage: storage,
});

export default upload;
