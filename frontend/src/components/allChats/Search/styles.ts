import { styled } from 'styled-components'

export const Section = styled.section`
  display: flex;
  align-items: center;
  background-color: white;
  border-bottom: 1px solid #e9edef;
  height: 3rem;
`

export const SearchBar = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: space-between;
  margin: 0.5rem 0.7rem;
  gap: 0.7rem;
`

export const Input = styled.div`
  display: flex;
  align-items: center;
  flex: 1;
  background-color: #f0f2f5;
  border: 0;
  border-radius: 8px;
  padding: 0.5rem;
  gap: 2rem;

  input {
    border: none;
    background-color: #f0f2f5;
    width: 100%;
    outline: none;
  }

  &:first-child {
    padding-left: 1rem;
  }
`
