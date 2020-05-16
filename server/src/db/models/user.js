const Sequelize = require('sequelize')
const bcrypt = require('bcrypt')
module.exports = (sequelize) => {
  return sequelize.define('user', {
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
    }
  }, {
    freezeTableName: true,
    hooks: {
      beforeCreate: (user) => {
        user.password = bcrypt.hashSync(user.password, 10)
      },
      beforeValidate: (user) => {
        user.email = user.email.toLowerCase()
      }
    }
  })
}
