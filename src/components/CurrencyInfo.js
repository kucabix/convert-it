import React from 'react'
import styled, {css} from 'styled-components'
import Flags from './Flags'

const CurrencyDiv = styled.div`
  font-family: Montserrat;
  display: flex;
  flex-direction: column;
  margin: 10px auto;
  flex-wrap: wrap;
  width: 70vw;
  background-color: #eee;
  border-radius: 10px;
  padding: 20px;
  align-items: center;
  ${props => props.none && css`
    display: none;
  `}
`

const CurrencyInfo = (props) => {
  return(
    <CurrencyDiv none={props.none}>
      <h3>{props.rate}</h3>
      <h3>{`Countries with ${props.currency[0]}:`}</h3>
      <Flags countries={props.fromCountry} />
      <h3>{`Countries with ${props.currency[1]}:`}</h3>
      <Flags countries={props.toCountry} />
    </CurrencyDiv>
  )
}

export default CurrencyInfo
