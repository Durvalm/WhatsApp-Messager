import styled from 'styled-components'

export const Section = styled.section`
  width: 100%;
  overflow: hidden;
`

export const Header = styled.div`
  height: 3.7rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f0f2f5;
  padding: 0.7rem 1rem;
`

export const ContactInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  img {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 9999px;
  }

  p {
    color: #111b21;
    font-size: 16px;
  }
`

export const Icons = styled.div`
  display: flex;
  gap: 1rem;
  color: #54656f;
`

export const Profile = styled.div`
  height: 2rem;

  img {
    height: 2.5rem;
    width: 2.5rem;
    border-radius: 9999px;
  }
`

export const Content = styled.div`
  height: calc(100vh - 3.5rem - 3.7rem);
  border-left: 0.5px solid #e9edef;
  background-image: url('https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png');
  background-size: 50%;

  overflow-x: hidden;
  overflow-y: auto;

  display: flex;
  flex-direction: column-reverse;
  justify-content: flex-start;
  padding-top: 0.5rem;
`

export const MsgIcons = styled.div`
  display: flex;
  gap: 1rem;
  color: #54656f;
`

export const MessageBar = styled.div`
  height: 3.7rem;
  background-color: #f0f2f5;

  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 0.7rem 1.5rem;
`

export const Input = styled.div`
  display: flex;
  flex: 1;

  input {
    border: none;
    width: 100%;
    padding: 0.7rem;
    border-radius: 8px;
    outline: none;
  }
`

export const MessagesContainer = styled.div<{ is_sender: string }>`
  padding: 0.15rem 4rem;
  display: flex;
  justify-content: ${(props) => (props.is_sender === 'true' ? 'end' : 'start')};
`

export const Text = styled.div<{ is_sender: string }>`
  background-color: ${(props) =>
    props.is_sender === 'true' ? '#e7fce3' : 'white'};
  color: #111b21;
  border: 1px solid transparent;
  border-radius: 4px;
  display: flex;
  justify-content: space-between;
  gap: 0.3rem;
  max-width: 75%;
  word-wrap: break-word;

  p {
    flex: 1;
    max-width: 90%;
    padding: 0.4rem;
    font-size: 0.875rem;
  }
`

export const MessageInfo = styled.div`
  color: #667781;
  font-size: 0.6875rem;
  align-self: flex-end;
  padding-right: 0.3rem;
  padding-bottom: 0.1rem;
  white-space: nowrap;
`

export const ViewSymbol = styled.div``
