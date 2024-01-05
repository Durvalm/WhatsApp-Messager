import { ReactNode, createContext } from 'react'

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

export interface SelectedChatType {
  id: string
}

export interface ChatsContextType {
  chats: ChatType[]
  selectedChat?: SelectedChatType
  messages: Messages[]
  currentChat?: ChatType
  createChats: (newChat: ChatType) => void
  selectCurrentChat: (chatId: string) => void
  addNewMessage: (currentText: string) => void
}

export interface ChatsContextProviderProps {
  children: ReactNode
}

export const ChatsContext = createContext({} as ChatsContextType)
