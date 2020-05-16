const weather = module.exports = {}
const axios = require('axios')
const config = require('../../config')
const { weatherApi: { host, version, apiKey } } = config

weather.getForecast = async (params) => {
  try {
    const city = params.city ? params.city : 'Sofia'
    const url = `http://${host}/data/${version}/forecast?q=${city}&mode=json&units=metric&cnt=7&APPID=${apiKey}`
    const weatherForeast = await axios.get(url)
    return weatherForeast.data
  } catch (error) {
    statusCode = 500
    console.log(error, 'Failed to get weather')
    throw error
  }
}
