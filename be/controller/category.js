import db from "../model/index.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { name } = req.body;
    const oldCategory = await db.Category.findOne({
      where: { name: name },
    });
    if (oldCategory) {
      return res.status(400).json({ message: "category already exists" });
    }
    const category = await db.Category.create({
      name,
    });

    return res.status(201).json(category);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findOne({ where: { id: id } });
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    await category.destroy();
    return res.status(200).json({ message: "category deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findAll = async (req, res) => {
  try {
    const categories = await db.Category.findAll();
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await db.Category.findOne({ where: { id: id } });
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    return res.status(200).json(category);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    const category = await db.Category.findOne({ where: { id: id } });
    if (!category) {
      return res.status(404).json({ message: "category not found" });
    }
    await category.update({
      name,
    });
    await category.save();
    return res.status(200).json(category);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
