import { useState } from 'react'
import { api } from '../../../lib/axios'

interface RegisterFormType {
  name: string
  email: string
  password: string
  picture_filename: string
}

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function createUser(data: RegisterFormType) {
    const response = await api.post('users/register', data)
    console.log(response)
  }

  const handleSubmit = () => {
    event?.preventDefault()
    const data = {
      name,
      email,
      password,
      picture_filename: '',
    }

    createUser(data)
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="name"
          placeholder="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
