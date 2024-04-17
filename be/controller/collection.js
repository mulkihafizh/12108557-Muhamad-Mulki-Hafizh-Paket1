import db from "../model/index.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token;
    const user_id = jwt.verify(token, "secret").id;
    const oldColc = await db.Collection.findOne({
      where: { book_id: id, user_id: user_id },
    });
    if (oldColc) {
      await oldColc.destroy();
      return res.status(200).json({ message: "Book removed from collection" });
    }

    const collection = await db.Collection.create({
      book_id: id,
      user_id,
    });

    return res.status(201).json(collection);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await db.Collection.findOne({ where: { id: id } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.destroy();
    return res.status(200).json({ message: "Book deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findAll = async (req, res) => {
  try {
    const books = await db.Collection.findAll();
    return res.status(200).json(books);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await db.Collection.findOne({ where: { id: id } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    return res.status(200).json(book);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await db.Collection.findOne({ where: { id: id } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.update({
      title,
      author,
      publisher,
      publication,
      cover,
    });
    await book.save();
    return res.status(200).json(book);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
