'use client'

import React from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

interface LayoutProps {
  children: React.ReactNode
}

export function Layout({ children }: LayoutProps) {
  const { user } = useAuth()

  if (!user) return null

  return (
    <div className="app-container flex h-screen">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1 overflow-auto p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
