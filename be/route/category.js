import express from "express";
import {
  create,
  findAll,
  findById,
  deleteModel,
  update,
} from "../controller/category.js";

const router = express.Router();

router.post("/", create);
router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", deleteModel);
router.put("/:id", update);

export default router;
