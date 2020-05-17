module.exports = (models, options) => {
  const { user } = models
  return user.create(options)
}
