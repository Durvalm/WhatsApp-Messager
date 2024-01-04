import { ReactNode, createContext, useEffect, useState } from 'react'

interface User {
  id: string
  name: string
  email: string
  picture_filename: string
}

interface AuthContextType {
  authenticatedUser: User | null
  createAuthenticatedUser: (userData: User) => void
}

interface AuthContextProviderProps {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextType)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
  const [authenticatedUser, setAuthenticatedUser] = useState<User | null>(null)

  useEffect(() => {
    const storedAuthenticatedUserString =
      localStorage.getItem('authenticatedUser')

    const storedAuthenticatedUser = storedAuthenticatedUserString
      ? JSON.parse(storedAuthenticatedUserString)
      : null

    setAuthenticatedUser(storedAuthenticatedUser)
  }, [])

  function createAuthenticatedUser(userData: User) {
    setAuthenticatedUser(userData)
  }

  return (
    <AuthContext.Provider
      value={{ authenticatedUser, createAuthenticatedUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
