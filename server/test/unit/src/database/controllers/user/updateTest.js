const controller = require('../../../../../../src/database/controllers/user/update')

describe('Database::Controller::User::Update', () => {
  const models = {
    user: {
      update: sandbox.spy()
    }
  }

  it('should call the database model function with the correct payload', async () => {
    await controller(models, {
      email: 'test1@test.com',
      id: 1
    })
    expect(models.user.update).to.have.been.calledOnce()
    expect(models.user.update).to.have.been.calledWith({
      email: 'test1@test.com'
    }, {
      where: {
        id: 1
      },
      limit: 1
    })
  })
})
