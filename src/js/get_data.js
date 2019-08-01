const axios = require('axios')

const getExchangeRate = async (fromCurrency, toCurrency, url) => {
  const response = await axios.get(url)
  const rate = response.data.rates
  const base = 1 / rate[fromCurrency]
  const exchangeRate = base * rate[toCurrency]
  if (isNaN(exchangeRate)) {
    throw new Error (`Unable to get currencies ${fromCurrency} and ${toCurrency}`)
  }
  return `Exchange rate: ${exchangeRate.toFixed(3)}`
}

const getCountries = async (toCurrency, url) => {
  try {
    const response = await axios.get(`${url}${toCurrency}`)
    return response.data.map(country => country.name)
  } catch (e) {
    throw new Error (`Unable to get countries that use ${toCurrency}`)
  }
}

const getData = async (currencies) => {
  const fromCountry = await getCountries(currencies[0], 'https://restcountries.eu/rest/v2/currency/')
  const toCountry = await getCountries(currencies[1], 'https://restcountries.eu/rest/v2/currency/')
  const exchange = await getExchangeRate(currencies[0], currencies[1], 'http://data.fixer.io/api/latest?access_key=9b82443638e1ca1466eb99939d777ee8')
  return {fromCountry, toCountry, exchange}
}

export {getData}
