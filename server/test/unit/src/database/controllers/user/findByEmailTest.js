const controller = require('../../../../../../src/database/controllers/user/findByEmail')

describe('Database::Controller::User::FindByEmail', () => {
  const models = {
    user: {
      findAll: sandbox.spy()
    }
  }

  it('should throw a error if email isn\' passed in', async () => {
    try {
      await controller(models, {})
    } catch (error) {
      expect(error).to.be.instanceOf(Error).with.property('message', 'Option.email is required and not found')
    }
  })

  it('should call the database model function', async () => {
    await controller(models, {
      email: 'testing@test.com',
      excludeDeleted: true
    })
    expect(models.user.findAll).to.have.been.calledOnce()
  })
})
