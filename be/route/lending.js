import express from "express";
import {
  create,
  findAll,
  findById,
  deleteModel,
  update,
  returnLending,
} from "../controller/lending.js";

const router = express.Router();

router.post("/lend/:id", create);
router.post("/return/:id", returnLending);
router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", deleteModel);
router.put("/:id", update);

export default router;
