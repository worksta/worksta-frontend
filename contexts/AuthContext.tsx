'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

export type UserType = 'business' | 'worker'

export interface User {
  id: string
  email: string
  name: string
  type: UserType
  avatar?: string
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string, type: UserType) => Promise<boolean>
  signup: (email: string, password: string, name: string, type: UserType) => Promise<boolean>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const demoUsers: User[] = [
  {
    id: '1',
    email: 'business@demo.com',
    name: 'Sakura Restaurant',
    type: 'business',
    avatar: '🏢'
  },
  {
    id: '2',
    email: 'business2@demo.com',
    name: 'Noodle House',
    type: 'business',
    avatar: '🍜'
  },
  {
    id: '3',
    email: 'worker@demo.com',
    name: 'Alex Chen',
    type: 'worker',
    avatar: '👨‍🍳'
  },
  {
    id: '4',
    email: 'worker2@demo.com',
    name: 'Maria Santos',
    type: 'worker',
    avatar: '👩‍🍳'
  }
]

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check for stored auth only on client-side
    if (typeof window !== 'undefined') {
      const storedUser = localStorage.getItem('worksta_user')
      if (storedUser) {
        setUser(JSON.parse(storedUser))
      }
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const foundUser = demoUsers.find(u => u.email === email && u.type === type)
    
    if (foundUser && password === 'demo123') {
      setUser(foundUser)
      if (typeof window !== 'undefined') {
        localStorage.setItem('worksta_user', JSON.stringify(foundUser))
      }
      setLoading(false)
      return true
    }
    
    setLoading(false)
    return false
  }

  const signup = async (email: string, password: string, name: string, type: UserType): Promise<boolean> => {
    setLoading(true)
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000))
    
    const newUser: User = {
      id: Date.now().toString(),
      email,
      name,
      type,
      avatar: type === 'business' ? '🏢' : '👤'
    }
    
    setUser(newUser)
    if (typeof window !== 'undefined') {
      localStorage.setItem('worksta_user', JSON.stringify(newUser))
    }
    setLoading(false)
    return true
  }

  const logout = () => {
    setUser(null)
    if (typeof window !== 'undefined') {
      localStorage.removeItem('worksta_user')
    }
  }

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
