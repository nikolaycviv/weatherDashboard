const controller = require('../../../../../../src/database/controllers/user/findAll')

describe('Database::Controller::User::FindAll', () => {
  const models = {
    user: {
      findAll: () => {}
    }
  }

  afterEach(() => {
    sandbox.restore()
  })

  beforeEach(() => {
    sandbox.spy(models.user, 'findAll')
  })

  it('should call the database model function with the correct payload', async () => {
    await controller(models, {})
    expect(models.user.findAll).to.have.been.calledOnce()
  })
})
