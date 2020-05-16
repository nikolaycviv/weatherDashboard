const Router = require('koa-router')

const router = new Router()
const controllers = require('../src/controllers')


router.post('/user/register', async ctx => {
  try {
    const token = await controllers.user.registerUser(ctx.request.body)
    ctx.body = ({ success: true, token })
  } catch (error) {
    ctx.status = error.statusCode
    ctx.body = error.toString()
  }
})

router.post('/user/login', async ctx => {
  try {
    const token = await controllers.user.loginUser(ctx.request.body)
    ctx.body = ({ success: true, token })
  } catch (error) {
    ctx.status = error.statusCode
    ctx.body = error.toString()
  }
})

router.get('/users', async (ctx, next) => {
  try {
    const users = await controllers.user.getAllUsers()
    ctx.body = ({ success: true, users })
  } catch (error) {
    ctx.status = error.statusCode
    ctx.body = error.toString()
  }
})

router.post('/users', async (ctx, next) => {
  try {
    const user = await controllers.user.createUser(ctx.request.body)
    ctx.body = ({ success: true, user })
  } catch (error) {
    ctx.status = error.statusCode
    ctx.body = error.toString()
  }
})

router.get('/users/:id', async (ctx, next) => {
  try {
    const user = await controllers.user.getUserById(ctx.params)
    ctx.body = ({ success: true, user })
  } catch (error) {
    ctx.status = error.statusCode
    ctx.body = error.toString()
  }
})

router.put('/users/:id', async (ctx, next) => {
  try {
    const user = await controllers.user.updateUser(ctx.request.body)
    ctx.body = ({ success: true, user })
  } catch (error) {
    ctx.status = error.statusCode
    ctx.body = error.toString()
  }
})

module.exports = router
