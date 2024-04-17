import db from "../model/index.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token;
    const user_id = jwt.verify(token, "secret").id;

    const lending = await db.Lending.create({
      book_id: id,
      user_id,
      lending_date: new Date(),
    });

    return res.status(201).json(lending);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};

export const returnLending = async (req, res) => {
  try {
    const { id } = req.params;
    const token = req.cookies.token;
    const user_id = jwt.verify(token, "secret").id;

    const lending = await db.Lending.findOne({
      where: {
        lending_status: true,
        book_id: id,
        user_id,
      },
    });

    if (!lending) {
      return res.status(404).json({ message: "Lending not found" });
    }

    await lending.update({
      lending_status: false,
      return_date: new Date(),
    });

    return res.status(201).json(lending);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const lending = await db.Lending.findOne({ where: { id: id } });
    if (!lending) {
      return res.status(404).json({ message: "lending not found" });
    }
    await lending.destroy();
    return res.status(200).json({ message: "lending deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findAll = async (req, res) => {
  try {
    const lendings = await db.Lending.findAll();
    return res.status(200).json(lendings);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const lending = await db.Lending.findOne({ where: { id: id } });
    if (!lending) {
      return res.status(404).json({ message: "lending not found" });
    }
    return res.status(200).json(lending);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, author, publisher, publication, cover } = req.body;
    const lending = await db.Lending.findOne({ where: { id: id } });
    if (!lending) {
      return res.status(404).json({ message: "lending not found" });
    }
    await lending.update({
      title,
      author,
      publisher,
      publication,
      cover,
    });
    await lending.save();
    return res.status(200).json(lending);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
