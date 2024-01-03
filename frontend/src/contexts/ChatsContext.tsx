import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { api } from '../lib/axios'
import { AuthContext } from './AuthContext'

export interface Messages {
  text: string
  chatId: number
  date: Date
}

export interface ChatType {
  id: number
  name: string
  email: string
  picture_filename: string
  lastMessage?: Messages
}

interface SelectedChatType {
  id: number
}

interface ChatsContextType {
  chats: ChatType[]
  selectedChat?: SelectedChatType
  messages: Messages[]
  currentChat?: ChatType
  createChats: (newChat: ChatType) => void
  selectCurrentChat: (chatId: number) => void
  addNewMessage: (currentText: string) => void
}

interface ChatsContextProviderProps {
  children: ReactNode
}

export const ChatsContext = createContext({} as ChatsContextType)

export function ChatsContextProvider({ children }: ChatsContextProviderProps) {
  const { authenticatedUser } = useContext(AuthContext)

  const [chats, setChats] = useState<ChatType[]>([])

  const [selectedChat, setSelectedChat] = useState<SelectedChatType>()

  const currentChat = chats.find((chat) => chat.id === selectedChat?.id)

  const [messages, setMessages] = useState<Messages[]>([])

  useEffect(() => {
    async function populateChats() {
      try {
        const response = await api.get(`chats/get_all/${authenticatedUser?.id}`)
        // console.log(response.data)
        setChats(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    populateChats()
  }, [authenticatedUser])

  function addNewMessage(currentText: string) {
    const newMessage = {
      text: currentText,
      chatId: currentChat?.id || 0,
      date: new Date(),
    }
    setMessages((state) => [...state, newMessage])
    setChats((state) =>
      state.map((chat) =>
        chat.id === currentChat?.id
          ? { ...chat, lastMessage: newMessage }
          : chat,
      ),
    )
  }

  function createChats(newChat: ChatType) {
    setChats((state) => [...state, newChat])
  }

  function selectCurrentChat(chatId: number) {
    setSelectedChat({ id: chatId })
  }

  return (
    <ChatsContext.Provider
      value={{
        chats,
        createChats,
        messages,
        currentChat,
        selectedChat,
        selectCurrentChat,
        addNewMessage,
      }}
    >
      {children}
    </ChatsContext.Provider>
  )
}
