import { ReactNode, createContext, useState } from 'react'

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

  function createAuthenticatedUser(userData: User) {
    setAuthenticatedUser(userData)
  }

  //   useEffect(() => {
  //     async function fetchAuthenticatedUser() {
  //       try {
  //         const response = await axios.get('users/current_user')
  //         const user = response.data
  //         setAuthenticatedUser(user)
  //       } catch (error) {
  //         setAuthenticatedUser(null)
  //       }
  //     }
  //     fetchAuthenticatedUser()
  //   }, [])
  return (
    <AuthContext.Provider
      value={{ authenticatedUser, createAuthenticatedUser }}
    >
      {children}
    </AuthContext.Provider>
  )
}
