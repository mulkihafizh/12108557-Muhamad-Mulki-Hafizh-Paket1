import db from "../model/index.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, password, email, address, name } = req.body;
    const oldUser = await db.User.findOne({ where: { username: username } });
    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const user = await db.User.create({
      username: username,
      password: bcryptjs.hashSync(password, 8),
      email: email,
      address: address,
      name: name,
    });

    return res.status(201).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.User.findOne({ where: { email: email } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const isValid = bcryptjs.compareSync(password, user.password);
    if (!isValid) {
      return res.status(401).json({ message: "Invalid email/password" });
    }

    try {
      const token = jwt.sign({ id: user.id }, "secret", {
        expiresIn: 86400,
      });
      res.cookie("token", token, {
        httpOnly: true,
        sameSite: "none",
        secure: true,
      });
      return res.status(200).json({
        user,
        accessToken: token,
      });
    } catch (e) {
      return res.status(500).json({ message: e.message });
    }
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    await user.destroy();
    return res.status(200).json({ message: "User deleted" });
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findAll = async (req, res) => {
  try {
    const users = await db.User.findAll();
    return res.status(200).json(users);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await db.User.findOne({ where: { id: id } });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const update = async (req, res) => {
  try {
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
