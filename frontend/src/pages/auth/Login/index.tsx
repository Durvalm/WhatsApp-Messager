import { useState } from 'react'
import { api } from '../../../lib/axios'
import { useNavigate } from 'react-router-dom'

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function login(formData: FormData) {
    try {
      const response = await api.post('users/login', formData)
      navigate('/')
    } catch (error) {
      console.error(error)
    }
  }

  const handleSubmit = () => {
    event?.preventDefault()

    const formData = new FormData()
    formData.append('email', email)
    formData.append('password', password)

    login(formData)

    setEmail('')
    setPassword('')
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button type="submit">Button</button>
    </form>
  )
}
