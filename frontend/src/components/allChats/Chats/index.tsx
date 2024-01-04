import { format, isThisWeek, isToday } from 'date-fns'
import { ChatType, ChatsContext } from '../../../contexts/ChatsContext'
import {
  Section,
  Chat,
  ChatIcon,
  ChatName,
  ChatMessage,
  ChatInfo,
} from './styles'
import { useContext } from 'react'

export function Chats(chat: ChatType) {
  const { selectCurrentChat, selectedChat } = useContext(ChatsContext)

  const handleChatClick = () => {
    selectCurrentChat(chat.id)
  }

  // const chatDate = chat.lastMessage ? chat.lastMessage.date : null
  const chatText = chat.lastMessage ? chat.lastMessage.content : ''

  return (
    <Section>
      <Chat onClick={handleChatClick} isSelected={chat.id === selectedChat?.id}>
        <ChatIcon>
          <img
            src={`http://127.0.0.1:5000/users/get_picture/${chat.id}`}
            alt="Profile Picture"
          ></img>
        </ChatIcon>
        <ChatInfo>
          <ChatName>
            <span>{chat.name}</span>
            {/* Used to display last message time */}
            {/* <span className="time">
              {isToday(chatDate) // Check if the date is today
                ? format(chatDate, 'HH:mm') // Display hour if today
                : isThisWeek(chatDate) // Check if the date is within the current week
                  ? format(chatDate, 'iii') // Display weekday if this week
                  : format(chatDate, 'yyyy-MM-dd')}
            </span> */}
          </ChatName>
          <ChatMessage>
            <span>{chatText}</span>
          </ChatMessage>
        </ChatInfo>
      </Chat>
    </Section>
  )
}
