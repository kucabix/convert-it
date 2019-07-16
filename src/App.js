import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import Select from 'react-select'
import {FaExchangeAlt, FaCoins} from 'react-icons/fa'
import currencies from './js_data/currencies'

import Flags from './Flags'

const axios = require('axios')

const getExchangeRate = async (fromCurrency, toCurrency) => {
  const response = await axios.get('http://data.fixer.io/api/latest?access_key=9b82443638e1ca1466eb99939d777ee8')

  const rate = response.data.rates
  const base = 1 / rate[fromCurrency]
  const exchangeRate = base * rate[toCurrency]
  if (isNaN(exchangeRate)) {
    throw new Error (`Unable to get currencies ${fromCurrency} and ${toCurrency}`)
  }
  return `Exchange rate: ${exchangeRate.toFixed(3)}`
}

const getCountries = async (toCurrency) => {
  try {
    const response = await axios.get(`https://restcountries.eu/rest/v2/currency/${toCurrency}`)
    return response.data.map(country => country.name)
  } catch (e) {
    throw new Error (`Unable to get countries that use ${toCurrency}`)
  }
}

const getData = async (currencies) => {
  const fromCountry = await getCountries(currencies[0])
  const toCountry = await getCountries(currencies[1])
  const exchange = await getExchangeRate(currencies[0], currencies[1])
  return {fromCountry: fromCountry, toCountry: toCountry, exchange: exchange}
}

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      fromCurrency: '',
      fromCountry: [],
      toCurrency: '',
      toCountry: [],
      selectedCurrency: [],
      exchangeRate: '',
      isLoading: false
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {selectedCurrency} = this.state
    if (selectedCurrency !== prevState.selectedCurrency) {
      this.setState({isLoading: true})
      getData(selectedCurrency)
        .then(res => this.setState({
          fromCountry: res.fromCountry,
          toCountry: res.toCountry,
          exchangeRate: res.exchange,
          isLoading: false
        }))
    }
  }

  handleFromCurrencyChange = (fromCurrency) => {
    this.setState({fromCurrency})
  }

  handleToCurrencyChange = (toCurrency) => {
    this.setState({toCurrency})
  }

  handleSubmit = (event) => {
    event.preventDefault()
    let current = this.state.selectedCurrency.slice()
    current[0] = this.state.fromCurrency.value
    current[1] = this.state.toCurrency.value
    this.setState({selectedCurrency: current})
  }

  toggleCurrency = () => {
    this.setState({
      fromCurrency: this.state.toCurrency,
      toCurrency: this.state.fromCurrency
    })
  }

  render() {
    const {fromCurrency, toCurrency, exchangeRate, fromCountry, toCountry, isLoading, selectedCurrency} = this.state
    const loadingClass = isLoading ? '-loading' : ''
    const selectClass = selectedCurrency.length ? '' : '-none'
    return(
      <div className='main-container'>
        <h1 className='main-header'>Currency converter</h1>
        <h2 className='main-header'>Please choose curencies you want to exchange...</h2>
        <form className='form-currency' onSubmit={this.handleSubmit}>
          <Select
            className='input-currency'
            value={fromCurrency}
            onChange={this.handleFromCurrencyChange}
            placeholder='From...'
            options={currencies}
          />
          <button className={`btn${selectClass}`} onClick={this.toggleCurrency}><FaExchangeAlt/></button>
          <Select
            className='input-currency'
            value={toCurrency}
            onChange={this.handleToCurrencyChange}
            placeholder='To...'
            options={currencies}
          />
          <button className='btn btn-exchange'><FaCoins /> Convert it!</button>
        </form>
        <ClipLoader
          css={css`display: block;margin: 20px auto;`}
          loading={isLoading}
        />
        <div className={`currency-info currency${selectClass}${loadingClass}`}>
          <h3>{exchangeRate}</h3>
          <h3>{`Countries with ${selectedCurrency[0]}:`}</h3>
          <Flags countries={fromCountry} />
          <h3>{`Countries with ${selectedCurrency[1]}:`}</h3>
          <Flags countries={toCountry} />
        </div>
      </div>
    )
  }
}

export default App
