const { Op } = require('sequelize')

module.exports = (models, options) => {
  if (!options.email) {
    throw new Error('Option.email is required and not found')
  }
  const {
    user
  } = models
  const { email } = options
  const args = {
    where: {
      email: {
        [Op.eq]: email
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
