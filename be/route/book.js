import express from "express";
import {
  create,
  findAll,
  findById,
  deleteModel,
  update,
} from "../controller/book.js";
import upload from "../utils/multer.js";

const router = express.Router();

router.post("/", upload.single("cover"), create);
router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", deleteModel);
router.put("/:id", upload.single("cover"), update);

export default router;
