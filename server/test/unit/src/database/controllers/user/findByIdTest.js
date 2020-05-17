const controller = require('../../../../../../src/database/controllers/user/findById')

describe('Database::Controller::User::FindById', () => {
  const models = {
    user: {
      findAll: sandbox.spy()
    }
  }

  it('should throw a error if id isn\' passed in', async () => {
    try {
      await controller(models, {})
    } catch (error) {
      expect(error).to.be.instanceOf(Error).with.property('message', 'Option.id is required and not found')
    }
  })

  it('should call the database model function', async () => {
    await controller(models, {
      id: 2,
      excludeDeleted: true
    })
    expect(models.user.findAll).to.have.been.calledOnce()
  })
})
