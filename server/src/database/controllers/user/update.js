const { Op } = require('sequelize')

module.exports = (models, options) => {
  const { user } = models
  const args = {
    where: {
      id: options.id
    },
    limit: 1
  }
  if (options.excludeDeleted) {
    args.where.deletedAt = {
      [Op.eq]: null
    }
  }
  delete options.id
  return user.update(options, args)
}
