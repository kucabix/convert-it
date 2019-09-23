import React from 'react'
const countriesIso = require('../js_data/countriesIso.json')

const Flags = (props: {countries: Array<string>}) => {
  const flags = props.countries.map(country => {
    const iso: any = countriesIso[country]
    return(
      <div className="flag--container" key={iso}>
        <img
          className='img-flag'
          src={`https://www.countryflags.io/${iso}/shiny/64.png`}
          alt={`${country} flag`}
        />
        <div className="overlay">
          <div>{country}</div>
        </div>
      </div>
    )
  })
  return(
    <div className="flag--box">{flags}</div>
  )
}

export default Flags
