import { useState } from 'react'
import { Header, HeaderContent, Form } from './styles'
import { AiOutlineArrowLeft, AiOutlineArrowRight } from 'react-icons/ai'

interface AddChatFormProps {
  addChat: (name: string) => void
  handleShowAddForm: () => void
}

export function AddChatForm({ addChat, handleShowAddForm }: AddChatFormProps) {
  const [name, setName] = useState('')

  // Add chat with person name
  const handleSubmit = () => {
    addChat(name)
    setName('')
  }

  // Go back when button is clicked
  const handleGoBack = () => {
    handleShowAddForm()
  }

  return (
    <>
      <Header>
        <HeaderContent>
          <AiOutlineArrowLeft size={24} onClick={handleGoBack} />
          <p>Add new chat</p>
        </HeaderContent>
      </Header>

      <Form>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          ></input>
          <button type="submit">
            <AiOutlineArrowRight size={24} />
          </button>
        </form>
      </Form>
    </>
  )
}
