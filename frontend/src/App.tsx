import { AllChats } from './components/allChats'
import { Chat } from './components/chat'
import './App.css'
import { ChatsContextProvider } from './contexts/ChatsContext'

function App() {
  return (
    <main className="wrapper">
      <ChatsContextProvider>
        <AllChats />
        <Chat />
      </ChatsContextProvider>
    </main>
  )
}

export default App
