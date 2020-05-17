const { user } = require('../../../../src/controllers')
const database = require('../../../../src/database')

describe('User::Controller', () => {
  afterEach(() => {
    sandbox.restore()
  })

  context('getAllUsers', () => {
    let getAllUsersStub
    afterEach(() => {
      getAllUsersStub.restore()
    })
    before(() => {
      getAllUsersStub = sandbox.stub(database.user, 'findAll')
        .returns([{
          foo: 'bar'
        },
        {
          nee: 'argh'
        },
        {
          baz: 'bee'
        },
        {
          flop: 'whop'
        }])
    })
    it('should query the database and return the results from the query', async () => {
      const results = await user.getAllUsers({})
      expect(results).to.deep.equal([
        {
          foo: 'bar'
        },
        {
          nee: 'argh'
        },
        {
          baz: 'bee'
        },
        {
          flop: 'whop'
        }
      ])
      expect(database.user.findAll).to.have.been.calledOnce()
    })

    it('should log and throw an error when the query fails', async () => {
      getAllUsersStub = sandbox.stub(database.user, 'findAll').throws(new Error('Opps'))
      try {
        await user.getAllUsers({})
      } catch (error) {
        expect(error).to.be.instanceOf(Error).with.property('message', 'Opps')
      }
    })
  })

  context('getUserById', () => {
    beforeEach(() => {
      sandbox.stub(database.user, 'findById')
        .withArgs({ id: 1, excludeDeleted: true })
        .returns([{
          foo: 'bar',
          id: 1
        }])
        .withArgs({ id: 2, excludeDeleted: true })
        .returns([])
        .withArgs({ id: 3, excludeDeleted: false })
        .returns(new Error('Opps'))
    })

    it('should query the database and return the results from the query', async () => {
      const results = await user.getUserById({ id: 1, excludeDeleted: true })
      expect(results).to.deep.equal([
        {
          foo: 'bar',
          id: 1
        }
      ])
      expect(database.user.findById).to.have.been.calledOnce()
    })

    it('should log and throw an Error when the query returns no results for the id passed in', async () => {
      try {
        await user.getUserById({ id: 2, excludeDeleted: true })
      } catch (error) {
        expect(error).to.be.instanceOf(Error).with.property('message', 'Requested User Not Found')
      }
    })
    it('should log and throw an error when the query fails', async () => {
      try {
        await user.getUserById({ id: 3, excludeDeleted: false })
      } catch (error) {
        expect(error).to.be.instanceOf(Error).with.property('message', 'Opps')
      }
    })
  })
  context('createUser', () => {
    beforeEach(() => {
      sandbox.stub(database.user, 'create')
        .withArgs(sinon.match({
          givenName: 'John',
          familyName: 'Doe',
          email: 'exampale@example.com',
          password: 'password'
        }))
        .returns()
        .withArgs(sinon.match({
          givenName: 'John',
          familyName: 'Doe',
          email: 'exampale1@example.com',
          password: 'password'
        }))
        .throws(new Error('Opps'))
    })

    it('should create a new engine configuration with the variables passed in or set them to "null"', async () => {
      await user.createUser({
        givenName: 'John',
        familyName: 'Doe',
        email: 'exampale@example.com',
        password: 'password'
      })
      expect(database.user.create).to.have.been.calledWith({
        givenName: 'John',
        familyName: 'Doe',
        email: 'exampale@example.com',
        password: 'password'
      })
    })

    it('should log and throw an Error when the query fails', async () => {
      try {
        await user.createUser({
          givenName: 'John',
          familyName: 'Doe',
          email: 'exampale1@example.com',
          password: 'password'
        })
      } catch (error) {
        expect(error).to.be.instanceOf(Error).with.property('message', 'Opps')
      }
    })
  })
  context('updateUser', () => {
    beforeEach(() => {
      sandbox.stub(database.user, 'update')
      sandbox.stub(database.user, 'findById')
        .withArgs({ id: 1 })
        .returns([{
          name: 'bar'
        }])
        .withArgs({ id: 2 })
        .returns([])
    })
    it('should update the entry in the database with the passed in arguments', async () => {
      await user.updateUser({ id: 1, name: 'foo' })
      expect(database.user.findById).to.have.been.calledWith({ id: 1 })
    })

    it('should log and throw an Error when the query returns no results for the id passed in', async () => {
      try {
        await user.updateUser({ id: 2, name: 'foo' })
      } catch (error) {
        expect(error).to.be.instanceOf(Error).with.property('message', 'Requested User Not Found')
      }
    })
  })
})
