import { Routes, Route, Navigate, useNavigate } from 'react-router-dom'
import { Signup } from './pages/auth/Signup'
import { Login } from './pages/auth/Login'
import { Whatsapp } from './pages/Whatsapp'
import { useContext, useEffect } from 'react'
import { AuthContext } from './contexts/AuthContext'

export function Router() {
  const navigate = useNavigate()

  const { authenticatedUser } = useContext(AuthContext)

  useEffect(() => {
    if (!authenticatedUser) {
      // Redirect to login
      navigate('/login', { replace: true })
    }
  }, [authenticatedUser, navigate])
  return (
    <Routes>
      <Route
        path="/"
        element={
          authenticatedUser ? <Whatsapp /> : <Navigate to="/login" replace />
        }
      />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  )
}
