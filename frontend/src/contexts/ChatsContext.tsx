import { ReactNode, createContext, useState } from 'react'

export interface Messages {
  text: string
  chatId: number
  date: Date
}

export interface ChatType {
  id: number
  name: string
  img: string
  lastMessage?: Messages
  date: Date
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
  const [chats, setChats] = useState<ChatType[]>([])

  const [selectedChat, setSelectedChat] = useState<SelectedChatType>()

  const currentChat = chats.find((chat) => chat.id === selectedChat?.id)

  const [messages, setMessages] = useState<Messages[]>([])

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
