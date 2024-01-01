import { useContext, useState } from 'react'
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

export function AllChats() {
  const { chats, createChats } = useContext(ChatsContext)

  const [showAddChatForm, setShowAddChatForm] = useState(false)

  function handleShowAddForm() {
    showAddChatForm ? setShowAddChatForm(false) : setShowAddChatForm(true)
  }

  const addChat = (chatName: string) => {
    const newChat = {
      id: chats.length + 1,
      name: chatName,
      img: 'https://avatars.githubusercontent.com/u/31549323?v=4',
      lastMessage: undefined,
      date: new Date(),
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
                src="https://avatars.githubusercontent.com/u/89949017?v=4"
                alt="Profile Picture"
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
                  img={chat.img}
                  lastMessage={chat.lastMessage}
                  date={chat.date}
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
