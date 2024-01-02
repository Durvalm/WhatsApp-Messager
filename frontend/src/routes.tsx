import { Routes, Route } from 'react-router-dom'
import { Signup } from './pages/auth/Signup'
import { Login } from './pages/auth/Login'
import { Whatsapp } from './pages/Whatsapp'

export function Router() {
  return (
    <Routes>
      <Route path="/" element={<Whatsapp />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
