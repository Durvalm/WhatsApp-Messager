import { useContext, useEffect, useState } from 'react'
import {
  Header,
  HeaderContent,
  Form,
  ContactList,
  Section,
  List,
} from './styles'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'
import { api } from '../../../lib/axios'
import { ChatType, ChatsContext } from '../../../contexts/chatContextTypes'
import { AuthContext } from '../../../contexts/AuthContext'

interface AddChatFormProps {
  handleShowAddForm: () => void
}

export function AddChatForm({ handleShowAddForm }: AddChatFormProps) {
  const { createChats } = useContext(ChatsContext)
  const { authenticatedUser } = useContext(AuthContext)

  const [chats, setChats] = useState<ChatType[]>([])
  const [selectedChat, setSelectedChat] = useState<ChatType>()

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await api.get('http://127.0.0.1:5000/users/get_users')
        setChats(response.data.users)
      } catch (error) {
        console.log(error)
      }
    }
    fetchUsers()
  }, [])

  // Add chat with person name
  const handleSubmit = () => {
    async function createNewChat() {
      await api.post(
        `http://127.0.0.1:5000/chats/create_chat/${authenticatedUser?.id}/${selectedChat?.id}`,
      )
    }

    if (selectedChat) {
      try {
        createNewChat()
        handleShowAddForm()
        createChats(selectedChat)
      } catch (error) {
        console.log(error)
      }
    }
  }

  // Go back when button is clicked
  const handleGoBack = () => {
    handleShowAddForm()
  }

  return (
    <Section>
      <div>
        <Header>
          <HeaderContent>
            <AiOutlineArrowLeft size={24} onClick={handleGoBack} />
            <p>Add new chat</p>
          </HeaderContent>
        </Header>

        <Form>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Choose from the list"
              value={selectedChat?.name}
            ></input>
            <button type="submit">
              <AiOutlineArrowRight size={24} />
            </button>
          </form>
        </Form>
      </div>

      <List>
        {chats.map((chat: ChatType) => {
          return (
            <ContactList key={chat.id} onClick={() => setSelectedChat(chat)}>
              <div>
                <img
                  src={`http://127.0.0.1:5000/users/get_picture/${chat.id}`}
                  alt=""
                />
              </div>
              <p>{chat.name}</p>
            </ContactList>
          )
        })}
      </List>
    </Section>
  )
}
