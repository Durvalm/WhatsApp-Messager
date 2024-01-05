import { useContext, useState } from 'react'
import { api } from '../../../lib/axios'
import { useNavigate } from 'react-router-dom'
import { AuthContext } from '../../../contexts/AuthContext'
import { Form, FormContainer, Section } from '../components/styles'
import { Header } from '../components/Header'

export function Login() {
  const { createAuthenticatedUser } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate()

  async function login(formData: FormData) {
    try {
      const response = await api.post('users/login', formData)
      createAuthenticatedUser(response.data.user)
      localStorage.setItem(
        'authenticatedUser',
        JSON.stringify(response.data.user),
      )
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
    <Section>
      <Header />

      <FormContainer>
        <h2>Login</h2>
        <Form>
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
            <button type="submit">Login</button>
          </form>
        </Form>
        <div>
          <small>Don&apos;t have an account yet?</small>
          <span>
            <a href="signup">Sign up</a>
          </span>
        </div>
      </FormContainer>
    </Section>
  )
}
