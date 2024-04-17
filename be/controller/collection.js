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
      return res
        .status(200)
        .json({ message: "collection removed from collection" });
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
    const collection = await db.Collection.findOne({ where: { id: id } });
    if (!collection) {
      return res.status(404).json({ message: "collection not found" });
    }
    await collection.destroy();
    return res.status(200).json({ message: "collection deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findAll = async (req, res) => {
  try {
    const token = req.cookies.token;
    const user_id = jwt.verify(token, "secret").id;
    console.log(user_id);
    const collections = await db.Collection.findAll({
      order: [
        ["createdAt", "DESC"],
        [
          { model: db.Book },
          { model: db.Lending, as: "lendings" },
          "createdAt",
          "DESC",
        ],
      ],
      where: {
        user_id,
      },
      include: [
        {
          model: db.Book,
          include: [
            {
              model: db.Category,
              as: "categories",
            },
            {
              model: db.Review,
              as: "reviews",
              required: false,
              where: {
                user_id,
              },
            },
            {
              model: db.Lending,
              as: "lendings",
              required: false,
              where: {
                user_id,
              },
            },
            {
              model: db.Collection,
              as: "collections",
              required: false,
              where: {
                user_id,
              },
            },
          ],
        },
      ],
    });
    return res.status(200).json(collections);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await db.Collection.findOne({ where: { id: id } });
    if (!collection) {
      return res.status(404).json({ message: "collection not found" });
    }
    return res.status(200).json(collection);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const collection = await db.Collection.findOne({ where: { id: id } });
    if (!collection) {
      return res.status(404).json({ message: "collection not found" });
    }
    await collection.update({
      title,
      author,
      publisher,
      publication,
      cover,
    });
    await collection.save();
    return res.status(200).json(collection);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
