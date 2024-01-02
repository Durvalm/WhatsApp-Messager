import { AllChats } from '../../components/allChats'
import { Chat } from '../../components/chat'
import { ChatsContextProvider } from '../../contexts/ChatsContext'

export function Whatsapp() {
  return (
    <main className="wrapper">
      <ChatsContextProvider>
        <AllChats />
        <Chat />
      </ChatsContextProvider>
    </main>
  )
}
