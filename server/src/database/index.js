const _ = require('lodash')

const requireAll = require('require-all')
const path = require('path')
const Database = require('./database')
const methods = ['findAll', 'create', 'update']
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

db.sync = () => {
  return db.database.sync()
}

db.query = (queryString) => {
  return db.database.query(queryString)
}
db._getCaller = function (error) {
  const lines = error.stack.split('\n')
  const line = lines[4]
  if (!line) return null
  let callerFileAndLocation = line.split(' (')[1]
  if (!callerFileAndLocation) return null
  callerFileAndLocation = callerFileAndLocation.slice(0, -1)
  return callerFileAndLocation.split('weather-dashboard/').pop() || null
}

db.getModels = (database) => {
  const models = requireAll({
    dirname: path.join(__dirname, './models'),
    resolve: (model) => {
      model = model(database)
      methods.forEach(method => {
        const actualMethod = model[method]
        // function is needed as arrow functions do not expose an arguments object to their code body
        model[method] = async function () {
          const result = await actualMethod.apply(model, arguments)
          return result
        }
      })
      return model
    }
  })
  return models
}

db.getControllers = (models) => {
  const controllers = requireAll({
    dirname: path.join(__dirname, './controllers'),
    recursive: true,
    resolve: (controller) => {
      return (...args) => {
        return controller(models, ...args)
      }
    }
  })

  return controllers
}

exports = module.exports = db
