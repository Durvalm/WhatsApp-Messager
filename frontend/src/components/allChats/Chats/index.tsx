import { isThisWeek, isToday } from 'date-fns'
import { ChatType, ChatsContext } from '../../../contexts/chatContextTypes'
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

  const chatDate = chat.last_message ? chat.last_message?.timestamp : null
  const chatText = chat.last_message ? chat.last_message.content : ''

  return (
    <Section>
      <Chat
        onClick={handleChatClick}
        is_selected={chat.id === selectedChat?.id ? 'true' : 'false'}
      >
        <ChatIcon>
          <img
            src={`http://127.0.0.1:5000/users/get_picture/${chat.id}`}
            alt="Profile Picture"
          ></img>
        </ChatIcon>
        <ChatInfo>
          <ChatName>
            <span>{chat.name}</span>
            {/* Used to display last message time  */}
            {chatDate ? (
              <span className="time">
                {
                  isToday(new Date(chatDate))
                    ? new Date(chatDate).toLocaleTimeString('en-US', {
                        hour12: true,
                        hour: 'numeric',
                        minute: 'numeric',
                      }) // Display hour if today
                    : isThisWeek(chatDate)
                      ? new Date(chatDate).toLocaleDateString('en-US', {
                          weekday: 'short',
                        }) // Display weekday if this week
                      : new Date(chatDate).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric',
                        }) // Display full date otherwise
                }
              </span>
            ) : null}
          </ChatName>
          <ChatMessage>
            <span>{chatText}</span>
          </ChatMessage>
        </ChatInfo>
      </Chat>
    </Section>
  )
}
