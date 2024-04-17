import express from "express";
import {
  create,
  findAll,
  findById,
  deleteModel,
  update,
  returnLending,
  findUsers,
} from "../controller/lending.js";

const router = express.Router();

router.post("/lend/:id", create);
router.get("/user/", findUsers);
router.post("/return/:id", returnLending);
router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", deleteModel);
router.put("/:id", update);

export default router;
