module.exports = (models, options) => {
  const { user } = models
  options.deletedAt = new Date()
  const args = {
    where: {
      id: options.id
    },
    limit: 1
  }
  delete options.id
  return user.update(options, args)
}
