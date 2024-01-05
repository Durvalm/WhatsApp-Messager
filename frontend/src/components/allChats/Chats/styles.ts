import { styled } from 'styled-components'

export const Section = styled.section`
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
`

export const Chat = styled.div<{ is_selected: string }>`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 1px solid #e9edef;
  height: 4rem;
  padding: 1rem;
  gap: 1rem;
  background-color: ${(props) =>
    props.is_selected === 'true' ? '#f0f2f5' : 'white'};
`

export const ChatIcon = styled.div`
  img {
    height: 3rem;
    border: 0;
    border-radius: 9999px;
  }
`

export const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
`

export const ChatName = styled.div`
  display: flex;
  justify-content: space-between;

  .time {
    color: #667781;
    font-size: 0.875rem;
  }
`

export const ChatMessage = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;

  span {
    color: #667781;
  }
`
