export default (sequelize, Sequelize) => {
  const Book = sequelize.define("Book", {
    title: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },
    cover: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    author: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    stock: {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    publisher: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    publication_year: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Book;
};
