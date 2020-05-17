const { Op } = require('sequelize')

module.exports = (models, options) => {
  const {
    user
  } = models

  const args = {
    order: [['updatedAt', 'DESC']],
    where: {
      deletedAt: {
        [Op.eq]: null
      }
    }
  }

  return user.findAll(args)
}
