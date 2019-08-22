import styled from 'styled-components'

export default styled.form`
  margin: 20px auto;
  display: grid;
  grid-template-rows: 40px;
  grid-gap: 10px;
  width: 200px;
  @media (min-width: 700px) {
    grid-template-columns: 180px 180px 180px;
    width: fit-content;
    grid-gap: 10px 10px;
  }
`
