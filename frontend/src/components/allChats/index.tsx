import { useContext, useEffect, useState } from 'react'
import { Chats } from './Chats'
import { Search } from './Search'
import {
  Section,
  Header,
  FuncIcons,
  Profile,
  AddIcon,
  ChatIcon,
  BulbIcon,
  MoreIcon,
  EmptyListContainer,
} from './styles'
import { AddChatForm } from './AddChatForm'
import { ChatsContext } from '../../contexts/ChatsContext'
import { AuthContext } from '../../contexts/AuthContext'
import defaultPicture from '../../assets/defaultPicture.png'

export function AllChats() {
  const { authenticatedUser } = useContext(AuthContext)
  const { chats, createChats } = useContext(ChatsContext)
  const [showAddChatForm, setShowAddChatForm] = useState(false)

  function handleShowAddForm() {
    showAddChatForm ? setShowAddChatForm(false) : setShowAddChatForm(true)
  }

  // Create Chat function
  const addChat = (chatName: string) => {
    const newChat = {
      id: String(chats.length + 1),
      name: chatName,
      email: '',
      picture_filename: 'https://avatars.githubusercontent.com/u/31549323?v=4',
      lastMessage: undefined,
    }
    setShowAddChatForm(false)
    createChats(newChat)
  }
  return (
    <Section>
      {!showAddChatForm ? (
        <>
          <Header>
            <Profile>
              <img
                src={`http://127.0.0.1:5000/users/get_picture/${authenticatedUser?.id}`}
                alt=""
                onError={(e) => {
                  e.currentTarget.src = defaultPicture
                }}
              ></img>
            </Profile>
            <FuncIcons>
              <AddIcon
                size={24}
                color="var(--silver-500)"
                onClick={() => handleShowAddForm()}
              />
              <ChatIcon size={24} color="var(--silver-500)" />
              <BulbIcon size={24} color="var(--silver-500)" />
              <MoreIcon size={24} color="var(--silver-500)" />
            </FuncIcons>
          </Header>
          <Search />
          {chats.length >= 1 ? (
            chats
              .slice()
              .reverse()
              .map((chat) => (
                <Chats
                  key={chat.id}
                  id={chat.id}
                  name={chat.name}
                  email={chat.email}
                  picture_filename={chat.picture_filename}
                  lastMessage={chat.lastMessage}
                />
              ))
          ) : (
            <EmptyListContainer>
              <p>Click &quot;+&quot; to add a chat</p>
            </EmptyListContainer>
          )}
        </>
      ) : (
        <AddChatForm addChat={addChat} handleShowAddForm={handleShowAddForm} />
      )}
    </Section>
  )
}
