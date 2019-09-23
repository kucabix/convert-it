import * as React from "react";
import Flags from './Flags'
import CountryData from '../interfaces/CountryData.interface'

interface Currency {
  countries: CountryData;
  currency: Array<string>;
  none: boolean;
}

const CurrencyInfo = (props: Currency) => {
  return(
    <div className={`info--currency${props.none ? `--none`:``}`}>
      <h3>{props.countries.exchangeRate}</h3>
      <h3>{`Countries with ${props.currency[0]}:`}</h3>
      <Flags countries={props.countries.fromCountry} />
      <h3>{`Countries with ${props.currency[1]}:`}</h3>
      <Flags countries={props.countries.toCountry} />
    </div>
  )
}

export default CurrencyInfo
