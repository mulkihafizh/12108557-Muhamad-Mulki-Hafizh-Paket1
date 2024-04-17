export default (sequelize, Sequelize) => {
  const Lending = sequelize.define("Lending", {
    user_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    book_id: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    lending_date: {
      type: Sequelize.DATE,
      allowNull: false,
    },
    return_date: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    lending_status: {
      type: Sequelize.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
  });
  return Lending;
};
