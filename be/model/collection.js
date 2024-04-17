export default (sequelize, Sequelize) => {
  const Collection = sequelize.define("Collection", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
  });
  return Collection;
};
