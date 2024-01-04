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
  content: string
  sender_id?: string
  receiver_id?: string
  timestamp: Date
}

export interface ChatType {
  id: string
  name: string
  email: string
  picture_filename: string
  lastMessage?: Messages
}

interface SelectedChatType {
  id: string
}

interface ChatsContextType {
  chats: ChatType[]
  selectedChat?: SelectedChatType
  messages: Messages[]
  currentChat?: ChatType
  createChats: (newChat: ChatType) => void
  selectCurrentChat: (chatId: string) => void
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

  // When users log in, this will populate the chats
  useEffect(() => {
    async function fetchPopulateChats() {
      try {
        const response = await api.get(`chats/get_all/${authenticatedUser?.id}`)
        // console.log(response.data)
        setChats(response.data)
      } catch (error) {
        console.log(error)
      }
    }
    fetchPopulateChats()
  }, [authenticatedUser])

  // Set Messages for every Chat as soon as Chat is clicked (selectedChat is changed)
  useEffect(() => {
    if (!selectedChat) return
    async function fetchPopulateMessagesForChat() {
      const response = await api.get(
        `chats/get_messages/${authenticatedUser?.id}/${selectedChat?.id}`,
      )
      setMessages(response.data)
      console.log(response)
    }

    fetchPopulateMessagesForChat()
  }, [selectedChat, authenticatedUser])

  function addNewMessage(currentText: string) {
    const newMessage = {
      content: currentText,
      sender_id: authenticatedUser?.id,
      receiver_id: selectedChat?.id,
      timestamp: new Date(),
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

  function selectCurrentChat(chatId: string) {
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
