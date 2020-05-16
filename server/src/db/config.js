const Sequelize = require('sequelize')

let sequelize

class Database {
  constructor (options) {
    const environment = process.env.NODE_ENV || 'development'
    sequelize = new Sequelize(options.database, options.username, options.password, {
      host: options.host,
      dialect: 'mysql',
      port: 3306,
      logging: (environment.toUpperCase() === 'DEVELOPMENT' || environment.toUpperCase() === 'TEST') ? console.log : false
    })

    return Object.assign(this, sequelize)
  }

  define (name, attributes, options) {
    return sequelize.define(name, attributes, options)
  }

  sync () {
    return sequelize.sync()
  }

  query (queryString) {
    return sequelize.query(queryString)
  }
}

module.exports = Database
