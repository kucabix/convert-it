import styled, { css } from 'styled-components'

export default styled.button`
  font-family: Montserrat;
  font-weight: bold;
  line-height: 38px;
  border: 1px solid #888;
  border-radius: 5px;
  background-color: #50a6e0;
  padding: 0 20px;
  &:hover{
    background-color: #4793c6;
  }
  ${props => props.none && css`
    display: none;
  `}
`
