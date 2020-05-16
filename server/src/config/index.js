
module.exports = {
  jwtSecret: 'test_secreet',
  tokenExpireTime: '1d',
  weatherApi: {
    host: process.env.APP_WEATHER_API_HOST || 'api.openweathermap.org',
    version: process.env.APP_WEATHER_API_VERSION || '2.5',
    apiKey: process.env.APP_WEATHER_API_KEY || '9d955a86c9f6f96dab679c722355b5e3'
  },
  development: {
    username: 'root',
    password: null,
    database: 'weatherDashboard',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  },
  test: {
    username: 'root',
    password: null,
    database: 'weatherDashboard',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  },
  production: {
    username: 'root',
    password: null,
    database: 'weatherDashboard',
    host: '127.0.0.1',
    dialect: 'mysql',
    port: 3306
  },
  serverPort: process.env.SERVER_PORT || 4000
}
