import * as React from "react";
import styled, {css} from 'styled-components'
import Flags from './Flags'
import CountryData from '../interfaces/CountryData.interface'

const CurrencyDiv = styled.div<{none: boolean}>`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  flex-wrap: wrap;
  width: 80vw;
  background-color: #eee;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  ${props => props.none && css`
    display: none;
  `}
  @media (min-width: 700px) {
    width: fit-content;
  }
`

interface Currency {
  countries: CountryData;
  currency: Array<string>;
  none: boolean;
}

const CurrencyInfo = (props: Currency) => {
  return(
    <CurrencyDiv none={props.none}>
      <h3>{props.countries.exchangeRate}</h3>
      <h3>{`Countries with ${props.currency[0]}:`}</h3>
      <Flags countries={props.countries.fromCountry} />
      <h3>{`Countries with ${props.currency[1]}:`}</h3>
      <Flags countries={props.countries.toCountry} />
    </CurrencyDiv>
  )
}

export default CurrencyInfo
