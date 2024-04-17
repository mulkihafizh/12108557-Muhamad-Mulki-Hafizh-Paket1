import db from "../model/index.js";
import jwt from "jsonwebtoken";

export const create = async (req, res) => {
  try {
    const { title, author, publisher, publication_year, cover, category_id } =
      req.body;
    const oldBook = await db.Book.findOne({ where: { title: title } });
    if (oldBook) {
      return res.status(400).json({ message: "Book already exists" });
    }
    const book = await db.Book.create({
      title,
      author,
      publisher,
      publication_year,
      cover: title + ".jpg",
    });

    await db.BookCategory.create({
      book_id: book.id,
      category_id,
    });

    return res.status(201).json(book);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const deleteModel = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await db.Book.findOne({ where: { id: id } });
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
    const token = req.cookies.token;
    const user_id = jwt.verify(token, "secret").id;
    const books = await db.Book.findAll({
      order: [
        ["createdAt", "ASC"],
        [{ model: db.Lending, as: "lendings" }, "createdAt", "DESC"],
      ],
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
    });

    return res.status(200).json(books);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
export const findById = async (req, res) => {
  try {
    const { id } = req.params;
    const book = await db.Book.findOne({ where: { id: id } });
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
    const { title, author, publisher, publication_year, cover, category_id } =
      req.body;
    const book = await db.Book.findOne({ where: { id: id } });
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    await book.update({
      title,
      author,
      publisher,
      publication_year,
      cover,
    });
    const bookCategory = await db.BookCategory.findOne({
      where: { book_id: id, category_id },
    });
    if (!bookCategory) {
      await db.BookCategory.create({
        book_id: id,
        category_id,
      });
    } else {
      await bookCategory.update({
        book_id: id,
        category_id,
      });
      await bookCategory.save();
    }
    await book.save();
    return res.status(200).json(book);
  } catch (e) {
    return res.status(500).json({ message: e.message });
  }
};
