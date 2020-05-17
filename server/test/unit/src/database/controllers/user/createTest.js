const controller = require('../../../../../../src/database/controllers/user/create')

describe('Database::Controller::User::Create', () => {
  const models = {
    user: {
      create: sandbox.spy()
    }
  }

  it('should call the database model function', async () => {
    await controller(models, { id: 'fooda' })
    expect(models.user.create).to.have.been.calledOnce()
  })
})
