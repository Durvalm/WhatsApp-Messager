import styled from 'styled-components'

export const Section = styled.div`
  height: 100vh;
  background-color: #fcf5eb;
`

export const HeaderContainer = styled.div`
  padding: 3rem;

  img {
    height: 2rem;
  }
`

export const FormContainer = styled.div`
  background-color: white;
  margin: 0 1rem;
  padding: 4rem;
  height: 70%;

  display: flex;
  flex-direction: column;
  gap: 3rem;

  small {
    color: gray;
  }
  a {
    margin-left: 0.5rem;
    font-size: 0.8rem;
  }
`

export const Form = styled.div`
  form {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    input {
      width: 100%;
      border: none;
      background-color: #f0f2f5;
      padding: 1rem;
      border-radius: 8px;
      outline: none;
    }
    button {
      background-color: #4caf50;
      color: white;
      border: none;
      padding: 1rem;
      border-radius: 8rem;
      width: 6rem;
      font-size: 0.9rem;
    }
  }
`
