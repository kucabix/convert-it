import React from 'react'
import styled from 'styled-components'
import countriesISO from '../js/countriesIso'

const FlagBox = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
`

const Overlay = styled.div`
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  opacity: 0;
  transition: .5s ease;
  text-align:center;
  font-weight: bold;
`

const FlagContainer = styled.div`
  position: relative;
  padding: 10px;
  &:hover ${Overlay} {
    opacity: 1;
  }
  &:hover .img-flag {
    opacity: 0.15;
  }
`

const Flags = (props) => {
  const flags = props.countries.map(country => {
    const iso = countriesISO[country]
    return(
      <FlagContainer key={iso}>
        <img
          className='img-flag'
          src={`https://www.countryflags.io/${iso}/shiny/64.png`}
          alt={`${country} flag`}
        />
        <Overlay>
          <div>{country}</div>
        </Overlay>
      </FlagContainer>
    )
  })
  return(
    <FlagBox>{flags}</FlagBox>
  )
}

export default Flags
