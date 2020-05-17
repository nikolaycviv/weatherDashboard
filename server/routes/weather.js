const Router = require('koa-router')
const controllers = require('../src/controllers')

const router = new Router()
router.get('/api/forecast', async ctx => {
  try {
    const forecast = await controllers.weather.getForecast(ctx.params)
    ctx.body = ({ success: true, forecast })
  } catch (error) {
    ctx.status = error.statusCode
    ctx.body = error.toString()
  }
})

module.exports = router
