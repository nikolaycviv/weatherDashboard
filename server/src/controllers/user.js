const user = module.exports = {}
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const database = require('../database')
const config = require('../../config')

user.getAllUsers = async () => {
  try {
    return await database.user.findAll()
  } catch (error) {
    statusCode = 500
    console.log(error, 'Failed to get all users')
    throw error
  }
}

user.getUserById = async (req) => {
  const { id, excludeDeleted = true } = req
  try {
    const selectedUser = await database.user.findById({ id, excludeDeleted })
    if (selectedUser.length === 0) {
      throw new Error('Requested User Not Found')
    }
    return selectedUser
  } catch (error) {
    statusCode = 401
    console.log(error, `Failed to get user by id ${id}`)
    throw error
  }
}

user.getUserByEmail = async (req) => {
  const { email, excludeDeleted = true } = req
  try {
    const selectedUser = await database.user.findByEmail({ email, excludeDeleted })
    if (selectedUser.length === 0) {
      throw new Error('Requested User Not Found')
    }
    return selectedUser
  } catch (error) {
    statusCode = 500
    console.log(error, `Failed to get user by email ${email}`)
    throw error
  }
}

user.createUser = async (req) => {
  const {
    givenName,
    familyName,
    email,
    password
  } = req
  try {
    const options = {
      givenName,
      familyName,
      email,
      password
    }
    return await database.user.create(options)
  } catch (error) {
    statusCode = 500
    console.log(error, 'Failed to create user')
    throw error
  }
}

user.updateUser = async (req) => {
  const {
    id,
    givenName,
    familyName,
    email,
    password
  } = req
  try {
    const selectedUser = await database.user.findById({ id })
    if (selectedUser.length === 0) {
      throw new Error('Requested User Not Found')
    }
    await database.user.update({
      id,
      givenName,
      familyName,
      email,
      password
    })
    return await database.user.update({ id })
  } catch (error) {
    statusCode = 500
    console.log(error, `Failed to update user with id ${id}`)
    throw error
  }
}

user.deleteUser = async (req) => {
  const {
    id
  } = req
  try {
    const userToDelete = await database.user.findById({ id })
    if (userToDelete.length === 0) {
      throw new Error('Requested User Not Found')
    }

    return await database.user.delete({ id })
  } catch (error) {
    statusCode = 500
    console.log(error, `Failed to delete user with id ${id}`)
    throw error
  }
}

user.generateAccessToken = (user) => {
  const timeStamp = new Date().getTime()
  const payload = {
    email: user.email,
    id: user.id,
    timeStamp: timeStamp
  }
  var token = jwt.sign(payload, config.jwtSecret, {
    expiresIn: config.tokenExpireTime
  })
  return token
}

user.loginUser = async (req) => {
  const {
    email,
    password
  } = req
  try {
    const selectedUser = await database.user.findByEmail({ email })

    if (selectedUser.length === 0) {
      throw new Error('Requested User Not Found')
    }
    const isPasswordValid = await user._validPassword(password, selectedUser[0].password)

    if (!isPasswordValid) {
      throw new Error('Authentication failed. Wrong password.')
    }
    const token = user.generateAccessToken(selectedUser)

    return token
  } catch (error) {
    statusCode = 500
    console.log(error, `Failed to authenticate user with email ${email}`)
    throw error
  }
}

user.registerUser = async (req) => {
  try {
    const selectedUser = await user.createUser(req)
    if (selectedUser.length === 0) {
      throw new Error('Requested User Not Found')
    }

    const token = await user.generateAccessToken(selectedUser)

    return token
  } catch (error) {
    statusCode = 500
    console.log(error, 'Failed to register user')
    throw error
  }
}
user._validPassword = (password, hash) => {
  return bcrypt.compare(password, hash)
}
