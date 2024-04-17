import express from "express";
import {
  register,
  login,
  findAll,
  findById,
  deleteModel,
  update,
} from "../controller/user.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/", findAll);
router.get("/:id", findById);
router.delete("/:id", deleteModel);
router.put("/:id", update);

export default router;
