import './App.css'
import { BrowserRouter } from 'react-router-dom'
import { Router } from './routes'
import { AuthContextProvider } from './contexts/AuthContext'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
