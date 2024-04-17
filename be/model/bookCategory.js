export default (sequelize, Sequelize) => {
  const BookCategory = sequelize.define("BookCategory", {
    category_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return BookCategory;
};
