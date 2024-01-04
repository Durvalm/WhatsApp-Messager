import { useContext, useState } from 'react'
import {
  Section,
  Header,
  ContactInfo,
  Icons,
  Content,
  MessageBar,
  MsgIcons,
  Input,
  MessagesContainer,
  MessageInfo,
  Text,
  ViewSymbol,
} from './styles'

import { AiOutlineSearch, AiOutlineMore, AiOutlinePlus } from 'react-icons/ai'
import { BsEmojiSmile, BsMicFill } from 'react-icons/bs'
import { MdSend } from 'react-icons/md'

import { ChatsContext } from '../../contexts/ChatsContext'
import { EmptyChatContainer } from './EmptyChatContainer'
import { AuthContext } from '../../contexts/AuthContext'

export function Chat() {
  const { currentChat, messages, addNewMessage } = useContext(ChatsContext)
  const { authenticatedUser } = useContext(AuthContext)

  const [currentText, setCurrentText] = useState('')

  function handleSendMessage() {
    addNewMessage(currentText)
    setCurrentText('')
  }

  if (!currentChat?.name) {
    return <EmptyChatContainer />
  }

  return (
    <Section>
      <Header>
        <ContactInfo>
          <img
            src={`http://127.0.0.1:5000/users/get_picture/${currentChat.id}`}
            alt="profile picture"
          ></img>
          <p>{currentChat.name}</p>
        </ContactInfo>
        <Icons>
          <AiOutlineSearch size={24} />
          <AiOutlineMore size={24} />
        </Icons>
      </Header>

      <Content>
        <div>
          {messages.map((message) => {
            return (
              <MessagesContainer
                key={new Date(message.timestamp).toISOString()}
                isSender={message.sender_id === authenticatedUser?.id}
              >
                <Text isSender={message.sender_id === authenticatedUser?.id}>
                  <p>{message.content}</p>
                  <MessageInfo>
                    <time>
                      {new Date(message.timestamp).toLocaleTimeString('en-US', {
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: true,
                      })}
                    </time>
                    <ViewSymbol />
                  </MessageInfo>
                </Text>
              </MessagesContainer>
            )
          })}
        </div>

        <MessageBar>
          <MsgIcons>
            <BsEmojiSmile size={24} />
            <AiOutlinePlus size={24} />
          </MsgIcons>

          <Input>
            <input
              type="text"
              placeholder="Type a message"
              value={currentText}
              onChange={(e) => setCurrentText(e.target.value)}
            />
          </Input>
          {currentText ? (
            <MdSend size={24} color={'#54656f'} onClick={handleSendMessage} />
          ) : (
            <BsMicFill size={24} color={'#54656f'} />
          )}
        </MessageBar>
      </Content>
    </Section>
  )
}
