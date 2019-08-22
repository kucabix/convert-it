import styled, { css } from 'styled-components'

export default styled.button<{none?: boolean; align?: boolean}>`
  font-family: Montserrat;
  font-weight: bold;
  border: 1px solid #888;
  line-height: 20px;
  border-radius: 3px;
  background-color: #50a6e0;
  padding: 0 20px;
  &:hover{
    background-color: #4793c6;
  }
  ${props => props.none && css`
    display: none;
  `}
  @media (min-width: 700px) {
    ${props => props.align && css`
      grid-column: 2
    `} 
    line-height: 38px;
  }
`
