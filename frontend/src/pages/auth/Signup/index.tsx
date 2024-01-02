import React, { useState } from 'react'
import { api } from '../../../lib/axios'
import { useNavigate } from 'react-router-dom'

export function Signup() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)

  const navigate = useNavigate()

  // Call API to register New Users
  async function createUser(formData: FormData) {
    try {
      await api.post('users/register', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      navigate('/login')
    } catch (error) {
      console.error('Error during registration')
    }
  }

  const handleSubmit = () => {
    event?.preventDefault()

    const formData = new FormData()
    formData.append('name', name)
    formData.append('email', email)
    formData.append('password', password)
    if (selectedFile) {
      formData.append('file', selectedFile)
    }

    for (const entry of formData.entries()) {
      console.log(entry)
    }

    createUser(formData)
    cleanForm()
  }

  // Helper functions
  function cleanForm() {
    setName('')
    setEmail('')
    setPassword('')
    setSelectedFile(null)

    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files && event.target.files[0]
    setSelectedFile(file)
  }

  const fileInputRef = React.createRef<HTMLInputElement>()

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
        <input
          type="file"
          placeholder="profile picture"
          ref={fileInputRef}
          onChange={(e) => handleFileChange(e)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}
