//react libs
import React, {useState, useEffect} from 'react'
import {ClipLoader} from 'react-spinners'
import { css } from '@emotion/core'
import Select from 'react-select'
import {FaExchangeAlt, FaCoins} from 'react-icons/fa'
//js files
import currencies from './js_data/currencies'
import {getData} from './js_data/get_data'
//react components
import CurrencyInfo from './components/CurrencyInfo'
import Header from './components/Header'
//typescript interfaces
import CountryData from './interfaces/CountryData.interface'

const App = () =>  {
  const [country, setCountry] = useState<CountryData | null>(null)
  const [fromCurrency, setFromCurrency] = useState();
  const [toCurrency, setToCurrency] = useState();
  const [selectedCurrency, setSelectedCurrency] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (selectedCurrency.length) {
      setIsLoading(true)
      getData(selectedCurrency)
      .then(res => {
        setCountry({
          fromCountry: res.fromCountry,
          toCountry: res.toCountry,
          exchangeRate: res.exchange
        })
        setIsLoading(false)
      })
    }
  }, [selectedCurrency]);

  const handleFromCurrencyChange = (fromCurrency: any) => {
    setError(false)
    setFromCurrency(fromCurrency)
  }

  const handleToCurrencyChange = (toCurrency: any) => {
    setError(false)
    setToCurrency(toCurrency)
  }

  const handleSubmit = (event: any) => {
    event.preventDefault()
    let current = selectedCurrency.slice()
    current[0] = fromCurrency ? fromCurrency.value : ''
    current[1] = toCurrency ? toCurrency.value : ''
    if (!!current[0] && !!current[1]) {
      setSelectedCurrency(current)
      setError(false)
    } else {
      setError(true)
    }
  }

  let currencyInfo, errorInfo
  if (country) {
    currencyInfo = <CurrencyInfo
        currency={selectedCurrency}
        countries={country}
        none={!selectedCurrency.length || isLoading}
      /> 
  }
  if (error) {
    errorInfo = <div className="error">Please insert both currencies names.</div>
  }
  return(
    <div className="main--container">
      <Header />
      <form className="form--currency" onSubmit={handleSubmit}>
        <Select
          value={fromCurrency}
          onChange={handleFromCurrencyChange}
          placeholder='From...'
          options={currencies}
        />
        <button 
          className={`button${!selectedCurrency.length ? `--none`:``}`} 
          onClick={() => {
            setFromCurrency(toCurrency)
            setToCurrency(fromCurrency)
          }}
        >
          <FaExchangeAlt/>
        </button>
        <Select
          value={toCurrency}
          onChange={handleToCurrencyChange}
          placeholder='To...'
          options={currencies}
        />
        <button 
          className={`button ${!!selectedCurrency.length ? `button--align`:``}`}
        >
          <FaCoins />Convert it!
        </button>
      </form>
      <ClipLoader
        css={css`display: block;margin: 20px auto;`}
        loading={isLoading}
      />
      {currencyInfo}{errorInfo}
    </div>
  )
}

export default App
