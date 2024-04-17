import { Sequelize } from "sequelize";
import config from "../config/config.js";
import User from "./user.js";
import Book from "./book.js";
import Category from "./category.js";
import BookCategory from "./bookCategory.js";
import Collection from "./collection.js";
import Lending from "./lending.js";
import Review from "./review.js";

const sequelize = new Sequelize(config.name, config.username, config.password, {
  dialect: config.dialect,
  host: config.host,
});

const db = {};
db.sequelize = sequelize;
db.Sequelize = Sequelize;

//Define models to db
db.User = User(sequelize, Sequelize);
db.Book = Book(sequelize, Sequelize);
db.BookCategory = BookCategory(sequelize, Sequelize);
db.Category = Category(sequelize, Sequelize);
db.Collection = Collection(sequelize, Sequelize);
db.Lending = Lending(sequelize, Sequelize);
db.Review = Review(sequelize, Sequelize);

//Book relation
db.Book.belongsToMany(db.Category, {
  through: db.BookCategory,
  as: "categories",
  foreignKey: "book_id",
});
db.Book.hasMany(db.Review, {
  as: "reviews",
  foreignKey: "book_id",
});
db.Book.hasMany(db.Lending, {
  as: "lendings",
  foreignKey: "book_id",
});
db.Book.hasMany(db.Collection, {
  as: "collections",
  foreignKey: "book_id",
});

//User relation
db.User.hasMany(db.Review, {
  as: "reviews",
  foreignKey: "user_id",
});
db.User.hasMany(db.Lending, {
  as: "lendings",
  foreignKey: "user_id",
});
db.User.hasMany(db.Collection, {
  as: "collections",
  foreignKey: "user_id",
});

//Collection relation
db.Collection.belongsTo(db.User, {
  foreignKey: "user_id",
});
db.Collection.belongsTo(db.Book, {
  foreignKey: "book_id",
});

//Review relation
db.Review.belongsTo(db.User, {
  foreignKey: "user_id",
});
db.Review.belongsTo(db.Book, {
  foreignKey: "book_id",
});

//Lending relation
db.Lending.belongsTo(db.User, {
  foreignKey: "user_id",
});
db.Lending.belongsTo(db.Book, {
  foreignKey: "book_id",
});

//Category relation
db.Category.belongsToMany(db.Book, {
  through: db.BookCategory,
  as: "books",
  foreignKey: "category_id",
});

export default db;
