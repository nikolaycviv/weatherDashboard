const { Op } = require('sequelize')

module.exports = (models, options) => {
  if (!options.id) {
    throw new Error('Option.id is required and not found')
  }
  const {
    user
  } = models
  const { id } = options
  const args = {
    where: {
      id: {
        [Op.eq]: id
      }
    }
  }
  if (options.excludeDeleted) {
    args.where.deletedAt = {
      [Op.eq]: null
    }
  }
  return user.findAll(args)
}
