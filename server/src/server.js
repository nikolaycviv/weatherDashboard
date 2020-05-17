const database = require('./database')
const Koa = require('koa')
const cors = require('@koa/cors')
const bodyParser = require('koa-bodyparser')
const logger = require('koa-logger')
const koaJwt = require('koa-jwt')
const config = require('../config')
const dbConfig = config[process.env.NODE_ENV || 'development']
const userRoutes = require('../routes/user')
const weatherRoutes = require('../routes/weather')

const initialise = async () => {
  try {
    const app = new Koa()
    app.use(bodyParser())
    if (process.env.NODE_ENV === 'development') {
      app.use(logger())
    }

    app.use(cors({
      allowMethods: ['GET', 'POST', 'DELETE'],
      credentials: true,
      allowHeaders: ['Origin, X-Requested-With, Content-Type, Accept, X-User-Id, X-Auth-Token', 'Authorization', 'Accept']
    }

    ))
    app.use(
      koaJwt({
        secret: config.jwtSecret
      }).unless({
        path: ['/user/login', '/user/register']
      })
    )
    app.use(userRoutes.routes())
    app.use(weatherRoutes.routes())
    const connectionDetails = {
      host: dbConfig.host || 'localhost',
      username: dbConfig.username || 'root',
      password: dbConfig.password || null,
      database: dbConfig.database || 'weather_app',
      port: dbConfig.port || 3306
    }
    await database.connect(connectionDetails)

    app.listen(config.serverPort)
  } catch (error) {
    process.exit(1)
  }
}

initialise()
