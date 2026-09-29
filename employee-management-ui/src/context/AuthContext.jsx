import { createContext, useContext, useState } from 'react'
import api from '../services/api'

const AuthContext = createContext()

export function AuthProvider({ children }) {

  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user')

    if (savedUser) {
      return JSON.parse(savedUser)
    }

    return null
  })

  const [token, setToken] = useState(() => {
    return localStorage.getItem('token')
  })

  const login = async (email, password) => {

    const response = await api.post('/auth/login', {
      email,
      password,
    })

    const userData = response.data

    localStorage.setItem('token', userData.token)
    localStorage.setItem('user', JSON.stringify(userData))

    setToken(userData.token)
    setUser(userData)

    return userData
  }

  const signup = async (formData) => {

    const response = await api.post('/auth/signup', formData)

    return response.data
  }

  const logout = () => {

    localStorage.removeItem('token')
    localStorage.removeItem('user')

    setToken(null)
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        login,
        signup,
        logout,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

