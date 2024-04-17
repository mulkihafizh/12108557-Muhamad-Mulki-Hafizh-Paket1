import express from "express";
import user from "./user.js";
import book from "./book.js";
import review from "./review.js";
import category from "./category.js";
import lending from "./lending.js";
import collection from "./collection.js";

const router = express.Router();

router.use("/user", user);
router.use("/book", book);
router.use("/review", review);
router.use("/category", category);
router.use("/lending", lending);
router.use("/collection", collection);

export default router;
