
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('user', {
      id: {
        type: Sequelize.INTEGER(),
        primaryKey: true,
        autoIncrement: true
      },
      givenName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      familyName: {
        type: Sequelize.STRING(100),
        allowNull: false
      },
      email: {
        type: Sequelize.STRING(100),
        isEmail: true,
        unique: true,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING(),
        allowNull: false
      },
      createdAt: {
        type: Sequelize.DATE(),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        type: Sequelize.DATE(),
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP')
      },
      deletedAt: {
        type: Sequelize.DATE(),
        allowNull: true,
        defaultValue: null
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('user')
  }
}
