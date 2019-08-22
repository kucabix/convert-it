import React from 'react'
import styled, {css} from 'styled-components'

const MainHeader = styled.h1<{size: string}>`
  font-family: Montserrat;
  margin: 0;
  padding: 20px;
  text-align: center;
  ${props => props.size && css`
    font-size: ${props.size}
  `}
`

const Header = () => {
  return(
    <div>
      <MainHeader size='3em'>Currency converter</MainHeader>
      <MainHeader size='1.5em'>Please choose curencies you want to exchange...</MainHeader>
    </div>
  )
}

export default Header
