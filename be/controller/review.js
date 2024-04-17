import db from "../model/index.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { rating, review } = req.body;
    const { id } = req.params;
    const token = req.cookies.token;
    const user_id = jwt.verify(token, "secret").id;

    const data = await db.Review.create({
      rating,
      review,
      book_id: id,
      user_id,
    });

    return res.status(201).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await db.Review.findOne({ where: { id: id } });
    if (!rating) {
      return res.status(404).json({ message: "rating not found" });
    }
    await rating.destroy();
    return res.status(200).json({ message: "rating deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findAll = async (req, res) => {
  try {
    const ratings = await db.Review.findAll();
    return res.status(200).json(ratings);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const rating = await db.Review.findOne({ where: { id: id } });
    if (!rating) {
      return res.status(404).json({ message: "rating not found" });
    }
    return res.status(200).json(rating);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { rating, review } = req.body;
    const token = req.cookies.token;
    const user_id = jwt.verify(token, "secret").id;
    const data = await db.Review.findOne({ where: { id: id } });
    if (!data) {
      return res.status(404).json({ message: "rating not found" });
    }
    await data.update({
      rating,
      review,
      book_id: id,
      user_id,
    });
    await data.save();
    return res.status(200).json(data);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
