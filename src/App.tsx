//react libs
import React, {Component} from 'react'
import {ClipLoader} from 'react-spinners'
import { css } from '@emotion/core'
import Select from 'react-select'
import {FaExchangeAlt, FaCoins} from 'react-icons/fa'
//js files
import currencies from './js_data/currencies'
import {getData} from './js_data/get_data'
//styled-components
import MainContainer from './elements/MainContainer'
import Button from './elements/Button'
import Form from './elements/Form'
//react components
import CurrencyInfo from './components/CurrencyInfo'
import Header from './components/Header'
//typescript interfaces
import CountryData from './interfaces/CountryData.interface'

interface AppState {
  country: CountryData;
  fromCurrency: any;
  toCurrency: any;
  selectedCurrency: Array<string>;
  isLoading: boolean;
}

class App extends Component<{},AppState> {
  constructor(props: any) {
    super(props)
    this.state = {
      country: null,
      fromCurrency: '',
      toCurrency: '',
      selectedCurrency: [],
      isLoading: false
    }
  }

  componentDidUpdate(prevProps: any, prevState: any) {
    const {selectedCurrency} = this.state
    if (selectedCurrency !== prevState.selectedCurrency) {
      this.setState({isLoading: true})
      getData(selectedCurrency)
        .then(res => this.setState({
          country: {
            fromCountry: res.fromCountry,
            toCountry: res.toCountry,
            exchangeRate: res.exchange
          },
          isLoading: false
        }))
    }
  }

  handleFromCurrencyChange = (fromCurrency: any) => {
    this.setState({fromCurrency})
  }

  handleToCurrencyChange = (toCurrency: any) => {
    this.setState({toCurrency})
  }

  handleSubmit = (event: any) => {
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
    const {fromCurrency, toCurrency, country, isLoading, selectedCurrency} = this.state
    let currencyInfo
    if (country) {
      currencyInfo = <CurrencyInfo
          currency={selectedCurrency}
          countries={country}
          none={!selectedCurrency.length || isLoading}
        /> 
    }
    return(
      <MainContainer>
        <Header />
        <Form onSubmit={this.handleSubmit}>
          <Select
            value={fromCurrency}
            onChange={this.handleFromCurrencyChange}
            placeholder='From...'
            options={currencies}
          />
          <Button none={!selectedCurrency.length} onClick={this.toggleCurrency}><FaExchangeAlt/></Button>
          <Select
            value={toCurrency}
            onChange={this.handleToCurrencyChange}
            placeholder='To...'
            options={currencies}
          />
          <Button align={!!selectedCurrency.length}><FaCoins /> Convert it!</Button>
        </Form>
        <ClipLoader
          css={css`display: block;margin: 20px auto;`}
          loading={isLoading}
        />
        {currencyInfo}
      </MainContainer>
    )
  }
}

export default App
