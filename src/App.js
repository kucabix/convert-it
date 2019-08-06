//react libs
import React from 'react'
import ClipLoader from 'react-spinners/ClipLoader'
import { css } from '@emotion/core'
import Select from 'react-select'
import {FaExchangeAlt, FaCoins} from 'react-icons/fa'
//js files
import currencies from './js/currencies'
import {getData} from './js/get_data'
//styled-components
import MainContainer from './elements/MainContainer'
import Button from './elements/Button'
import Form from './elements/Form'
//react components
import CurrencyInfo from './components/CurrencyInfo'
import Header from './components/Header'

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
    return(
      <MainContainer>
        <Header />
        <Form onSubmit={this.handleSubmit}>
          <Select
            className='input-currency'
            value={fromCurrency}
            onChange={this.handleFromCurrencyChange}
            placeholder='From...'
            options={currencies}
          />
          <Button none={!selectedCurrency.length} onClick={this.toggleCurrency}><FaExchangeAlt/></Button>
          <Select
            className='input-currency'
            value={toCurrency}
            onChange={this.handleToCurrencyChange}
            placeholder='To...'
            options={currencies}
          />
          <Button><FaCoins /> Convert it!</Button>
        </Form>
        <ClipLoader
          css={css`display: block;margin: 20px auto;`}
          loading={isLoading}
        />
        <CurrencyInfo
          currency={selectedCurrency}
          fromCountry={fromCountry}
          toCountry={toCountry}
          rate={exchangeRate}
          none={!selectedCurrency.length || isLoading}
        />
      </MainContainer>
    )
  }
}

export default App
