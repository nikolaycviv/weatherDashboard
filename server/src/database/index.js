const _ = require('lodash')
const Database = require('./database')
const db = module.exports = {}
db.database = {}
db.models = {}

db.connect = (options) => {
  return new Promise((resolve, reject) => {
    db.database = new Database(options)
    const models = db.getModels(db.database)

    db.models = _.reduce(models, (modelObject, modelValue, modelKey) => {
      const capitalizedKey = modelKey.slice(0, 1).toUpperCase() + modelKey.slice(1)
      modelObject[capitalizedKey] = modelValue
      return modelObject
    }, {})

    const controllers = db.getControllers(models)
    _.forEach(controllers, (actions, name) => {
      db[name] = actions
    })
    return resolve()
  })
}

db.query = (queryString) => {
  return db.database.query(queryString)
}
