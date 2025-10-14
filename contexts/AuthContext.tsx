'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'
import { workstaApi } from '@/api/api'

export type UserType = 'business' | 'worker'

export interface User {
  id: string // UUID
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

// Only store the JWT in a cookie
const TOKEN_COOKIE = 'worksta_jwt'

// Cookie helpers (client-only)
function setCookie(name: string, value: string, days = 7) {
  if (typeof document === 'undefined') return
  const expires = new Date(Date.now() + days * 864e5).toUTCString()
  document.cookie = `${name}=${encodeURIComponent(value)}; Expires=${expires}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
}

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null
  const cookies = document.cookie ? document.cookie.split('; ') : []
  for (const c of cookies) {
    const [k, v] = c.split('=')
    if (k === name) return decodeURIComponent(v || '')
  }
  return null
}

function deleteCookie(name: string) {
  if (typeof document === 'undefined') return
  document.cookie = `${name}=; Expires=Thu, 01 Jan 1970 00:00:00 GMT; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
}

// Best-effort JWT payload decode (no signature verification; for UI convenience only)
function decodeJWTPayload(token: string): any | null {
  try {
    const parts = token.split('.')
    if (parts.length !== 3) return null
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const json = decodeURIComponent(
      atob(payload)
        .split('')
        .map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
    return JSON.parse(json)
  } catch {
    return null
  }
}

function deriveUserFromToken(token: string): User | null {
  const payload = decodeJWTPayload(token)
  if (!payload || typeof payload !== 'object') return null

  // Try to infer UUID and role/type from common JWT claim names
  const id = (payload.sub || payload.id || payload.uid) as string | undefined
  const rawRole = (payload.role || payload.type || payload.scope) as string | undefined

  let type: UserType | null = null
  if (typeof rawRole === 'string') {
    const lower = rawRole.toLowerCase()
    if (lower.includes('business')) type = 'business'
    if (lower.includes('worker')) type = 'worker'
  }

  if (!id || !type) {
    // If we can't confidently derive both UUID and type, do not expose a user shape
    return null
  }

  // Email/name are not persisted; keep blank to avoid spoofable data
  return {
    id,
    email: '',
    name: '',
    type,
    avatar: type === 'business' ? '🏢' : '👤',
  }
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  // On mount, hydrate token from cookie (if present) and derive minimal user info
  useEffect(() => {
    const token = getCookie(TOKEN_COOKIE)
    if (token) {
      workstaApi.setToken(token)
      const derived = deriveUserFromToken(token)
      setUser(derived) // may be null if not derivable
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string, typeHint: UserType): Promise<boolean> => {
    setLoading(true)
    try {
      // Backend expects "username" mapped from email
      const res = await workstaApi.login({ username: email, password })
      // Persist JWT in cookie and sync client
      setCookie(TOKEN_COOKIE, res.token)
      workstaApi.setToken(res.token)

      // Derive user from token if possible; otherwise keep null (server enforces auth/roles)
      const derived = deriveUserFromToken(res.token)
      setUser(derived)
      return true
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email: string, password: string, name: string, type: UserType): Promise<boolean> => {
    setLoading(true)
    try {
      // Register with role flags
      await workstaApi.register({
        username: email,
        password,
        worker: type === 'worker',
        business: type === 'business',
      })
      // Auto-login (will set token cookie and derive user)
      return await login(email, password, type)
    } catch {
      return false
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    // Clear in-memory state and token
    setUser(null)
    workstaApi.logout()
    deleteCookie(TOKEN_COOKIE)
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
