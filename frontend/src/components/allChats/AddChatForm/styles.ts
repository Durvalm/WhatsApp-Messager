import { styled } from 'styled-components'

export const Header = styled.div`
  height: 6rem;
  background-color: #008069;
  color: white;
  font-family: sans-serif;
  display: flex;
  align-items: end;

  p {
    font-size: 1.2rem;
  }
`

export const HeaderContent = styled.div`
  display: flex;
  justify-content: start;
  align-items: end;
  gap: 2rem;
  padding: 1rem;

  :first-child {
    cursor: pointer;
  }
`

export const Form = styled.div`
  width: 100%;
  padding: 2rem;

  form {
    display: flex;
    justify-content: center;
  }

  button {
    background-color: #008069;
    color: white;
    padding: 0.5rem;
    border: 0;
    border-radius: 4px;
    cursor: pointer;
  }

  input {
    width: 100%;
    padding: 0.7rem;
    border: 1px solid black;
    border-radius: 4px;
    outline: none;
  }
`
