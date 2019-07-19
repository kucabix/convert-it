import React from 'react'
import countriesISO from './js_data/countriesIso'

const Flags = (props) => {
  const flags = props.countries.map(country => {
    const iso = countriesISO[country]
    return(
      <div className='flag-container' key={iso}>
        <img
          className='img-flag'
          src={`https://www.countryflags.io/${iso}/shiny/64.png`}
          alt={`${country} flag`}
        />
        <div className='img-overlay'>
          <div className='flag-country'>{country}</div>
        </div>
      </div>
    )
  })
  return(
    <div className='flag-box'>{flags}</div>
  )
}

export default Flags
