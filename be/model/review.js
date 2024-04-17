export default (sequelize, Sequelize) => {
  const Review = sequelize.define("Review", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    review: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    rating: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Review;
};
