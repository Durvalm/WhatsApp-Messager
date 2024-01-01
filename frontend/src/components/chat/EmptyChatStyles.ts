import styled from 'styled-components'

export const Section = styled.section`
  width: 100%;
  background-color: #f0f2f5;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  gap: 1rem;

  h1 {
    color: #41525d;
    font-family: 'Helvetica';
  }
`
export const Message = styled.div`
  color: #667781;
  font-size: 0.875rem;

  :first-child {
    padding: 0rem 2rem;
  }
`
