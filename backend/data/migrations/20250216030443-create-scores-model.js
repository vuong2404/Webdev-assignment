module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('scores', {
      sbd: {
        primaryKey: true,
        autoIncrement: false,
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      toan: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      ngu_van: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      ngoai_ngu: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      vat_li: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      hoa_hoc: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      sinh_hoc: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      lich_su: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      dia_li: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      gdcd: {
        type: Sequelize.DECIMAL(4, 2),
        allowNull: true,
      },
      ma_ngoai_ngu: {
        type: Sequelize.STRING(10),
        allowNull: true,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('scores');
  },
};
